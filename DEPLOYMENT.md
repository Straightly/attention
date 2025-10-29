# ToDoApp Deployment Guide

This project uses a two-folder structure for development and deployment:

- **`ToDoApp/`** - Development folder (make changes here)
- **`docs/`** - Production folder (deployed to GitHub Pages)

## Quick Deployment

After making changes in the `ToDoApp` folder, deploy to `docs` using the appropriate script:

### Windows
```cmd
copy-to-docs.bat
```

### Mac/Linux
```bash
./copy-to-docs.sh
```

## What Gets Copied

The deployment scripts copy these files:
- `js/todo-manager.js`
- `js/todo-ui.js`
- `index.html`
- `style.css`

## Workflow

1. **Develop** - Make changes in `ToDoApp/` folder
2. **Test** - Open `ToDoApp/index.html` locally to test
3. **Deploy** - Run the copy script to update `docs/`
4. **Commit** - Commit and push changes to GitHub
5. **Live** - Changes appear on GitHub Pages

## Notes

- The `docs` folder is configured for GitHub Pages deployment
- Always test in `ToDoApp` before deploying to `docs`
- The scripts will overwrite files in `docs` without confirmation
- Other files in `docs` (like `config.js`, `js/github-api.js`, etc.) are not overwritten
