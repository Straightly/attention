#!/bin/bash
# Git commit script for Linux/Mac
# Usage: ./commit.sh "Your commit message"

# Check if commit message is provided
if [ -z "$1" ]; then
    echo "Error: Commit message is required"
    echo "Usage: ./commit.sh \"Your commit message\""
    exit 1
fi

# Stage all changes
echo "Staging all changes..."
git add .

# Commit with the provided message
echo "Committing with message: $1"
git commit -a -m "$1"

# Push to remote
echo ""
echo "Pushing to remote..."
git push

# Show status
echo ""
echo "Current status:"
git status
