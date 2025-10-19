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
