// FILTERING
const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        cards.forEach(card => {
            card.style.display =
                filter === "all" || card.dataset.category === filter
                    ? "block"
                    : "none";
        });
    });
});

// SEARCH
document.getElementById("searchInput").addEventListener("keyup", e => {
    const value = e.target.value.toLowerCase();

    cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        card.style.display = name.includes(value) ? "block" : "none";
    });
});

// MODAL POPUP
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

cards.forEach(card => {
    card.addEventListener("click", () => {
        modal.style.display = "flex";
        modalTitle.textContent = card.querySelector("h3").textContent;
        modalText.textContent = card.querySelector("p").textContent;
    });
});

closeModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

// MAP CLICKS
document.querySelectorAll("area").forEach(area => {
    area.addEventListener("click", e => {
        e.preventDefault();
        alert("You clicked: " + area.dataset.name);
    });
});

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

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        cards.forEach(card => {
            card.style.display =
                filter === "all" || card.dataset.category === filter
                    ? "block"
                    : "none";
        });

        showPage(1); // Reset pagination
    });
});

