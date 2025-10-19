// Initialize app
let app;
document.addEventListener('DOMContentLoaded', () => {
    const api = new GitHubAPI(CONFIG);
    const manager = new TodoManager(api);
    app = new TodoUI(manager);
});
