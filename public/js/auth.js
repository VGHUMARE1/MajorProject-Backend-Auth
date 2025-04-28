const showMessage = (message, isError = false) => {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = isError ? 'error' : 'success';
    setTimeout(() => messageDiv.textContent = '', 3000);
};

// Registration Handler
if(document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('phoneNumber', document.getElementById('phoneNumber').value);
        formData.append('password', document.getElementById('password').value);
        formData.append('photo', document.getElementById('photo').files[0]);
    //    console.log(document.getElementById('name').value)
    //    console.log(document.getElementById('photo').files[0])
       console.log(formData.get('name'))
       console.log(formData.get('photo'))
        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            if(response.ok) {
                showMessage('Registration successful! Redirecting to login...');
                setTimeout(() => window.location.href = '/login.html', 1500);
            } else {
                showMessage(result.message || 'Registration failed', true);
            }
        } catch (error) {
            showMessage('Network error: ' + error.message, true);
            console.log(error)
        }
    });
}

// Login Handler
if(document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const credentials = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
                credentials: 'include'
            });

            const result = await response.json();
            if(response.ok) {
                showMessage('Login successful! Redirecting...');
                setTimeout(() => window.location.href = '/profile', 1500);
            } else {
                showMessage(result.message || 'Login failed', true);
            }
        } catch (error) {
            showMessage('Network error: ' + error.message, true);
        }
    });
}

// Logout Handler (add to other pages as needed)
if(document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', async () => {
        try {
            const response = await fetch('/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            
            if(response.ok) {
                window.location.href = '/login.html';
            }
        } catch (error) {
            showMessage('Logout failed: ' + error.message, true);
        }
    });
}