document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); //

    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById(
      "register-confirm-password"
    ).value;

    // Check if username, email, and password are provided
    if (!username || !email || !password || !confirmPassword) {
      alert("All fields are mandatory");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Send a POST request to the server for registration
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);

      // Hide the registration form and display only the login form
      const logInRegister = document.getElementById("logInRegister");
      const registerForm = document.getElementById("register-form");
      const loginForm = document.getElementById("login-form");

      logInRegister.removeChild(registerForm);
    } else {
      alert(data.message);
    }
  });
});
