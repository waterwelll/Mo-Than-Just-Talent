// Place this at the end of your artist.html or in a separate JS file
const filterState = {
	ethnicity: "",
	gender: "",
	language: "",
};

document.querySelectorAll(".filter-buttons").forEach((group) => {
	group.addEventListener("click", function (e) {
		if (e.target.classList.contains("filter-btn")) {
			const type = group.getAttribute("data-filter-type");
			// Remove active from all buttons in this group
			group
				.querySelectorAll(".filter-btn")
				.forEach((btn) => btn.classList.remove("active"));
			// Set active on clicked button
			e.target.classList.add("active");
			// Update filter state
			filterState[type] = e.target.getAttribute("data-value");
			filterArtists();
		}
	});
});

// Set all "All" buttons as active on page load
document.querySelectorAll(".filter-buttons").forEach((group) => {
	const allBtn = group.querySelector('.filter-btn[data-value=""]');
	if (allBtn) allBtn.classList.add("active");
});

function filterArtists() {
	document.querySelectorAll(".artist-tile").forEach((tile) => {
		const matchEthnicity =
			!filterState.ethnicity ||
			tile.dataset.ethnicity === filterState.ethnicity;
		const matchGender =
			!filterState.gender || tile.dataset.gender === filterState.gender;
		const matchLanguage =
			!filterState.language ||
			(tile.dataset.language &&
				tile.dataset.language
					.split(",")
					.map((l) => l.trim().toLowerCase())
					.includes(filterState.language));

		if (matchEthnicity && matchGender && matchLanguage) {
			tile.parentElement.style.display = ""; // Show the artist-link (parent of artist-tile)
		} else {
			tile.parentElement.style.display = "none"; // Hide the artist-link
		}
	});
}
