// Animate genre icons
document.querySelectorAll(".icon-container").forEach((element) => {
  element.addEventListener("mouseover", () => {
    element.classList.add("animate__animated", "animate__flip");
  });
  element.addEventListener("mouseout", () => {
    element.classList.remove("animate__animated", "animate__flip");
  });
});

// Event listener for the "More Info" buttons with class "more-info"
document.querySelectorAll(".more-info").forEach((button) => {
  button.addEventListener("click", () => {
    const product_id = button.getAttribute("data-product-id");

    // Redirect to productDetail.html with the product ID in the URL
    window.location.href = `productDetail.html?id=${product_id}`;
  });
});
