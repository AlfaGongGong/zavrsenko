/* animate genre icons */
document.querySelectorAll(".icon-container").forEach((element) => {
	element.addEventListener("mouseover", () => {
		element.classList.add("animate__animated", "animate__flip");
	});
	element.addEventListener("mouseout", () => {
		element.classList.remove("animate__animated", "animate__flip");
	});
});

document.getElementById('register-form').addEventListener('submit', async (e) => {
	e.preventDefault(); // Prevent the default form submission
	const username = document.getElementById('register-username').value;
	const email = document.getElementById('register-email').value;
	const password = document.getElementById('register-password').value;
	const confirmPassword = document.getElementById('register-confirm-password').value;
	const container = document.getElementById('container');
	if (password !== confirmPassword) {
		container.innerHTML = `
	    <div class="alert alert-danger" role="alert">
		Passwords do not match
	    </div>
	    <a href='#' class="btn btn-primary">Click here to try again</a>
	  `;
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
				container.innerHTML = `
		  <div class="alert alert-success" role="alert">
		    Registration successful
		  </div>
		  <a href="index.html" class="btn btn-primary">Click here to go to the home page</a>
		`;
				console.log('Registration successful');
			} else {
				container.innerHTML = `
		  <div class="alert alert-danger" role="alert">
		    Registration failed
		  </div>
		  <a href='#' class="btn btn-primary">Click here to try again</a>
		`;
				console.error('Registration failed:', await response.text());
			}
		} catch (error) {
			console.error('Error during registration:', error);
		}
	}
});
