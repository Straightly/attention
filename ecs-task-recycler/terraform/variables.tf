variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
  default     = "us-east-1"
}

variable "service_name" {
  description = "Name prefix for all resources"
  type        = string
  default     = "my-service"
}

variable "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  type        = string
}

variable "ecs_service_name" {
  description = "Name of the ECS service to recycle"
  type        = string
}

variable "recycle_interval_hours" {
  description = "How often to recycle tasks (in hours)"
  type        = number
  default     = 6
}
