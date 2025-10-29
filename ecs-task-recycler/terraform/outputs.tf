output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.ecs_task_recycler.function_name
}

output "lambda_function_arn" {
  description = "ARN of the Lambda function"
  value       = aws_lambda_function.ecs_task_recycler.arn
}

output "eventbridge_rule_name" {
  description = "Name of the EventBridge rule"
  value       = aws_cloudwatch_event_rule.ecs_task_recycle_schedule.name
}

output "schedule_expression" {
  description = "Schedule expression for task recycling"
  value       = aws_cloudwatch_event_rule.ecs_task_recycle_schedule.schedule_expression
}

output "cloudwatch_log_group" {
  description = "CloudWatch Log Group for Lambda logs"
  value       = aws_cloudwatch_log_group.ecs_task_recycler.name
}
