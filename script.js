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
  function displayAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
  }

  // Function to clear the container
  function clearContainer() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
  }

  // User registration form logic
  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password !== confirmPassword) {
      displayAlert('Passwords do not match', 'danger');
      return;
    }

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

        // Hide the register form
        document.getElementById('register-form').style.display = 'none';

      } else {
        const errorText = await response.text();
        displayAlert(`Registration failed: ${errorText}`, 'danger');
        console.error('Registration failed:', errorText);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  });

  // Function to handle user login
  function loginUser() {
    preventDefault();
    const username = $('#login-username').val();
    const password = $('#login-password').val();

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/login',
      data: JSON.stringify({ username, password }),
      contentType: 'application/json',
      success: handleLoginSuccess,
      error: handleLoginError,
    });
  }

  // Function to handle successful login
  function handleLoginSuccess(response) {
    const token = response.token;
    // Store the token securely in local storage
    localStorage.setItem('token', token);
    $('#message').text(response.message);

    updateUIOnLogin();
  }

  // Function to handle login error
  function handleLoginError() {
    $('#message').text('Login failed');
  }

  // Function to check if the user is already logged in
  function checkLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      updateUIOnLogin();
    }
  }

  // Function to update the UI after login
  function updateUIOnLogin() {
    $('#logInRegister').hide();
    $('#login-form').hide();
    $('#register-form').hide();
    $('#myAccount').show();
    $('#logOut').show();
  }

  // Function to access protected route
  function accessProtectedRoute() {
    const token = localStorage.getItem('token');
    if (!token) {
      $('#message').text('Not authenticated. Please log in.');
      return;
    }

    // Send a GET request to the protected route
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/protected',
      headers: {
        Authorization: token,
      },
      success: handleProtectedAccessSuccess,
      error: handleProtectedAccessError,
    });
  }

  // Function to handle successful access to protected route
  function handleProtectedAccessSuccess(response) {
    $('#message').text(response.message);
  }

  // Function to handle access to protected route error
  function handleProtectedAccessError() {
    $('#message').text('Access denied');
  }

  // Function to log out
  function logoutUser() {
    localStorage.removeItem('token');

    $('#logInRegister').show();
    $('#login-form').show();
    $('#register-form').show();
    $('#myAccount').hide();
    $('#logOutButton').hide();
    $('#message').text('Logged out');
  }

  $(document).ready(function () {
    // Attach event handlers to buttons
    $('#login').click(loginUser);
    $('#accessProtected').click(accessProtectedRoute);
    $('#logOutButton').click(logoutUser);

    // Check if the user is already logged in
    checkLoggedIn();
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
        const usernameElement = document.getElementById('username');
        const myAccountElement = document.getElementById('myAccount');
        const logOutButtonElement = document.getElementById('logOutButton');

        if (usernameElement && myAccountElement && logOutButtonElement) {
          usernameElement.textContent = 'Welcome back, ' + data.username;
          myAccountElement.style.display = 'block';
          logOutButtonElement.style.display = 'block';
        }
      } else {
        const myAccountElement = document.getElementById('myAccount');
        const logOutButtonElement = document.getElementById('logOutButton');

        if (myAccountElement && logOutButtonElement) {
          myAccountElement.style.display = 'none';
          logOutButtonElement.style.display = 'none';
        }
      }
    } catch (error) {
      console.error('Error checking user login status:', error);
    }
  }

  checkUserLoginStatus();

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
        window.location.href = 'index.html';
        console.log('Logout successful');
        document.getElementById('myAccount').style.display = 'none';
        document.getElementById('logOutButton').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'block';

      } else {
        console.error('Logout failed:', await response.text());
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  });
});
// Event listener for the "More Info" buttons with class "more-info"
document.querySelectorAll('.more-info').forEach((button) => {
  button.addEventListener('click', () => {
    const product_id = button.getAttribute('data-product-id');

    // Redirect to productDetail.html with the product ID in the URL
    window.location.href = `productDetail.html?id=${product_id}`;
  });
});
