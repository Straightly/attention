---
title: You’re absolutely right to be concerned — synchronously p...
date: 2025-12-05
tags: #time #art #ai
context: Captured via web app
status: raw-idea
---

## Initial Spark

You’re absolutely right to be concerned — synchronously processing thousands (or potentially hundreds of thousands) of FHIR resources by paging through bundles in a single request or even a few long-running threads is an anti-pattern in modern Java services, especially if this is a web/service layer (Spring Boot, Quarkus, Micronaut, etc.).
Here are the proven architectural patterns for this exact scenario, ranked from most recommended to acceptable fallback:
1. Best: Fully Asynchronous Job with External Queue + Worker(s) (Recommended for production)
This is the gold-standard approach used by almost all healthcare companies processing large FHIR exports.
Trigger (API call, scheduled job, etc.)
       ↓
Create a Job record (status = PENDING, total_pages = null or estimated)
       ↓
Publish a message to a queue (SQS, RabbitMQ, Kafka, Google Pub/Sub, etc.)
       ↓
One or more worker services/processes pick up the job
       ↓
Worker pages through Bundle?nextLink, processes each page
       ↓
Worker updates job progress (pages done, resources processed, errors)
       ↓
When complete → status = COMPLETED or FAILED
Advantages
	•	Your HTTP endpoint returns immediately (202 Accepted + job ID)
	•	No thread is blocked for minutes/hours
	•	Horizontally scalable (add more workers)
	•	Survives restarts, crashes, deployments
	•	Can implement retry, dead-letter, visibility timeout
	•	Easy to monitor, pause, replay
Tech choices in Java
	•	Spring Boot + Spring Cloud AWS/SQS or Spring Kafka or Micronaut + RabbitMQ
	•	Job status stored in PostgreSQL / DynamoDB / MongoDB
	•	Optional: Camunda, Temporal.io, or simple custom state machine
2. Very Good: Fire-and-Forget with Virtual Threads + Dedicated Task Executor (Good compromise)
If you cannot introduce a queue right now, Java 21+ virtual threads make long-running tasks much safer.
@PostMapping("/start-fhir-import")
public JobResponse startImport(@RequestBody StartRequest req) {
    String jobId = UUID.randomUUID().toString();
    
    // Fire and forget on a dedicated virtual thread
    Thread.startVirtualThread(() -> {
        fhirImportService.processFullExport(jobId, req.getServerUrl());
    });
    
    return new JobResponse(jobId, "QUEUED");
}
And configure your fhirImportService to update a JobEntity in DB as it progresses.
Still recommended to combine with a bounded executor so you don’t accidentally start 10,000 threads:
private static final Executor boundedVirtualExecutor = 
    Executors.newVirtualThreadPerTaskExecutor()
             .withMaximumPoolSize(10); // limit concurrent imports

Thread.startVirtualThread(() -> boundedVirtualExecutor.execute(task));
3. Acceptable: Async Controller with WebFlux or @Async (Short-term solution)
@PostMapping("/start-fhir-import")
public Mono startImport(...) {
    return importService.startAsyncImport(...)  // returns Mono
                .subscribeOn(Schedulers.boundedElastic());
}
or with Spring @Async + increased task executor pool.
Works, but you lose durability if the pod dies mid-import.
4. Avoid if Possible: Synchronous Long-Running HTTP Request
Never do this in production:
// NEVER do this for large exports
for (Bundle bundle = client.fetchFirst(); bundle != null; 
     bundle = client.fetchNext(bundle)) { ... }
This will cause timeouts, thread exhaustion, inability to scale, no progress visibility, no restartability.
Recommended Minimal Production-Ready Pattern (2025 best practice)
@RestController
public class FhirImportController {

    @PostMapping("/imports")
    public ResponseEntity startImport(@RequestBody ImportRequest req) {
        String jobId = jobService.createJob(req);           // DB record
        sqsTemplate.send("fhir-import-queue", new JobMessage(jobId, req)); // or Kafka
        return ResponseEntity.accepted().body(new JobResponse(jobId, "QUEUED"));
    }

    @GetMapping("/imports/{jobId}")
    public JobStatus getStatus(@PathVariable String jobId) { ... }
}
Worker (separate service or same JAR with different profile):
@SqsListener("fhir-import-queue")
public void process(JobMessage msg) {
    jobService.processJobInTransaction(msg.jobId(), msg.request());
}
Summary – What You Should Do
Option
Recommended
When to use
Queue + dedicated worker
★★★★★
Production, any non-trivial volume
Virtual threads + job tracking
★★★★
Quick win, Java 21+, moderate volume
@Async / WebFlux
★★★
Small scale, internal tools
Synchronous long-running call
✗
Never in a service
Go with option 1 (queue + worker) if this job can take > 5–10 minutes or process > 50k resources. You’ll thank yourself later when you need to reprocess a failed 800k-patient export at 2 a.m.
Let me know your stack (Spring Boot? Quarkus? AWS/GCP/Azure?) and I can give you a complete working code template.

## Key Concepts

- [To be filled in later]

## Questions to Explore

- [To be filled in later]

## Potential Connections

- [To be filled in later]

## Next Steps

- Review and expand this raw idea
- Add key concepts and questions
- Connect to related writings
