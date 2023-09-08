

const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
nextButton.addEventListener("click", () => {
	const slideWidth = slide.clientWidth;
	slidesContainer.scrollLeft += slideWidth;
});
prevButton.addEventListener("click", () => {
	const slideWidth = slide.clientWidth;
	slidesContainer.scrollLeft -= slideWidth;
});

/* animate genre icons */
document.querySelectorAll(".icon").forEach((element) => {
	element.addEventListener("mouseover", () => {
		element.classList.add("animate__animated", "animate__flip");
	});
	element.addEventListener("mouseout", () => {
		element.classList.remove("animate__animated", "animate__flip");
	});
});

// Make a GET request to fetch the JSON data from the server
fetch('http://localhost:3000/deals')
	.then(response => response.json())
	.then(dealsCards => {
		const dealsCardsContainer = document.getElementById('dealsCardsContainer');

		// Loop through the product cards and append them to the container
		dealsCards.forEach(card => {
			dealsCardsContainer.appendChild(card);
		});
	})
	.catch(error => {
		console.error('Error fetching deals cards:', error);
	});