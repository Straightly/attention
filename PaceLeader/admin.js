// Admin Dashboard JavaScript

// Current user lists
let userLists = {
    admins: [],
    pacers: [],
    runners: []
};

// Check admin access on page load
window.addEventListener('DOMContentLoaded', () => {
    checkAdminAccess();
    loadUserLists();
});

// Check if user is admin
function checkAdminAccess() {
    const selectedRole = localStorage.getItem('selectedRole');

    if (selectedRole !== 'admin') {
        alert('Access Denied: Admin privileges required');
        window.location.href = 'index.html';
        return;
    }
}

// Load user lists from backend
async function loadUserLists() {
    try {
        const response = await fetch('/api/admin/get-lists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Loaded user lists from backend:', data);
            userLists = {
                admins: data.admins || [],
                pacers: data.pacers || [],
                runners: data.runners || []
            };
            renderAllLists();
        } else {
            const errorText = await response.text();
            console.error('Failed to load lists:', response.status, errorText);
            showError('Failed to load user lists: ' + response.status);
        }
    } catch (error) {
        console.error('Error loading user lists:', error);
        showError('Error loading user lists: ' + error.message);
    }
}

// Render all three lists
function renderAllLists() {
    renderList('admins');
    renderList('pacers');
    renderList('runners');
}

// Render a specific list
function renderList(role) {
    const listElement = document.getElementById(`${role}-list`);
    const users = userLists[role];

    if (users.length === 0) {
        listElement.innerHTML = '<div class="empty-state">No users yet</div>';
        return;
    }

    listElement.innerHTML = users.map(email => `
        <li class="user-item">
            <span class="user-email">${email}</span>
            <button class="delete-btn" onclick="deleteUser('${role}', '${email}')">Delete</button>
        </li>
    `).join('');
}

// Add user to a list
async function addUser(role) {
    const inputId = role === 'admins' ? 'admin-email' :
        role === 'pacers' ? 'pacer-email' : 'runner-email';
    const input = document.getElementById(inputId);
    const email = input.value.trim();

    // Validate email
    if (!email) {
        showError('Please enter an email address');
        return;
    }

    if (!email.includes('@gmail.com')) {
        showError('Please enter a valid Gmail address');
        return;
    }

    // Check if already exists
    if (userLists[role].includes(email)) {
        showError('User already exists in this list');
        return;
    }

    // Add to list
    userLists[role].push(email);

    // Save to backend
    const success = await saveToBackend();

    if (success) {
        input.value = '';
        // Reload from backend to ensure we have latest data
        await loadUserLists();
        showSuccess(`Added ${email} to ${role}`);
    } else {
        // Rollback if save failed
        userLists[role] = userLists[role].filter(e => e !== email);
    }
}

// Delete user from a list
async function deleteUser(role, email) {
    if (!confirm(`Remove ${email} from ${role}?`)) {
        return;
    }

    // Store original list for rollback
    const originalList = [...userLists[role]];

    // Remove from list
    userLists[role] = userLists[role].filter(e => e !== email);

    // Save to backend
    const success = await saveToBackend();

    if (success) {
        // Reload from backend to ensure we have latest data
        await loadUserLists();
        showSuccess(`Removed ${email} from ${role}`);
    } else {
        // Rollback if save failed
        userLists[role] = originalList;
        renderList(role);
    }
}

// Save lists to backend
async function saveToBackend() {
    try {
        const response = await fetch('/api/admin/update-lists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userLists)
        });

        if (!response.ok) {
            const error = await response.json();
            showError(error.error || 'Failed to save changes');
            return false;
        }

        return true;
    } catch (error) {
        showError('Error saving changes: ' + error.message);
        return false;
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';

    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Show success message
function showSuccess(message) {
    const successDiv = document.getElementById('success-message');
    successDiv.textContent = message;
    successDiv.style.display = 'block';

    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 3000);
}

// Sign out
function signOut() {
    localStorage.clear();
    window.location.href = 'index.html';
}
