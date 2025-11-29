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

function getDisplayEntries(role) {
    const admins = userLists.admins || [];
    const pacers = userLists.pacers || [];
    const runners = userLists.runners || [];

    if (role === 'admins') {
        return admins.map(entry => ({ entry, sourceRole: 'admins' }));
    }

    if (role === 'pacers') {
        const result = [];
        for (const e of pacers) {
            result.push({ entry: e, sourceRole: 'pacers' });
        }
        const pacerEmails = new Set(pacers.map(e => e.email));
        for (const e of admins) {
            if (!pacerEmails.has(e.email)) {
                result.push({ entry: e, sourceRole: 'admins' });
            }
        }
        return result;
    }

    if (role === 'runners') {
        const result = [];
        for (const e of runners) {
            result.push({ entry: e, sourceRole: 'runners' });
        }
        const runnerEmails = new Set(runners.map(e => e.email));
        const pacerEmails = new Set(pacers.map(e => e.email));
        for (const e of pacers) {
            if (!runnerEmails.has(e.email)) {
                result.push({ entry: e, sourceRole: 'pacers' });
            }
        }
        for (const e of admins) {
            if (!runnerEmails.has(e.email) && !pacerEmails.has(e.email)) {
                result.push({ entry: e, sourceRole: 'admins' });
            }
        }
        return result;
    }

    return [];
}

// Render a specific list
function renderList(role) {
    const listElement = document.getElementById(`${role}-list`);
    const items = getDisplayEntries(role);

    if (items.length === 0) {
        listElement.innerHTML = '<div class="empty-state">No users yet</div>';
        return;
    }

    listElement.innerHTML = '';

    items.forEach(({ entry, sourceRole }) => {
        const li = document.createElement('li');
        li.className = 'user-item';

        const isOwn = sourceRole === role;

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = entry.displayName || (entry.email || '');
        nameInput.className = 'user-email';
        nameInput.style.marginRight = '8px';

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.value = entry.email || '';
        emailInput.className = 'user-email';

        if (!isOwn) {
            nameInput.disabled = true;
            emailInput.disabled = true;
        } else {
            const originalName = entry.displayName || (entry.email || '');
            const originalEmail = entry.email || '';

            nameInput.addEventListener('blur', async () => {
                const newName = nameInput.value.trim();
                if (newName === originalName) return;
                const list = userLists[role] || [];
                const idx = list.findIndex(u => u.id === entry.id);
                if (idx === -1) return;
                list[idx] = { ...list[idx], displayName: newName };
                const ok = await saveToBackend();
                if (!ok) {
                    list[idx] = { ...list[idx], displayName: originalName };
                    nameInput.value = originalName;
                } else {
                    await loadUserLists();
                }
            });

            emailInput.addEventListener('blur', async () => {
                const newEmail = emailInput.value.trim();
                if (newEmail === originalEmail) return;
                if (!newEmail.includes('@gmail.com')) {
                    showError('Please enter a valid Gmail address');
                    emailInput.value = originalEmail;
                    return;
                }
                const list = userLists[role] || [];
                const idx = list.findIndex(u => u.id === entry.id);
                if (idx === -1) return;
                list[idx] = { ...list[idx], email: newEmail };
                const ok = await saveToBackend();
                if (!ok) {
                    list[idx] = { ...list[idx], email: originalEmail };
                    emailInput.value = originalEmail;
                } else {
                    await loadUserLists();
                }
            });
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        if (!isOwn) {
            deleteBtn.disabled = true;
            deleteBtn.style.opacity = '0.5';
        } else {
            deleteBtn.addEventListener('click', () => {
                deleteUser(role, entry.email);
            });
        }

        li.appendChild(nameInput);
        li.appendChild(emailInput);
        li.appendChild(deleteBtn);

        listElement.appendChild(li);
    });
}

// Add user to a list
async function addUser(role) {
    const inputId = role === 'admins' ? 'admin-email' :
        role === 'pacers' ? 'pacer-email' : 'runner-email';
    const input = document.getElementById(inputId);
    const email = input.value.trim();
    const lowerEmail = email.toLowerCase();

    // Validate email
    if (!email) {
        showError('Please enter an email address');
        return;
    }

    if (!lowerEmail.endsWith('@gmail.com')) {
        showError('Please enter a valid Gmail address');
        return;
    }

    // Check if already exists in this role list by email
    if ((userLists[role] || []).some(u => (u.email || '').toLowerCase() === lowerEmail)) {
        showError('User already exists in this list');
        alert(`The address ${email} is already in the ${role} list and was not added again.`);
        return;
    }

    const displayName = email.split('@')[0] || email;
    const id = role + ':' + email;
    userLists[role].push({ id, email, displayName });

    // Save to backend (will sort before saving)
    const success = await saveToBackend();

    if (success) {
        input.value = '';
        // Reload from backend to ensure we have latest data
        await loadUserLists();
        showSuccess(`Added ${email} to ${role}`);
    } else {
        // Rollback if save failed
        userLists[role] = (userLists[role] || []).filter(e => (e.email || '').toLowerCase() !== lowerEmail);
    }
}

// Delete user from a list
async function deleteUser(role, email) {
    if (!confirm(`Remove ${email} from ${role}?`)) {
        return;
    }

    // Store original list for rollback
    const originalList = [...userLists[role]];

    // Remove from list by email
    userLists[role] = userLists[role].filter(e => (e.email || '') !== email);

    // Save to backend (will sort before saving)
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

// Save lists to backend (sorts alphabetically before saving)
async function saveToBackend() {
    try {
        const sortedLists = {
            admins: [...userLists.admins].slice().sort((a, b) => (a.email || '').toLowerCase().localeCompare((b.email || '').toLowerCase())),
            pacers: [...userLists.pacers].slice().sort((a, b) => (a.email || '').toLowerCase().localeCompare((b.email || '').toLowerCase())),
            runners: [...userLists.runners].slice().sort((a, b) => (a.email || '').toLowerCase().localeCompare((b.email || '').toLowerCase()))
        };

        const response = await fetch('/api/admin/update-lists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sortedLists)
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
