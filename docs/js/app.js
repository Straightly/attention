// Initialize app
let app;
document.addEventListener('DOMContentLoaded', () => {
    const api = new GitHubAPI(CONFIG);
    const manager = new TodoManager(api);
    const writingManager = new WritingManager(api);
    app = new TodoUI(manager, writingManager);
});
