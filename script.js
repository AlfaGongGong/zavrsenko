const app = require('./api');
require('./html/ejs templates');
app.listen(3000, () => {
	console.log("Server running on port 3000");
});

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
