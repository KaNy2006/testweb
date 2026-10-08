document.querySelectorAll(".flash").forEach((flash) => {
  window.setTimeout(() => {
    flash.style.opacity = "0";
    flash.style.transition = "opacity 250ms ease";
  }, 3500);
});

document.querySelectorAll("[data-confirm]").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!window.confirm(button.dataset.confirm)) {
      event.preventDefault();
    }
  });
});


// Loc danh muc ngay tren trang chu, khong chuyen trang va khong tai lai.
const homeCategoryButtons = document.querySelectorAll("[data-home-category]");
const homeProductCards = document.querySelectorAll("#home-product-grid [data-product-category]");
const homeProductTitle = document.getElementById("home-product-title");
const homeProductSubtitle = document.getElementById("home-product-subtitle");
const homeProductsEmpty = document.getElementById("home-products-empty");

if (homeCategoryButtons.length && homeProductTitle && homeProductsEmpty) {
  homeCategoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.homeCategory;
      const showFeatured = category === "all";
      let visibleCount = 0;

      homeCategoryButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      homeProductCards.forEach((card) => {
        const visible = showFeatured
          ? card.dataset.featured === "true"
          : card.dataset.productCategory === category;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      homeProductTitle.textContent = showFeatured
        ? "🔥 Sản phẩm nổi bật"
        : "Sản phẩm " + category;
      homeProductSubtitle.textContent = showFeatured
        ? "Những linh kiện được ưa chuộng nhất hiện nay"
        : "Đang hiển thị " + visibleCount + " sản phẩm thuộc danh mục " + category;
      homeProductsEmpty.hidden = visibleCount !== 0;
    });
  });
}
