

// Animate genre icons
document.querySelectorAll('.icon-container').forEach((element) => {
  element.addEventListener('mouseover', () => {
    element.classList.add('animate__animated', 'animate__flip');
  });
  element.addEventListener('mouseout', () => {
    element.classList.remove('animate__animated', 'animate__flip');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Function to display an alert message in the container
  function displayAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    document.getElementById('container').innerHTML = '';
    document.getElementById('container').appendChild(alertDiv);
  }

  // Function to clear the container
  function clearContainer() {
    document.getElementById('container').innerHTML = '';
  }

  // User registration form logic
  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const registerContainer = document.getElementById('register');
    if (password !== confirmPassword) {
      displayAlert('Passwords do not match', 'danger');
      return;
    } else {
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
          displayAlert('Registration successful', 'success');
          // Reload the page after a successful registration
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          // Hide the register form
          registerContainer.style.display = 'none';
        } else {
          const errorText = await response.text();
          displayAlert(`Registration failed: ${errorText}`, 'danger');
          console.error('Registration failed:', errorText);
          setTimeout(() => {
            window.location.reload();
          }, 2000);

        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
  });

  // User login form logic
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username === '' || password === '') {
      displayAlert('All fields are required', 'danger');
    } else {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          // Handle successful login (e.g., redirect)
          displayAlert('Login successful', 'success');
          // Optionally, redirect or perform other actions
        } else {
          const errorText = await response.text();
          displayAlert(`Login failed: ${errorText}`, 'danger');
          console.error('Login failed:', errorText);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  });

  // Check user login status and update the UI accordingly
  async function checkUserLoginStatus() {
    try {
      const response = await fetch('http://localhost:3000/checkloginstatus', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });

      if (response.ok) {
        const data = await response.json();
        const username = document.getElementById('dropdownMenuButton');
        const logoutButton = document.getElementById('logout-button');
        const myAccount = document.getElementById('myAccount');

        // Display username and show the logout button
        username.textContent = username.textContent + data.username;

        logoutButton.style.display = 'block';
        myAccount.style.display = 'block';
      } else {
        // User is not logged in
        // Hide the logout button
        const logoutButton = document.getElementById('logOutButton');
        const myAccount = document.getElementById('myAccount');

        logoutButton.style.display = 'none';
        myAccount.style.display = 'none';
      }
    } catch (error) {
      console.error('Error checking user login status:', error);
    }
  }

  // Call the function to check user login status when the page loads
  window.addEventListener('load', checkUserLoginStatus);

  // Add an event listener to the logout button
  document.getElementById('logOutButton').addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirect to the home page after logout
        window.location.href = 'index.html';
        console.log('Logout successful');
      } else {
        console.error('Logout failed:', await response.text());
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  });
});
