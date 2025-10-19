# JavaScript Modules

This directory contains the modularized JavaScript code for the Todo App.

## File Structure

- **`token-manager.js`** - Handles localStorage operations for GitHub token
- **`github-api.js`** - GitHub API client for file operations
- **`todo-manager.js`** - Business logic for managing todos
- **`writing-manager.js`** - Business logic for capturing raw writings
- **`todo-ui.js`** - UI controller and DOM manipulation
- **`app.js`** - Application initialization

## Load Order

Scripts must be loaded in this order (as specified in `index.html`):

1. `config.js` (parent directory) - Configuration constants
2. `token-manager.js` - Token utilities
3. `github-api.js` - Depends on TokenManager
4. `todo-manager.js` - Depends on GitHubAPI
5. `writing-manager.js` - Depends on GitHubAPI
6. `todo-ui.js` - Depends on TodoManager, WritingManager, and TokenManager
7. `app.js` - Initializes everything

## Features

### Todo Management
- Load todos from `ToDos/List.json`
- Add, toggle, and delete todos
- Save changes and commit to GitHub

### Raw Writing Capture
- Quick capture of spontaneous thoughts
- Auto-generates filename from content
- Fills template with metadata (title, date, tags)
- Saves to `Writing/RawWrittings/` folder
- Commits directly to GitHub

## Adding New Features

When expanding the app:

- **New API methods** → Add to `github-api.js`
- **New todo operations** → Add to `todo-manager.js`
- **New writing operations** → Add to `writing-manager.js`
- **New UI elements** → Add to `todo-ui.js`
- **New configuration** → Add to `../config.js`

## Development & Deployment Workflow

### Development
- Work in the **`ToDoApp/`** directory (parent of this `js/` folder)
- Make changes to any files in `ToDoApp/`
- Test locally by opening `ToDoApp/index.html` in your browser

### Deployment to GitHub Pages
When ready to publish your changes:

```bash
# From the repository root
cd /Users/zan/z/attention

# Copy all updated files to the docs/ folder (GitHub Pages source)
cp -r ToDoApp/* docs/

# Commit and push
git add docs/
git commit -m "Deploy updates to GitHub Pages"
git push
```

### Why Two Folders?
- **`ToDoApp/`** - Development directory where you make changes
- **`docs/`** - Deployment directory that GitHub Pages serves
- This separation keeps your development work organized and allows you to test before deploying

### After Pushing
- GitHub Pages rebuilds in 1-5 minutes
- Clear browser cache or hard refresh (Cmd+Shift+R) to see changes
- Visit your GitHub Pages URL to verify deployment
