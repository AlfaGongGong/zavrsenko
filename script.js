// Animate genre icons
document.querySelectorAll(".icon-container").forEach((element) => {
  element.addEventListener("mouseover", () => {
    element.classList.add("animate__animated", "animate__flip");
  });
  element.addEventListener("mouseout", () => {
    element.classList.remove("animate__animated", "animate__flip");
  });
});

// Check if user is logged in

const isLoggedIn = localStorage.getItem("token") ? true : false;

const logInRegister = document.getElementById("logInRegister");
const myAccount = document.getElementById("myAccount");
const logOut = document.getElementById("logOut");

if (isLoggedIn) {
  logInRegister.style.display = "none";
  myAccount.style.display = "block";
  logOut.style.display = "block";
} else {
  logInRegister.style.display = "block";
  myAccount.style.display = "none";
  logOut.style.display = "none";
}

// Log out logic
document.getElementById("logOut").addEventListener("click", () => {
  alert("Goodbye and come back soon!");

  localStorage.clear();
  window.location.href = "/index.html";
});

// Event listener for the "More Info" buttons with class "more-info"
document.querySelectorAll(".more-info").forEach((button) => {
  button.addEventListener("click", () => {
    const product_id = button.getAttribute("data-product-id");

    // Redirect to productDetail.html with the product ID in the URL
    window.location.href = `productDetail.html?id=${product_id}`;
  });
});
