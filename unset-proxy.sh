#!/bin/bash
# Script to unset proxy environment variables on macOS/Linux
# Run this after closing Windsurf to clear proxy settings

echo "Unsetting proxy environment variables..."

unset http_proxy
unset https_proxy
unset HTTP_PROXY
unset HTTPS_PROXY
unset no_proxy
unset NO_PROXY

echo "Proxy environment variables cleared."
echo "Your shell is now back to normal settings."
