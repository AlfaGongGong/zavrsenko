// Function to handle user login
function handleLogin() {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const myAccount = document.getElementById("myAccount");
  const logInRegister = document.getElementById("logInRegister");
  const logOut = document.getElementById("logOut");
  const moreInfoBtn = document.querySelectorAll(".more-info");
  const wishlistBtn = document.querySelectorAll(".wishlist-btn");
  const cartBtn = document.querySelectorAll(".cart-btn");

  if (isLoggedIn) {
    logInRegister.style.display = "none";
    myAccount.style.display = "block";
    logOut.style.display = "block";
  } else {
    logInRegister.style.display = "block";
    myAccount.style.display = "none";
    logOut.style.display = "none";
    moreInfoBtn.forEach((button) => {
      button.classList.remove("more-info", "btn", "btn-primary");
      button.classList.add("btn", "btn-secondary");
      button.disabled = true;
      button.title = "You must be logged in to view more details";
      button.addEventListener("mouseover", (event) => {
        button.classList.add("animate__animated", "animate__shakeX");
      });

      button.addEventListener("mouseout", (event) => {
        button.classList.remove("animate__animated", "animate__shakeX");
      });

      button.addEventListener("click", (event) => {
        event.preventDefault();
        document.location.href = "../html/plsLogin.html";
      });
    });

    wishlistBtn.forEach((button) => {
      button.classList.remove("wishlist-btn", "btn", "btn-primary");
      button.classList.add("btn", "btn-secondary");
      button.disabled = true;
      button.title = "You must be logged in to add to your wishlist";
      button.addEventListener("click", (event) => {
        event.preventDefault();
        button.classList.add("animate__animated", "animate__shakeX");
        document.location.href = "../html/plsLogin.html";
      });
    });
    cartBtn.forEach((button) => {
      button.classList.remove("cart-btn", "btn", "btn-primary");
      button.classList.add("btn", "btn-secondary");
      button.disabled = true;
      button.title = "You must be logged in to add to your shopping cart";
      button.addEventListener("moseover", (event) => {
        button.classList.add("animate__animated", "animate__shakeX");
      });

      button.addEventListener("mouseout", (event) => {
        button.classList.remove("animate__animated", "animate__shakeX");
      });

      button.addEventListener("click", (event) => {
        event.preventDefault();
        document.location.href = "../html/plsLogin.html";
      });
    });
  }
}

// Function to handle user session
function handleSession() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const sessionContainer = document.getElementById("sessionContainer");
  const sessionTime = document.getElementById("sessionTime");
  let timeLeft = 60 * 60;

  const timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      window.location.href = "../index.html";
    } else {
      timeLeft--;
      sessionContainer.innerHTML = `
                <p>Logged in as: ${username}</p>
                <p>Session expires in: ${timeLeft} seconds</p>
            `;
    }
    timeLeft--;
  }, 1000);
}

// Event listener for user logout
document.getElementById("logOut").addEventListener("click", function () {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  window.location.href = "../index.html";
});

// Check if user is logged in when page loads
window.addEventListener("load", function () {
  handleLogin();
  handleSession();
});
