const swiper = new Swiper(".swiper-container", {
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});

// Select elements
const thumbnails = document.querySelectorAll(".thumbnails img");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const closeBtn = document.getElementById("close-btn");

// Add click event to each thumbnail
thumbnails.forEach((thumbnail) => {
	thumbnail.addEventListener("click", () => {
		const src = thumbnail.getAttribute("data-src"); // Get the larger image source
		popupImg.src = src; // Set the pop-up image source
		popup.style.display = "flex"; // Show the pop-up
	});
});

// Close the pop-up when the close button is clicked
closeBtn.addEventListener("click", () => {
	popup.style.display = "none";
});

// Close the pop-up when clicking outside the image
popup.addEventListener("click", (e) => {
	if (e.target === popup) {
		popup.style.display = "none";
	}
});
