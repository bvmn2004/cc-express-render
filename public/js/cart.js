document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("open-cart");
    const closeBtn = document.getElementById("close-cart");
    const cartPanel = document.getElementById("cart-panel");
    const cartOverlay = document.getElementById("cart-overlay");

    openBtn?.addEventListener("click", () => {
        cartPanel.classList.remove("hidden");
        cartOverlay.classList.remove("hidden");
    });

    closeBtn?.addEventListener("click", () => {
        cartPanel.classList.add("hidden");
        cartOverlay.classList.add("hidden");
    });

    cartOverlay?.addEventListener("click", () => {
        cartPanel.classList.add("hidden");
        cartOverlay.classList.add("hidden");
    });
});
