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
