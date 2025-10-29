@echo off
REM Copy ToDoApp files to docs folder for GitHub Pages deployment

echo.
echo ========================================
echo  Deploying ToDoApp to docs folder
echo ========================================
echo.

REM Copy JavaScript files
echo Copying JavaScript files...
copy /Y "ToDoApp\js\todo-manager.js" "docs\js\todo-manager.js"
copy /Y "ToDoApp\js\todo-ui.js" "docs\js\todo-ui.js"

REM Copy HTML file
echo Copying HTML file...
copy /Y "ToDoApp\index.html" "docs\index.html"

REM Copy CSS file
echo Copying CSS file...
copy /Y "ToDoApp\style.css" "docs\style.css"

echo.
echo ========================================
echo  Deployment Complete!
echo ========================================
echo.
echo Files copied to docs folder:
echo   - js/todo-manager.js
echo   - js/todo-ui.js
echo   - index.html
echo   - style.css
echo.
echo You can now commit and push to deploy to GitHub Pages.
echo.

pause
