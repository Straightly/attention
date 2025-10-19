# JavaScript Modules

This directory contains the modularized JavaScript code for the Todo App.

## File Structure

- **`token-manager.js`** - Handles localStorage operations for GitHub token
- **`github-api.js`** - GitHub API client for file operations
- **`todo-manager.js`** - Business logic for managing todos
- **`todo-ui.js`** - UI controller and DOM manipulation
- **`app.js`** - Application initialization

## Load Order

Scripts must be loaded in this order (as specified in `index.html`):

1. `config.js` (parent directory) - Configuration constants
2. `token-manager.js` - Token utilities
3. `github-api.js` - Depends on TokenManager
4. `todo-manager.js` - Depends on GitHubAPI
5. `todo-ui.js` - Depends on TodoManager and TokenManager
6. `app.js` - Initializes everything

## Adding New Features

When expanding the app:

- **New API methods** → Add to `github-api.js`
- **New todo operations** → Add to `todo-manager.js`
- **New UI elements** → Add to `todo-ui.js`
- **New configuration** → Add to `../config.js`
