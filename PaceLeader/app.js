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
function handleCredentialResponse(response) {
    try {
        // Decode the JWT token to get user info
        const userInfo = parseJwt(response.credential);
        
        console.log('User signed in:', userInfo);
        
        // Store the credential
        localStorage.setItem('google_credential', response.credential);
        localStorage.setItem('user_info', JSON.stringify(userInfo));
        
        // Display user info
        displayUserInfo(userInfo);
        
    } catch (error) {
        console.error('Error handling credential:', error);
        showError('Failed to sign in. Please try again.');
    }
}

// Parse JWT token
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing JWT:', error);
        throw error;
    }
}

// Display user information
function displayUserInfo(userInfo) {
    const userInfoDiv = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const googleButtonContainer = document.getElementById('googleButtonContainer');
    const errorMessage = document.getElementById('errorMessage');
    
    userName.textContent = userInfo.name || 'N/A';
    userEmail.textContent = userInfo.email || 'N/A';
    
    userInfoDiv.classList.add('visible');
    if (googleButtonContainer) {
        googleButtonContainer.style.display = 'none';
    }
    errorMessage.classList.remove('visible');
}

// Check for existing session
function checkExistingSession() {
    const storedUserInfo = localStorage.getItem('user_info');
    
    if (storedUserInfo) {
        try {
            const userInfo = JSON.parse(storedUserInfo);
            displayUserInfo(userInfo);
        } catch (error) {
            console.error('Error loading stored session:', error);
            localStorage.removeItem('user_info');
            localStorage.removeItem('google_credential');
        }
    }
}

// Handle sign out
function handleSignOut() {
    // Clear stored credentials
    localStorage.removeItem('google_credential');
    localStorage.removeItem('user_info');
    
    // Reset UI
    const userInfoDiv = document.getElementById('userInfo');
    const googleButtonContainer = document.getElementById('googleButtonContainer');
    
    userInfoDiv.classList.remove('visible');
    if (googleButtonContainer) {
        googleButtonContainer.style.display = 'block';
    }
    
    // Revoke Google session
    google.accounts.id.disableAutoSelect();
    
    console.log('User signed out');
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
