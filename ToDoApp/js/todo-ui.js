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
        this.tokenInput = document.getElementById('token-input');
        this.saveTokenBtn = document.getElementById('save-token');
        this.showTokenBtn = document.getElementById('show-token');
        this.connectionStatus = document.getElementById('connection-status');
        this.refreshFileBtn = document.getElementById('refresh-file');
        this.logoutBtn = document.getElementById('logout-btn');
        this.todoList = document.getElementById('todo-list');
        this.newTodoInput = document.getElementById('new-todo');
        this.addTodoBtn = document.getElementById('add-todo-btn');
        this.saveChangesBtn = document.getElementById('save-changes');
        this.changesIndicator = document.getElementById('changes-indicator');
        this.status = document.getElementById('status');
    }

    attachEventListeners() {
        this.saveTokenBtn.addEventListener('click', () => this.saveToken());
        this.showTokenBtn.addEventListener('click', () => this.toggleTokenVisibility());
        this.tokenInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveToken();
        });
        this.refreshFileBtn.addEventListener('click', () => this.loadFile());
        this.logoutBtn.addEventListener('click', () => this.logout());
        this.addTodoBtn.addEventListener('click', () => this.addTodo());
        this.newTodoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.saveChangesBtn.addEventListener('click', () => this.saveChanges());
    }

    async checkSetup() {
        if (TokenManager.exists()) {
            await this.testConnection();
        } else {
            this.showSetup();
        }
    }

    toggleTokenVisibility() {
        if (this.tokenInput.type === 'password') {
            this.tokenInput.type = 'text';
            this.showTokenBtn.textContent = '🙈 Hide';
        } else {
            this.tokenInput.type = 'password';
            this.showTokenBtn.textContent = '👁️ Show';
        }
    }

    async saveToken() {
        const token = this.tokenInput.value.trim();
        if (!token) {
            this.connectionStatus.innerHTML = '❌ Please enter a token';
            this.connectionStatus.className = 'status error';
            return;
        }

        if (!token.startsWith('github_pat_') && !token.startsWith('ghp_')) {
            this.connectionStatus.innerHTML = '⚠️ Token should start with github_pat_ or ghp_';
            this.connectionStatus.className = 'status error';
            return;
        }

        TokenManager.set(token);
        await this.testConnection();
    }

    logout() {
        if (confirm('Are you sure you want to logout? Your token will be removed from this browser.')) {
            TokenManager.clear();
            this.tokenInput.value = '';
            this.showSetup();
            this.connectionStatus.innerHTML = '✅ Logged out successfully';
            this.connectionStatus.className = 'status success';
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
        this.saveTokenBtn.disabled = true;
        this.saveTokenBtn.innerHTML = 'Testing... <span class="loading"></span>';
        
        try {
            await this.manager.api.testConnection();
            this.connectionStatus.innerHTML = '✅ Connection successful! Loading app...';
            this.connectionStatus.className = 'status success';
            
            setTimeout(() => {
                this.showApp();
                this.loadFile();
            }, 1000);
        } catch (error) {
            this.connectionStatus.innerHTML = `❌ ${error.message}<br><br>Please check your token`;
            this.connectionStatus.className = 'status error';
            TokenManager.clear(); // Clear invalid token
            this.saveTokenBtn.disabled = false;
            this.saveTokenBtn.textContent = 'Save & Connect';
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
