#!/bin/bash

# iOS App Icon Generator
# Generates all required icon sizes from a source image

SOURCE="icon.png"
OUTPUT_DIR="ios/App/App/Assets.xcassets/AppIcon.appiconset"

# Check if source exists
if [ ! -f "$SOURCE" ]; then
    echo "Error: $SOURCE not found!"
    exit 1
fi

echo "Generating iOS app icons from $SOURCE..."

# Get source dimensions
WIDTH=$(sips -g pixelWidth "$SOURCE" | tail -n1 | awk '{print $2}')
HEIGHT=$(sips -g pixelHeight "$SOURCE" | tail -n1 | awk '{print $2}')

echo "Source image: ${WIDTH}x${HEIGHT}"

# Make square by cropping to smaller dimension
if [ $WIDTH -gt $HEIGHT ]; then
    SIZE=$HEIGHT
else
    SIZE=$WIDTH
fi

echo "Creating square base image (${SIZE}x${SIZE})..."
sips -z $SIZE $SIZE "$SOURCE" --out "icon-square.png" > /dev/null

# Generate 1024x1024 for App Store
echo "Generating 1024x1024 (App Store)..."
sips -z 1024 1024 "icon-square.png" --out "${OUTPUT_DIR}/AppIcon-1024.png" > /dev/null

# Generate other required sizes
# iPhone sizes
echo "Generating iPhone icons..."
sips -z 180 180 "icon-square.png" --out "${OUTPUT_DIR}/AppIcon-60@3x.png" > /dev/null
sips -z 120 120 "icon-square.png" --out "${OUTPUT_DIR}/AppIcon-60@2x.png" > /dev/null
sips -z 87 87 "icon-square.png" --out "${OUTPUT_DIR}/AppIcon-29@3x.png" > /dev/null
sips -z 58 58 "icon-square.png" --out "${OUTPUT_DIR}/AppIcon-29@2x.png" > /dev/null
sips -z 80 80 "icon-square.png" --out "${OUTPUT_DIR}/AppIcon-40@2x.png" > /dev/null
sips -z 120 120 "icon-square.png" --out "${OUTPUT_DIR}/AppIcon-40@3x.png" > /dev/null

# iPad sizes (optional but good to have)
echo "Generating iPad icons..."
sips -z 152 152 "icon-square.png" --out "${OUTPUT_DIR}/AppIcon-76@2x.png" > /dev/null
sips -z 76 76 "icon-square.png" --out "${OUTPUT_DIR}/AppIcon-76.png" > /dev/null
sips -z 167 167 "icon-square.png" --out "${OUTPUT_DIR}/AppIcon-83.5@2x.png" > /dev/null

# Notification icons
echo "Generating notification icons..."
sips -z 40 40 "icon-square.png" --out "${OUTPUT_DIR}/AppIcon-20@2x.png" > /dev/null
sips -z 60 60 "icon-square.png" --out "${OUTPUT_DIR}/AppIcon-20@3x.png" > /dev/null

# Clean up temporary file
rm "icon-square.png"

echo "✅ Done! All icon sizes generated in $OUTPUT_DIR"
echo ""
echo "Next steps:"
echo "1. Run: npx cap sync"
echo "2. Rebuild app in Xcode (Cmd+R)"
echo "3. Your new icon should appear!"
