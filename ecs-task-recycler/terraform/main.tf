terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Lambda IAM Role
resource "aws_iam_role" "ecs_task_recycler_lambda" {
  name = "${var.service_name}-task-recycler-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Lambda IAM Policy for ECS and CloudWatch Logs
resource "aws_iam_role_policy" "ecs_task_recycler_lambda_policy" {
  name = "${var.service_name}-task-recycler-lambda-policy"
  role = aws_iam_role.ecs_task_recycler_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecs:UpdateService",
          "ecs:DescribeServices"
        ]
        Resource = [
          "arn:aws:ecs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:service/${var.ecs_cluster_name}/${var.ecs_service_name}"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:log-group:/aws/lambda/${var.service_name}-task-recycler:*"
      }
    ]
  })
}

# Data source for current AWS account
data "aws_caller_identity" "current" {}

# Lambda function
resource "aws_lambda_function" "ecs_task_recycler" {
  filename         = "${path.module}/../lambda_deployment.zip"
  function_name    = "${var.service_name}-task-recycler"
  role            = aws_iam_role.ecs_task_recycler_lambda.arn
  handler         = "lambda_function.lambda_handler"
  source_code_hash = filebase64sha256("${path.module}/../lambda_deployment.zip")
  runtime         = "python3.11"
  timeout         = 60

  environment {
    variables = {
      ECS_CLUSTER_NAME = var.ecs_cluster_name
      ECS_SERVICE_NAME = var.ecs_service_name
    }
  }

  depends_on = [
    aws_iam_role_policy.ecs_task_recycler_lambda_policy
  ]
}

# CloudWatch Log Group for Lambda
resource "aws_cloudwatch_log_group" "ecs_task_recycler" {
  name              = "/aws/lambda/${var.service_name}-task-recycler"
  retention_in_days = 7
}

# EventBridge Rule (runs on schedule)
resource "aws_cloudwatch_event_rule" "ecs_task_recycle_schedule" {
  name                = "${var.service_name}-task-recycle-schedule"
  description         = "Trigger ECS task recycle every ${var.recycle_interval_hours} hours"
  schedule_expression = "rate(${var.recycle_interval_hours} hours)"
}

# EventBridge Target (Lambda)
resource "aws_cloudwatch_event_target" "ecs_task_recycler_lambda" {
  rule      = aws_cloudwatch_event_rule.ecs_task_recycle_schedule.name
  target_id = "EcsTaskRecyclerLambda"
  arn       = aws_lambda_function.ecs_task_recycler.arn
}

# Lambda permission for EventBridge to invoke
resource "aws_lambda_permission" "allow_eventbridge" {
  statement_id  = "AllowExecutionFromEventBridge"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.ecs_task_recycler.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.ecs_task_recycle_schedule.arn
}
