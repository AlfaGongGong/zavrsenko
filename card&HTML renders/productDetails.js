// Function to parse URL parameters
function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
      const results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Function to fetch product details by ID from the URL
function fetchProductDetails() {
      // Get the product ID value from the URL
      const product_id = getParameterByName('id');

      fetch(`http://127.0.0.1:3000/details/${product_id}`)
            .then((response) => response.json())
            .then((product) => {
                  // Update the HTML elements with product details
                  document.getElementById('productImage').src = product.game_image;
                  document.getElementById('productName').textContent = product.game_name;
                  document.getElementById('productDescription').textContent = product.game_description;
                  document.getElementById('productPrice').textContent = `$${product.game_price}`;
            })
            .catch((error) => {
                  console.error('An error occurred:', error);
            });
}

fetchProductDetails();
