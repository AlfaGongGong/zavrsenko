
  document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");

    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("register-username").value;
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;
      const confirmPassword = document.getElementById("register-confirm-password").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const response = await fetch("/user/register", {
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
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });


