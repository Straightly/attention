@echo off
REM Script to unset proxy environment variables on Windows
REM Run this after closing Windsurf to clear proxy settings

echo Unsetting proxy environment variables...

set http_proxy=
set https_proxy=
set HTTP_PROXY=
set HTTPS_PROXY=
set no_proxy=
set NO_PROXY=

echo Proxy environment variables cleared.
echo Your command prompt is now back to normal settings.
