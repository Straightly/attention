@echo off
REM Git commit script for Windows
REM Usage: commit.bat "Your commit message"

REM Check if commit message is provided
if "%~1"=="" (
    echo Error: Commit message is required
    echo Usage: commit.bat "Your commit message"
    exit /b 1
)

REM Stage all changes
echo Staging all changes...
git add .

REM Commit with the provided message
echo Committing with message: %~1
git commit -a -m "%~1"

REM Show status
echo.
echo Current status:
git status
