// FILTERING
const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
            item.style.display =
                filter === "all" || item.dataset.category === filter
                    ? "block"
                    : "none";
        });
    });
});

// SEARCH
document.getElementById("gallerySearch").addEventListener("keyup", e => {
    const value = e.target.value.toLowerCase();

    galleryItems.forEach(item => {
        const name = item.dataset.name.toLowerCase();
        item.style.display = name.includes(value) ? "block" : "none";
    });
});

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.getElementById("closeLightbox");

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = item.querySelector("img").src;
        lightboxCaption.textContent = item.dataset.name;
    });
});

closeLightbox.onclick = () => lightbox.style.display = "none";
window.onclick = e => { if (e.target === lightbox) lightbox.style.display = "none"; };

/* ---------------------------
      PAGINATION SYSTEM
---------------------------- */

const itemsPerPage = 6; // You can change this
const pageButtons = document.querySelectorAll(".page-btn");

function showPage(pageNumber) {
    const items = Array.from(document.querySelectorAll(".card, .gallery-item"))
        .filter(item => item.style.display !== "none"); // Only visible items

    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
        item.style.display = index >= start && index < end ? "block" : "none";
    });

    // Fade animation
    items.forEach(item => item.classList.add("fade"));
    setTimeout(() => items.forEach(item => item.classList.remove("fade")), 400);

    // Update active button
    document.querySelector(".page-btn.active")?.classList.remove("active");
    pageButtons[pageNumber - 1].classList.add("active");
}

// Initialize page 1
showPage(1);

// Add click events to pagination buttons
pageButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        showPage(index + 1);
    });
});
