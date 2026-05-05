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
