# ECS Task Recycler

Automatically recycle ECS tasks on a schedule to mitigate memory leaks. This solution uses AWS Lambda + EventBridge to periodically force a new ECS service deployment, which gracefully replaces all tasks.

## ⚠️ Important Notes

- **This is a workaround**, not a fix for the underlying memory leak
- Tasks will be replaced gracefully (respects `minimumHealthyPercent` and `maximumPercent`)
- No downtime if your service is configured for rolling deployments
- Default schedule: every 6 hours (configurable)

## Architecture

```
EventBridge (Schedule) → Lambda → ECS Service (Force New Deployment)
```

## Prerequisites

- ECS service with proper deployment configuration:
  - `minimumHealthyPercent`: 100 (or higher)
  - `maximumPercent`: 200 (allows new tasks before stopping old ones)
- AWS CLI configured with appropriate credentials
- Terraform >= 1.0 OR AWS CLI for CloudFormation

## Deployment Options

### Option 1: Terraform (Recommended)

1. **Package the Lambda function:**
   ```bash
   cd ecs-task-recycler
   zip lambda_deployment.zip lambda_function.py
   ```

2. **Configure variables:**
   ```bash
   cd terraform
   cp terraform.tfvars.example terraform.tfvars
   # Edit terraform.tfvars with your values
   ```

3. **Deploy:**
   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

4. **Verify:**
   ```bash
   # Check Lambda function
   aws lambda get-function --function-name <service-name>-task-recycler
   
   # Check EventBridge rule
   aws events describe-rule --name <service-name>-task-recycle-schedule
   ```

### Option 2: CloudFormation

1. **Edit parameters:**
   ```bash
   cd cloudformation
   # Edit parameters.json with your values
   ```

2. **Deploy stack:**
   ```bash
   aws cloudformation create-stack \
     --stack-name ecs-task-recycler \
     --template-body file://template.yaml \
     --parameters file://parameters.json \
     --capabilities CAPABILITY_NAMED_IAM
   ```

3. **Monitor deployment:**
   ```bash
   aws cloudformation describe-stacks \
     --stack-name ecs-task-recycler \
     --query 'Stacks[0].StackStatus'
   ```

### Option 3: Manual AWS Console

1. **Create Lambda function:**
   - Go to Lambda console
   - Create function (Python 3.11)
   - Copy code from `lambda_function.py`
   - Add environment variables:
     - `ECS_CLUSTER_NAME`: your cluster name
     - `ECS_SERVICE_NAME`: your service name
   - Set timeout to 60 seconds

2. **Create IAM role for Lambda:**
   - Attach policy allowing:
     - `ecs:UpdateService`
     - `ecs:DescribeServices`
     - `logs:CreateLogGroup`, `logs:CreateLogStream`, `logs:PutLogEvents`

3. **Create EventBridge rule:**
   - Go to EventBridge console
   - Create rule with schedule: `rate(6 hours)`
   - Target: Lambda function created above

## Configuration

### Adjust Recycle Interval

**Terraform:**
```hcl
# terraform.tfvars
recycle_interval_hours = 4  # Change to 4 hours
```

**CloudFormation:**
```json
{
  "ParameterKey": "RecycleIntervalHours",
  "ParameterValue": "4"
}
```

### Recommended Intervals

- **Memory leak is severe**: 4 hours
- **Memory leak is moderate**: 6 hours (default)
- **Memory leak is slow**: 12 hours

## Testing

### Manual Test (Trigger Lambda immediately)

```bash
# Get function name from Terraform/CloudFormation output
FUNCTION_NAME="<service-name>-task-recycler"

# Invoke Lambda manually
aws lambda invoke \
  --function-name $FUNCTION_NAME \
  --payload '{}' \
  response.json

# Check response
cat response.json
```

### Monitor Execution

```bash
# View Lambda logs
aws logs tail /aws/lambda/<service-name>-task-recycler --follow

# Check ECS service events
aws ecs describe-services \
  --cluster <cluster-name> \
  --services <service-name> \
  --query 'services[0].events[0:5]'
```

## Monitoring

### CloudWatch Metrics to Watch

1. **ECS Service Metrics:**
   - `MemoryUtilization` - Should reset after each recycle
   - `CPUUtilization` - Monitor for patterns
   - `RunningTaskCount` - Should remain stable during recycle

2. **Lambda Metrics:**
   - `Invocations` - Should match schedule (4 per day for 6-hour interval)
   - `Errors` - Should be 0
   - `Duration` - Typically < 5 seconds

### Set Up Alarms

```bash
# Alarm if Lambda fails
aws cloudwatch put-metric-alarm \
  --alarm-name ecs-task-recycler-failures \
  --alarm-description "Alert if task recycler Lambda fails" \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 300 \
  --evaluation-periods 1 \
  --threshold 1 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=FunctionName,Value=<service-name>-task-recycler
```

## Troubleshooting

### Lambda fails with "Access Denied"

- Check IAM role has correct permissions
- Verify service ARN in IAM policy matches your service

### Tasks not recycling

- Check EventBridge rule is enabled
- Verify Lambda is being invoked (check CloudWatch Logs)
- Check ECS service deployment configuration

### Service has downtime during recycle

- Increase `maximumPercent` in ECS service (e.g., 200)
- Ensure `minimumHealthyPercent` is 100 or higher
- Check health check configuration

## Cost Estimate

- **Lambda**: ~$0.01/month (4-6 invocations per day, minimal runtime)
- **EventBridge**: Free (included in AWS Free Tier)
- **CloudWatch Logs**: ~$0.50/month (7-day retention)

**Total: ~$0.51/month**

## Next Steps (Fix the Root Cause)

This is a **temporary mitigation**. To fix the memory leak:

1. **Enable heap dumps:**
   ```
   -XX:+HeapDumpOnOutOfMemoryError
   -XX:HeapDumpPath=/tmp/heapdump.hprof
   ```

2. **Analyze with Eclipse MAT or VisualVM**

3. **Common causes in LLM services:**
   - Unclosed HTTP connections
   - Large response buffering
   - Thread pool leaks
   - Cache without eviction

4. **Monitor after fix:**
   - Disable/delete this recycler once leak is fixed
   - Continue monitoring memory patterns

## Cleanup

**Terraform:**
```bash
cd terraform
terraform destroy
```

**CloudFormation:**
```bash
aws cloudformation delete-stack --stack-name ecs-task-recycler
```

## Support

For issues or questions, check:
- Lambda logs: `/aws/lambda/<service-name>-task-recycler`
- ECS service events in AWS Console
- EventBridge rule execution history
