// S1: mobile navigation only. Does not replace cart, admin or PC Builder scripts.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("[data-retail-menu-toggle]");
  const menu = document.getElementById("retail-navigation");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a") && window.matchMedia("(max-width: 680px)").matches) {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});
