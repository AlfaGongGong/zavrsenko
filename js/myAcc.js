document.addEventListener("DOMContentLoaded", () => {
  const emailForm = document.getElementById("email-form");
  const passwordForm = document.getElementById("password-form");
  const addressForm = document.getElementById("address-form");

  const editEmailButton = document.getElementById("editEmailBtn");
  const cancelEmailBtn = document.getElementById("cancelEmailBtn");
  const editPassButton = document.getElementById("editPassBtn");
  const cancelPassBtn = document.getElementById("cancelPassBtn");
  const editAddressButton = document.getElementById("editAddressBtn");
  const cancelAddressBtn = document.getElementById("cancelAddressBtn");

  editEmailButton.addEventListener("click", () => {
    passwordForm.style.display = "none";
    addressForm.style.display = "none";
    emailForm.style.display = "flex";
  });

  cancelEmailBtn.addEventListener("click", () => {
    passwordForm.style.display = "none";
    addressForm.style.display = "none";
    emailForm.style.display = "none";
  });

  editPassButton.addEventListener("click", () => {
    emailForm.style.display = "none";
    addressForm.style.display = "none";
    passwordForm.style.display = "flex";
  });

  cancelPassBtn.addEventListener("click", () => {
    emailForm.style.display = "none";
    addressForm.style.display = "none";
    passwordForm.style.display = "none";
  });

  editAddressButton.addEventListener("click", () => {
    emailForm.style.display = "none";
    passwordForm.style.display = "none";
    addressForm.style.display = "flex";
  });

  cancelAddressBtn.addEventListener("click", () => {
    emailForm.style.display = "none";
    passwordForm.style.display = "none";
    addressForm.style.display = "none";
  });
});
