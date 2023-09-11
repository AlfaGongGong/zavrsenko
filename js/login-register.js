document.addEventListener('DOMContentLoaded', () => {
      const loginForm = document.getElementById('login-form');
      const registerForm = document.getElementById('register-form');

      loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            const data = { username, password };

            try {
                  const response = await fetch('/login', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                  });

                  const result = await response.json();

                  if (response.status === 200) {
                        alert(result.message);
                        // Redirect to the user dashboard or perform user-specific actions
                        // Example: window.location.href = '/dashboard';
                  } else {
                        alert(result.message);
                  }
            } catch (error) {
                  console.error(error);
                  alert('An error occurred during login.');
            }
      });

      registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            const data = { username, email, password };

            try {
                  const response = await fetch('/register', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                  });

                  const result = await response.json();

                  if (response.status === 201) {
                        alert(result.message);
                        // Redirect to the user dashboard or perform user-specific actions
                        // Example: window.location.href = '/dashboard';
                  } else {
                        alert(result.message);
                  }
            } catch (error) {
                  console.error(error);
                  alert('An error occurred during registration.');
            }
      });
});
