#!/bin/bash

# Copy ToDoApp files to docs folder for GitHub Pages deployment

echo ""
echo "========================================"
echo " Deploying ToDoApp to docs folder"
echo "========================================"
echo ""

# Copy JavaScript files
echo "Copying JavaScript files..."
cp -f "ToDoApp/js/todo-manager.js" "docs/js/todo-manager.js"
cp -f "ToDoApp/js/todo-ui.js" "docs/js/todo-ui.js"

# Copy HTML file
echo "Copying HTML file..."
cp -f "ToDoApp/index.html" "docs/index.html"

# Copy CSS file
echo "Copying CSS file..."
cp -f "ToDoApp/style.css" "docs/style.css"

echo ""
echo "========================================"
echo " Deployment Complete!"
echo "========================================"
echo ""
echo "Files copied to docs folder:"
echo "  - js/todo-manager.js"
echo "  - js/todo-ui.js"
echo "  - index.html"
echo "  - style.css"
echo ""
echo "You can now commit and push to deploy to GitHub Pages."
echo ""
