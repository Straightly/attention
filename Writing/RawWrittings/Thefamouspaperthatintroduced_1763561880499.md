---
title: The famous paper that introduced Chain-of-Thought (CoT) p...
date: 2025-11-19
tags: #time #art #ai
context: Captured via web app
status: raw-idea
---

## Initial Spark

The famous paper that introduced Chain-of-Thought (CoT) prompting and demonstrated that it is dramatically superior to standard few-shot prompting (i.e., just giving samples without reasoning steps) is:
Title: PaLM: Scaling Language Models with Pathways Specific section/paper that introduced Chain-of-Thought: “Chain-of-Thought Prompting Elicits Reasoning in Large Language Models” (authors: Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Brian Ichter, Fei Xia, Ed Chi, Quoc Le, Denny Zhou)
	•	Conference: NeurIPS 2022
	•	First posted on arXiv: January 2022 (arXiv:2201.11903)
	•	Google Brain / Google Research team
Key result everyone remembers
On arithmetic reasoning benchmarks (especially multi-step problems like GSM8K and MultiArith), simply adding “Let’s think step by step” and having the model write out its reasoning before the final answer caused massive jumps in accuracy:
Model Size
Standard few-shot prompting
Chain-of-Thought prompting
Improvement
540B PaLM
18% (GSM8K)
58%
+40% absolute
540B PaLM
~55% (with majority voting)
74% (with self-consistency)
State-of-the-art at the time
The paper showed that:
	•	Just giving correct answer examples (standard few-shot) barely helps large models on multi-step reasoning.
	•	Forcing the model to produce intermediate reasoning steps (“chain of thought”) unlocks emergent reasoning ability that was completely hidden with standard prompting.
This 2022 Chain-of-Thought paper is the one that started the entire CoT revolution and is by far the most cited and famous article showing CoT > plain samples/few-shot prompting.
Link: https://arxiv.org/abs/2201.11903

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
