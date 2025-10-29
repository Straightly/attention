// Todo Manager
class TodoManager {
    constructor(api) {
        this.api = api;
        this.currentSha = '';
        this.hasChanges = false;
        this.todos = [];
        this.nextId = 1;
    }

    parseTags(text) {
        // Extract hashtags from text (e.g., #work #idea)
        const tagRegex = /#(\w+)/g;
        const tags = [];
        let match;
        while ((match = tagRegex.exec(text)) !== null) {
            tags.push(match[1].toLowerCase());
        }
        return [...new Set(tags)]; // Remove duplicates
    }

    getAllTags() {
        // Get all unique tags from all todos
        const allTags = new Set();
        this.todos.forEach(todo => {
            if (todo.tags) {
                todo.tags.forEach(tag => allTags.add(tag));
            }
        });
        return Array.from(allTags).sort();
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
        const tags = this.parseTags(text);
        const newTodo = {
            id: this.nextId++,
            text: text,
            tags: tags,
            completed: false,
            createdAt: new Date().toISOString()
        };
        this.todos.push(newTodo);
        this.hasChanges = true;
    }

    updateTodo(id, newText) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.text = newText;
            todo.tags = this.parseTags(newText);
            this.hasChanges = true;
        }
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
