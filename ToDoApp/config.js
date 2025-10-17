// GitHub Configuration
// Token will be stored in browser's localStorage after first login
// This keeps your token secure and not committed to the repository

const CONFIG = {
    // Your GitHub username and repository
    REPO_OWNER: 'Straightly',
    REPO_NAME: 'attention',
    
    // Branch to commit to
    BRANCH: 'main',
    
    // The single JSON file to manage
    TODO_FILE: 'ToDos/List.json',
    
    // API base URL
    API_BASE: 'https://api.github.com',
    
    // LocalStorage key for token
    TOKEN_STORAGE_KEY: 'github_token_attention'
};

// Token management
const TokenManager = {
    get() {
        return localStorage.getItem(CONFIG.TOKEN_STORAGE_KEY);
    },
    
    set(token) {
        localStorage.setItem(CONFIG.TOKEN_STORAGE_KEY, token);
    },
    
    clear() {
        localStorage.removeItem(CONFIG.TOKEN_STORAGE_KEY);
    },
    
    exists() {
        return !!this.get();
    }
};
