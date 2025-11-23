// Google OAuth Configuration
// IMPORTANT: Replace this with your actual Google Client ID
// Get it from: https://console.cloud.google.com/apis/credentials
const GOOGLE_CLIENT_ID = '74586552920-cajcodmord3rikun6n1a30gi2uoj4p5t.apps.googleusercontent.com';

// Initialize Google Sign-In
function initializeGoogleSignIn() {
    if (typeof google === 'undefined') {
        console.error('Google Sign-In library not loaded');
        return;
    }

    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
    });

    // Render Google's sign-in button directly (replaces custom button)
    const signInButton = document.getElementById('googleSignIn');

    // Hide custom button and render Google's button
    signInButton.style.display = 'none';

    // Create container for Google button
    const googleButtonContainer = document.createElement('div');
    googleButtonContainer.id = 'googleButtonContainer';
    signInButton.parentNode.insertBefore(googleButtonContainer, signInButton);

    google.accounts.id.renderButton(
        googleButtonContainer,
        {
            theme: 'outline',
            size: 'large',
            width: 350,
            text: 'signin_with',
            shape: 'rectangular'
        }
    );

    // Check if user is already signed in
    checkExistingSession();
}

// Handle the credential response from Google
async function handleCredentialResponse(response) {
    try {
        // Send credential to backend for verification
        const apiResponse = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ credential: response.credential })
        });

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.error('API error:', apiResponse.status, errorText);
            showError(`Sign-in failed: ${apiResponse.status}. Check console for details.`);
            return;
        }

        const result = await apiResponse.json();
        console.log('Auth result:', result);

        if (result.error) {
            console.error('Auth error:', result.error);
            showError('Sign-in error: ' + result.error);
            return;
        }

        if (!result.authorized) {
            // User not in any list
            showNotAdmitted(result.message);
            return;
        }

        // Store user info
        const userInfo = {
            name: result.name,
            email: result.email,
            roles: result.roles
        };

        if (result.roles.length === 1) {
            // Single role - auto login
            completeLogin(userInfo, result.roles[0]);
        } else {
            // Multiple roles - show selection
            showRoleSelection(userInfo, result.roles);
        }

    } catch (error) {
        console.error('Error handling credential:', error);
        showError('Failed to sign in. Please try again. Check console for details.');
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.add('visible');

    setTimeout(() => {
        errorDiv.classList.remove('visible');
    }, 5000);
}

// Show not admitted message
function showNotAdmitted(message) {
    const notAdmittedDiv = document.getElementById('notAdmittedMessage');
    const googleButtonContainer = document.getElementById('googleButtonContainer');

    notAdmittedDiv.textContent = message;
    notAdmittedDiv.classList.add('visible');

    if (googleButtonContainer) {
        googleButtonContainer.style.display = 'none';
    }
}

// Show role selection UI
function showRoleSelection(userInfo, roles) {
    const roleSelection = document.getElementById('roleSelection');
    const roleButtons = document.getElementById('roleButtons');
    const googleButtonContainer = document.getElementById('googleButtonContainer');

    // Clear previous buttons
    roleButtons.innerHTML = '';

    // Create button for each role
    roles.forEach(role => {
        const button = document.createElement('button');
        button.className = 'role-btn';
        button.textContent = role.charAt(0).toUpperCase() + role.slice(1);
        button.onclick = () => selectRole(userInfo, role);
        roleButtons.appendChild(button);
    });

    roleSelection.classList.add('visible');
    if (googleButtonContainer) {
        googleButtonContainer.style.display = 'none';
    }
}

// Handle role selection
function selectRole(userInfo, role) {
    completeLogin(userInfo, role);
}

// Complete login with selected role
function completeLogin(userInfo, role) {
    // Store session
    localStorage.setItem('user_info', JSON.stringify({
        ...userInfo,
        selectedRole: role
    }));
    localStorage.setItem('selectedRole', role);

    // Redirect admins to admin dashboard
    if (role === 'admin') {
        window.location.href = 'admin.html';
        return;
    }

    // Display user info for non-admins
    displayUserInfo(userInfo, role);
}

// Display user information
function displayUserInfo(userInfo, role) {
    const userInfoDiv = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userRole = document.getElementById('userRole');
    const googleButtonContainer = document.getElementById('googleButtonContainer');
    const roleSelection = document.getElementById('roleSelection');
    const errorMessage = document.getElementById('errorMessage');
    const notAdmittedMessage = document.getElementById('notAdmittedMessage');

    userName.textContent = userInfo.name || 'N/A';
    userEmail.textContent = userInfo.email || 'N/A';
    userRole.textContent = role.charAt(0).toUpperCase() + role.slice(1);

    userInfoDiv.classList.add('visible');
    roleSelection.classList.remove('visible');
    if (googleButtonContainer) {
        googleButtonContainer.style.display = 'none';
    }
    errorMessage.classList.remove('visible');
    notAdmittedMessage.classList.remove('visible');
}

// Check for existing session
function checkExistingSession() {
    const storedUserInfo = localStorage.getItem('user_info');

    if (storedUserInfo) {
        try {
            const userInfo = JSON.parse(storedUserInfo);
            if (userInfo.selectedRole) {
                displayUserInfo(userInfo, userInfo.selectedRole);
            }
        } catch (error) {
            console.error('Error loading stored session:', error);
            localStorage.removeItem('user_info');
        }
    }
}

// Handle sign out
function handleSignOut() {
    // Clear stored credentials
    localStorage.removeItem('user_info');

    // Reset UI
    const userInfoDiv = document.getElementById('userInfo');
    const roleSelection = document.getElementById('roleSelection');
    const notAdmittedMessage = document.getElementById('notAdmittedMessage');
    const googleButtonContainer = document.getElementById('googleButtonContainer');

    userInfoDiv.classList.remove('visible');
    roleSelection.classList.remove('visible');
    notAdmittedMessage.classList.remove('visible');

    if (googleButtonContainer) {
        googleButtonContainer.style.display = 'block';
    }

    // Revoke Google session
    google.accounts.id.disableAutoSelect();

    console.log('User signed out');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set up logout button
    document.getElementById('logoutBtn').addEventListener('click', handleSignOut);

    // Wait for Google library to load
    const checkGoogleLoaded = setInterval(() => {
        if (typeof google !== 'undefined') {
            clearInterval(checkGoogleLoaded);
            initializeGoogleSignIn();
        }
    }, 100);
});
