// GitHub API Helper
class GitHubAPI {
    constructor(config) {
        this.config = config;
        this.baseUrl = `${config.API_BASE}/repos/${config.REPO_OWNER}/${config.REPO_NAME}`;
        this.filePath = config.TODO_FILE;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Authorization': `Bearer ${this.config.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            ...options.headers
        };

        const response = await fetch(url, { ...options, headers });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `GitHub API error: ${response.status}`);
        }
        
        return response.json();
    }

    async getFile() {
        const data = await this.request(`/contents/${this.filePath}?ref=${this.config.BRANCH}`);
        const content = atob(data.content); // Decode base64
        return { content, sha: data.sha };
    }

    async updateFile(content, message, sha) {
        const encodedContent = btoa(unescape(encodeURIComponent(content))); // Encode to base64
        return await this.request(`/contents/${this.filePath}`, {
            method: 'PUT',
            body: JSON.stringify({
                message,
                content: encodedContent,
                sha,
                branch: this.config.BRANCH
            })
        });
    }

    async testConnection() {
        try {
            await this.request('');
            return true;
        } catch (error) {
            throw new Error(`Connection failed: ${error.message}`);
        }
    }
}

// Todo Manager
class TodoManager {
    constructor(api) {
        this.api = api;
        this.currentSha = '';
        this.hasChanges = false;
        this.todos = [];
        this.nextId = 1;
    }

    async loadFile() {
        try {
            const { content, sha } = await this.api.getFile();
            this.currentSha = sha;
            
            const data = JSON.parse(content);
            this.todos = data.todos || [];
            
            // Update nextId
            if (this.todos.length > 0) {
                this.nextId = Math.max(...this.todos.map(t => t.id)) + 1;
            }
            
            this.hasChanges = false;
            return this.todos;
        } catch (error) {
            throw new Error(`Failed to load file: ${error.message}`);
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.hasChanges = true;
        }
    }

    addTodo(text) {
        const newTodo = {
            id: this.nextId++,
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        this.todos.push(newTodo);
        this.hasChanges = true;
    }

    deleteTodo(id) {
        const index = this.todos.findIndex(t => t.id === id);
        if (index !== -1) {
            this.todos.splice(index, 1);
            this.hasChanges = true;
        }
    }

    async saveChanges(commitMessage) {
        try {
            const data = {
                todos: this.todos
            };
            const content = JSON.stringify(data, null, 2);
            
            const response = await this.api.updateFile(
                content,
                commitMessage,
                this.currentSha
            );
            
            // Update SHA from response to avoid conflicts
            this.currentSha = response.content.sha;
            this.hasChanges = false;
            return true;
        } catch (error) {
            throw new Error(`Failed to save changes: ${error.message}`);
        }
    }
}

// UI Controller
class TodoUI {
    constructor(manager) {
        this.manager = manager;
        this.setupElements();
        this.attachEventListeners();
        this.checkSetup();
    }

    setupElements() {
        this.setupSection = document.getElementById('setup-section');
        this.appSection = document.getElementById('app-section');
        this.testConnectionBtn = document.getElementById('test-connection');
        this.connectionStatus = document.getElementById('connection-status');
        this.refreshFileBtn = document.getElementById('refresh-file');
        this.todoList = document.getElementById('todo-list');
        this.newTodoInput = document.getElementById('new-todo');
        this.addTodoBtn = document.getElementById('add-todo-btn');
        this.saveChangesBtn = document.getElementById('save-changes');
        this.changesIndicator = document.getElementById('changes-indicator');
        this.status = document.getElementById('status');
    }

    attachEventListeners() {
        this.testConnectionBtn.addEventListener('click', () => this.testConnection());
        this.refreshFileBtn.addEventListener('click', () => this.loadFile());
        this.addTodoBtn.addEventListener('click', () => this.addTodo());
        this.newTodoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.saveChangesBtn.addEventListener('click', () => this.saveChanges());
    }

    async checkSetup() {
        if (CONFIG.GITHUB_TOKEN === 'YOUR_GITHUB_TOKEN_HERE') {
            this.showSetup();
        } else {
            await this.testConnection();
        }
    }

    showSetup() {
        this.setupSection.style.display = 'block';
        this.appSection.style.display = 'none';
    }

    showApp() {
        this.setupSection.style.display = 'none';
        this.appSection.style.display = 'block';
    }

    async testConnection() {
        this.testConnectionBtn.disabled = true;
        this.testConnectionBtn.innerHTML = 'Testing... <span class="loading"></span>';
        
        try {
            await this.manager.api.testConnection();
            this.connectionStatus.innerHTML = '✅ Connection successful! Loading app...';
            this.connectionStatus.className = 'status success';
            
            setTimeout(() => {
                this.showApp();
                this.loadFile();
            }, 1000);
        } catch (error) {
            this.connectionStatus.innerHTML = `❌ ${error.message}<br><br>Please check your token in config.js`;
            this.connectionStatus.className = 'status error';
            this.testConnectionBtn.disabled = false;
            this.testConnectionBtn.textContent = 'Test Connection';
        }
    }

    async loadFile() {
        this.showStatus('Loading...', 'info');
        this.refreshFileBtn.disabled = true;
        
        try {
            await this.manager.loadFile();
            this.renderTodos();
            this.showStatus(`✅ Loaded: ToDos/List.json`, 'success');
        } catch (error) {
            this.showStatus(`❌ ${error.message}`, 'error');
        } finally {
            this.refreshFileBtn.disabled = false;
        }
    }

    renderTodos() {
        this.todoList.innerHTML = '';
        
        if (this.manager.todos.length === 0) {
            this.todoList.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 40px;">No todos found. Add one below!</p>';
            return;
        }
        
        this.manager.todos.forEach((todo) => {
            const item = document.createElement('div');
            item.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
            
            const label = document.createElement('label');
            label.textContent = todo.text;
            label.addEventListener('click', () => {
                checkbox.checked = !checkbox.checked;
                this.toggleTodo(todo.id);
            });
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '🗑️ Delete';
            deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
            
            item.appendChild(checkbox);
            item.appendChild(label);
            item.appendChild(deleteBtn);
            this.todoList.appendChild(item);
        });
        
        this.updateChangesIndicator();
    }

    toggleTodo(id) {
        this.manager.toggleTodo(id);
        this.renderTodos();
    }

    addTodo() {
        const text = this.newTodoInput.value.trim();
        if (!text) return;
        
        this.manager.addTodo(text);
        this.newTodoInput.value = '';
        this.renderTodos();
        this.showStatus('✅ Todo added (not saved yet)', 'info');
    }

    deleteTodo(id) {
        if (!confirm('Delete this todo?')) return;
        
        this.manager.deleteTodo(id);
        this.renderTodos();
        this.showStatus('✅ Todo deleted (not saved yet)', 'info');
    }

    updateChangesIndicator() {
        if (this.manager.hasChanges) {
            this.changesIndicator.textContent = '⚠️ Unsaved changes';
            this.saveChangesBtn.disabled = false;
        } else {
            this.changesIndicator.textContent = '✅ All changes saved';
            this.saveChangesBtn.disabled = true;
        }
    }

    async saveChanges() {
        this.saveChangesBtn.disabled = true;
        this.saveChangesBtn.textContent = '💾 Saving...';
        
        try {
            const timestamp = new Date().toLocaleString();
            await this.manager.saveChanges(`Update todos via web app - ${timestamp}`);
            this.showStatus('✅ Changes saved and committed to GitHub!', 'success');
            this.renderTodos();
        } catch (error) {
            this.showStatus(`❌ ${error.message}`, 'error');
            this.saveChangesBtn.disabled = false;
        } finally {
            this.saveChangesBtn.textContent = '💾 Save & Commit to GitHub';
        }
    }

    showStatus(message, type) {
        this.status.textContent = message;
        this.status.className = `status ${type}`;
        
        if (type === 'success') {
            setTimeout(() => {
                this.status.textContent = '';
                this.status.className = 'status';
            }, 3000);
        }
    }
}

// Initialize app
let app;
document.addEventListener('DOMContentLoaded', () => {
    const api = new GitHubAPI(CONFIG);
    const manager = new TodoManager(api);
    app = new TodoUI(manager);
});
