@echo off
REM Script to launch Windsurf with proxy settings on Windows
REM The proxy settings only affect Windsurf, not other processes

setlocal

REM Set proxy environment variables (only in this script's scope)
set http_proxy=http://localhost:8080
set https_proxy=http://localhost:8080
set HTTP_PROXY=http://localhost:8080
set HTTPS_PROXY=http://localhost:8080
set no_proxy=localhost,127.0.0.1,::1
set NO_PROXY=localhost,127.0.0.1,::1

echo Launching Windsurf with proxy settings...
echo   HTTP_PROXY: %HTTP_PROXY%
echo   HTTPS_PROXY: %HTTPS_PROXY%
echo.

REM Launch Windsurf (inherits environment variables from this script only)
REM Common installation paths:
start "" "%LOCALAPPDATA%\Programs\Windsurf\Windsurf.exe"

REM Alternative paths if the above doesn't work:
REM start "" "%PROGRAMFILES%\Windsurf\Windsurf.exe"
REM start "" "C:\Program Files\Windsurf\Windsurf.exe"

echo Windsurf launched with isolated proxy settings.
echo Your system and other processes are not affected.
echo.
pause

endlocal
