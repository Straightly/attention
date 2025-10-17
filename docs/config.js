// GitHub Configuration
// Follow these steps to set up your token:
// 1. Go to https://github.com/settings/tokens?type=beta
// 2. Click "Generate new token" (Fine-grained tokens)
// 3. Token name: "Attention Todo App"
// 4. Expiration: 90 days (or your preference)
// 5. Repository access: "Only select repositories" → Choose "Straightly/attention"
// 6. Permissions → Repository permissions → Contents: "Read and write"
// 7. Click "Generate token" and copy it
// 8. Paste the token below (replace 'YOUR_GITHUB_TOKEN_HERE')

const CONFIG = {
    // Replace this with your actual GitHub token
    GITHUB_TOKEN: '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',
    
    // Your GitHub username and repository
    REPO_OWNER: 'Straightly',
    REPO_NAME: 'attention',
    
    // Branch to commit to
    BRANCH: 'main',
    
    // The single JSON file to manage
    TODO_FILE: 'ToDos/List.json',
    
    // API base URL
    API_BASE: 'https://api.github.com'
};

// Validate configuration
if (CONFIG.GITHUB_TOKEN === 'YOUR_GITHUB_TOKEN_HERE') {
    console.warn('⚠️ GitHub token not configured. Please update config.js');
}
