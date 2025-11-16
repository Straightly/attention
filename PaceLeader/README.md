# PaceLeader

A web application with Google OAuth authentication, ready to deploy on Cloudflare Pages.

## Setup Instructions

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing one)
3. Enable the **Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:8000` (for local testing)
     - `https://your-project-name.pages.dev` (your Cloudflare Pages URL)
   - Add authorized redirect URIs (same as above)
   - Click "Create"
5. Copy your **Client ID** (looks like: `xxxxx.apps.googleusercontent.com`)

### 2. Configure the App

Edit `app.js` and replace the placeholder:

```javascript
const GOOGLE_CLIENT_ID = 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com';
```

### 3. Test Locally

```bash
# Navigate to the PaceLeader directory
cd PaceLeader

# Start a local server (Python 3)
python3 -m http.server 8000

# Or use Node.js
npx http-server -p 8000
```

Open http://localhost:8000 in your browser and test the Google sign-in.

### 4. Deploy to Cloudflare Pages

#### Option A: Using Cloudflare Dashboard (Easiest)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click "Pages" in the sidebar
3. Click "Create a project"
4. Choose "Connect to Git" or "Direct Upload"
5. If using Git:
   - Connect your GitHub account
   - Select your repository
   - Set build settings:
     - **Build command**: (leave empty)
     - **Build output directory**: `PaceLeader`
6. If using Direct Upload:
   - Drag and drop the `PaceLeader` folder
7. Click "Deploy"

#### Option B: Using Wrangler CLI

```bash
# Install Wrangler (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
cd PaceLeader
wrangler pages deploy . --project-name=paceleader
```

### 5. Update Google OAuth Settings

After deployment, add your Cloudflare Pages URL to Google OAuth:

1. Go back to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Click on your OAuth 2.0 Client ID
4. Add your Cloudflare Pages URL to:
   - **Authorized JavaScript origins**: `https://paceleader.pages.dev`
   - **Authorized redirect URIs**: `https://paceleader.pages.dev`
5. Save changes

## Features

- ✅ Google OAuth authentication
- ✅ Clean, modern UI
- ✅ Session persistence (localStorage)
- ✅ Sign out functionality
- ✅ Responsive design
- ✅ Ready for Cloudflare Pages deployment

## Current Functionality

Right now, the app only provides:
- Google sign-in page
- Display of authenticated user info (name, email)
- Sign out functionality

This serves as the authentication foundation for future features.

## Next Steps

Once authentication is verified:
1. Add backend API (Cloudflare Workers)
2. Implement user allowlist
3. Build actual PaceLeader features

## File Structure

```
PaceLeader/
├── index.html      # Main HTML page with login UI
├── app.js          # Google OAuth logic
└── README.md       # This file
```

## Troubleshooting

### "Sign in with Google" button doesn't work
- Check that you've replaced `YOUR_GOOGLE_CLIENT_ID_HERE` in `app.js`
- Verify your domain is added to Google OAuth authorized origins
- Check browser console for errors

### "Access blocked" error from Google
- Make sure you've added the correct authorized JavaScript origins
- Wait a few minutes after updating Google OAuth settings (can take time to propagate)

### Local testing issues
- Use `http://localhost:8000` (not `127.0.0.1` or `file://`)
- Make sure `http://localhost:8000` is in your Google OAuth authorized origins

## Security Notes

- The Google Client ID is public and safe to commit to Git
- User credentials are stored in browser localStorage (client-side only)
- For production, consider adding server-side session management
- Implement user allowlist checking before granting access to features
