import json
import boto3
import os
from datetime import datetime

ecs_client = boto3.client('ecs')

def lambda_handler(event, context):
    """
    Lambda function to force a new deployment of an ECS service.
    This causes ECS to gracefully replace all tasks with new ones.
    """
    
    cluster_name = os.environ.get('ECS_CLUSTER_NAME')
    service_name = os.environ.get('ECS_SERVICE_NAME')
    
    if not cluster_name or not service_name:
        error_msg = "Missing required environment variables: ECS_CLUSTER_NAME and/or ECS_SERVICE_NAME"
        print(error_msg)
        return {
            'statusCode': 400,
            'body': json.dumps({'error': error_msg})
        }
    
    try:
        print(f"Starting task recycle for service: {service_name} in cluster: {cluster_name}")
        
        # Force new deployment - ECS will gracefully replace tasks
        response = ecs_client.update_service(
            cluster=cluster_name,
            service=service_name,
            forceNewDeployment=True
        )
        
        deployment_id = response['service']['deployments'][0]['id']
        task_definition = response['service']['taskDefinition']
        
        result = {
            'timestamp': datetime.utcnow().isoformat(),
            'cluster': cluster_name,
            'service': service_name,
            'deploymentId': deployment_id,
            'taskDefinition': task_definition,
            'message': 'Successfully triggered task recycle'
        }
        
        print(f"Success: {json.dumps(result)}")
        
        return {
            'statusCode': 200,
            'body': json.dumps(result)
        }
        
    except Exception as e:
        error_msg = f"Failed to recycle tasks: {str(e)}"
        print(error_msg)
        return {
            'statusCode': 500,
            'body': json.dumps({'error': error_msg})
        }
