#!/bin/bash
# Script to set proxy environment variables and launch Windsurf on macOS/Linux
# These settings will affect the current shell session

echo "Setting proxy environment variables..."
echo "  HTTP_PROXY: http://localhost:8080"
echo "  HTTPS_PROXY: http://localhost:8080"
echo ""

# Export proxy environment variables
export http_proxy=http://localhost:8080
export https_proxy=http://localhost:8080
export HTTP_PROXY=http://localhost:8080
export HTTPS_PROXY=http://localhost:8080
export no_proxy=localhost,127.0.0.1,::1
export NO_PROXY=localhost,127.0.0.1,::1

# Disable SSL certificate verification for mitmproxy
export NODE_TLS_REJECT_UNAUTHORIZED=0

echo "Environment variables set in current shell."
echo "NOTE: SSL certificate validation is DISABLED for debugging."
echo ""

# First, quit any running Windsurf instances
if pgrep -x "Windsurf" > /dev/null; then
    echo "Closing existing Windsurf instance..."
    osascript -e 'quit app "Windsurf"'
    sleep 2
fi

# Launch Windsurf with additional Electron flags for proxy
# Using open with --args to pass command-line arguments
/Applications/Windsurf.app/Contents/MacOS/Electron \
    --proxy-server="http://localhost:8080" \
    --ignore-certificate-errors &

echo ""
echo "Windsurf launched with proxy settings and certificate errors ignored."
echo "Run './unset-proxy.sh' after closing Windsurf to clear proxy settings."
