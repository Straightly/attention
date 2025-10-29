// UI Controller
class TodoUI {
    constructor(manager, writingManager) {
        this.manager = manager;
        this.writingManager = writingManager;
        this.showCompleted = false;
        this.selectedTags = new Set(); // Track active tag filters
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
        this.rawWritingText = document.getElementById('raw-writing-text');
        this.saveWritingBtn = document.getElementById('save-writing-btn');
        this.writingStatus = document.getElementById('writing-status');
        this.showCompletedToggle = document.getElementById('show-completed-toggle');
        this.tagFilters = document.getElementById('tag-filters');
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
        this.saveWritingBtn.addEventListener('click', () => this.saveRawWriting());
        this.showCompletedToggle.addEventListener('change', () => this.toggleShowCompleted());
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

    toggleShowCompleted() {
        this.showCompleted = this.showCompletedToggle.checked;
        this.renderTodos();
    }

    toggleTagFilter(tag) {
        if (this.selectedTags.has(tag)) {
            this.selectedTags.delete(tag);
        } else {
            this.selectedTags.add(tag);
        }
        this.renderTodos();
        this.renderTagFilters();
    }

    renderTagFilters() {
        const allTags = this.manager.getAllTags();
        
        if (allTags.length === 0) {
            this.tagFilters.innerHTML = '<p class="no-tags">No tags yet. Add hashtags to your todos like #work #idea</p>';
            return;
        }

        this.tagFilters.innerHTML = '<div class="tag-filters-label">Filter by tags:</div>';
        const container = document.createElement('div');
        container.className = 'tag-filter-buttons';

        allTags.forEach(tag => {
            const button = document.createElement('button');
            button.className = `tag-filter ${this.selectedTags.has(tag) ? 'active' : ''}`;
            button.textContent = `#${tag}`;
            button.addEventListener('click', () => this.toggleTagFilter(tag));
            container.appendChild(button);
        });

        this.tagFilters.appendChild(container);
    }

    renderTodos() {
        this.todoList.innerHTML = '';
        
        // Filter todos based on showCompleted toggle
        let displayTodos = this.showCompleted 
            ? this.manager.todos 
            : this.manager.todos.filter(todo => !todo.completed);
        
        // Filter by selected tags (if any)
        if (this.selectedTags.size > 0) {
            displayTodos = displayTodos.filter(todo => {
                if (!todo.tags || todo.tags.length === 0) return false;
                // Show todo if it has ANY of the selected tags
                return todo.tags.some(tag => this.selectedTags.has(tag));
            });
        }
        
        if (displayTodos.length === 0) {
            const message = this.selectedTags.size > 0
                ? 'No todos match the selected tags.'
                : this.showCompleted 
                    ? 'No todos found. Add one below!' 
                    : 'No active todos. Add one below!';
            this.todoList.innerHTML = `<p style="text-align: center; color: #6c757d; padding: 40px;">${message}</p>`;
            this.renderTagFilters();
            return;
        }
        
        displayTodos.forEach((todo) => {
            const item = document.createElement('div');
            item.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            item.dataset.todoId = todo.id;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
            
            const textContainer = document.createElement('div');
            textContainer.className = 'todo-text-container';
            
            // Add tags if they exist
            if (todo.tags && todo.tags.length > 0) {
                const tagsContainer = document.createElement('div');
                tagsContainer.className = 'todo-tags';
                todo.tags.forEach(tag => {
                    const tagChip = document.createElement('span');
                    tagChip.className = 'tag-chip';
                    tagChip.textContent = `#${tag}`;
                    tagsContainer.appendChild(tagChip);
                });
                textContainer.appendChild(tagsContainer);
            }
            
            const label = document.createElement('label');
            label.textContent = todo.text;
            label.className = 'todo-label';
            label.addEventListener('dblclick', () => this.startEditing(todo.id, label, textContainer));
            
            textContainer.appendChild(label);
            
            item.appendChild(checkbox);
            item.appendChild(textContainer);
            this.todoList.appendChild(item);
        });
        
        this.renderTagFilters();
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

    startEditing(id, label, container) {
        const currentText = label.textContent;
        
        // Create input field
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'todo-edit-input';
        input.value = currentText;
        
        // Replace label with input
        container.innerHTML = '';
        container.appendChild(input);
        input.focus();
        input.select();
        
        // Save on Enter or blur
        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                this.manager.updateTodo(id, newText);
                this.showStatus('✅ Todo updated (not saved yet)', 'info');
            }
            this.renderTodos();
        };
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEdit();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.renderTodos(); // Cancel editing
            }
        });
        
        input.addEventListener('blur', saveEdit);
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

    showWritingStatus(message, type) {
        this.writingStatus.textContent = message;
        this.writingStatus.className = `status ${type}`;
        
        if (type === 'success') {
            setTimeout(() => {
                this.writingStatus.textContent = '';
                this.writingStatus.className = 'status';
            }, 5000);
        }
    }

    async saveRawWriting() {
        const content = this.rawWritingText.value.trim();
        
        if (!content) {
            this.showWritingStatus('❌ Please enter some content', 'error');
            return;
        }

        // Save any pending todo changes first
        if (this.manager.hasChanges) {
            try {
                const timestamp = new Date().toLocaleString();
                await this.manager.saveChanges(`Auto-save todos before capturing raw writing - ${timestamp}`);
                this.renderTodos();
            } catch (error) {
                this.showWritingStatus(`⚠️ Warning: Could not save todos: ${error.message}`, 'error');
                // Continue anyway
            }
        }

        this.saveWritingBtn.disabled = true;
        this.saveWritingBtn.textContent = '💾 Saving...';
        this.showWritingStatus('Saving raw writing...', 'info');

        try {
            const timestamp = new Date().toLocaleString();
            const result = await this.writingManager.saveWriting(
                content,
                `Add raw writing via web app - ${timestamp}`
            );

            this.showWritingStatus(
                `✅ Saved as ${result.fileName} and committed to GitHub!`,
                'success'
            );
            this.rawWritingText.value = ''; // Clear the textarea
        } catch (error) {
            this.showWritingStatus(`❌ ${error.message}`, 'error');
        } finally {
            this.saveWritingBtn.disabled = false;
            this.saveWritingBtn.textContent = '💾 Save Raw Writing';
        }
    }
}
