

/* animate genre icons */
document.querySelectorAll(".icon-container").forEach((element) => {
	element.addEventListener("mouseover", () => {
		element.classList.add("animate__animated", "animate__flip");
	});
	element.addEventListener("mouseout", () => {
		element.classList.remove("animate__animated", "animate__flip");
	});
});

//Limit card numbers to 6


