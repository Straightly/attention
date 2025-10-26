#!/bin/bash
# Script to launch Windsurf with proxy settings on macOS/Linux
# The proxy settings only affect Windsurf, not other processes

echo "Launching Windsurf with proxy settings..."
echo "  HTTP_PROXY: http://localhost:8080"
echo "  HTTPS_PROXY: http://localhost:8080"
echo ""

# Launch Windsurf with proxy environment variables
# These variables only exist in the Windsurf process, not in parent shell
env \
  http_proxy="http://localhost:8080" \
  https_proxy="http://localhost:8080" \
  HTTP_PROXY="http://localhost:8080" \
  HTTPS_PROXY="http://localhost:8080" \
  no_proxy="localhost,127.0.0.1,::1" \
  NO_PROXY="localhost,127.0.0.1,::1" \
  open -a "Windsurf"

# Alternative method using direct executable path:
# env \
#   http_proxy="http://localhost:8080" \
#   https_proxy="http://localhost:8080" \
#   HTTP_PROXY="http://localhost:8080" \
#   HTTPS_PROXY="http://localhost:8080" \
#   /Applications/Windsurf.app/Contents/MacOS/Windsurf

echo "Windsurf launched with isolated proxy settings."
echo "Your shell and other processes are not affected."
