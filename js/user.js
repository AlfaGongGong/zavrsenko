//registration logic

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById(
      "register-confirm-password"
    ).value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.status === 200) {
        alert("Registration successful");
        registerForm.reset();
      } else {
        const data = await response.json();
        console.log("here");
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

//log in logic

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        alert("Login successful");
        window.location.href = "/index.html";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

//log out logic

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logOutButton");

  logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

//change password logic

document.addEventListener("DOMContentLoaded", () => {
  const changePasswordForm = document.getElementById("change-password-form");

  changePasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const oldPassword = document.getElementById("old-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById(
      "confirm-new-password"
    ).value;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/user/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      if (response.status === 200) {
        alert("Password changed successfully");
        changePasswordForm.reset();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

//change email logic

document.addEventListener("DOMContentLoaded", () => {
  const changeEmailForm = document.getElementById("change-email-form");

  changeEmailForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newEmail = document.getElementById("new-email").value;

    try {
      const response = await fetch("http://localhost:8080/user/change-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newEmail }),
      });

      if (response.status === 200) {
        alert("Email changed successfully");
        changeEmailForm.reset();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

//change address logic

document.addEventListener("DOMContentLoaded", () => {
  const changeAddressForm = document.getElementById("change-address-form");

  changeAddressForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newAddress = document.getElementById("new-address").value;

    try {
      const response = await fetch(
        "http://localhost:8080/user/change-address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newAddress }),
        }
      );

      if (response.status === 200) {
        alert("Address changed successfully");
        changeAddressForm.reset();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

//change first_name logic

document.addEventListener("DOMContentLoaded", () => {
  const changeFirstNameForm = document.getElementById("change-first-name-form");

  changeFirstNameForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newFirstName = document.getElementById("new-first-name").value;

    try {
      const response = await fetch(
        "http://localhost:8080/user/change-first-name",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newFirstName }),
        }
      );

      if (response.status === 200) {
        alert("First name changed successfully");
        changeFirstNameForm.reset();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

//change last_name logic

document.addEventListener("DOMContentLoaded", () => {
  const changeLastNameForm = document.getElementById("change-last-name-form");

  changeLastNameForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newLastName = document.getElementById("new-last-name").value;

    try {
      const response = await fetch(
        "http://localhost:8080/user/change-last-name",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newLastName }),
        }
      );

      if (response.status === 200) {
        alert("Last name changed successfully");
        changeLastNameForm.reset();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
