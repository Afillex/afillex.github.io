// ===== Current year in footer =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// ===== Nav shadow on scroll =====
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ===== Project filtering =====
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll("#projects-grid .card");
filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const f = btn.dataset.filter;
    cards.forEach((card) => {
      const cats = (card.dataset.cat || "").split(" ");
      const show = f === "all" || cats.includes(f);
      card.classList.toggle("is-hidden", !show);
    });
  })
);

// ===== Scroll reveal =====
if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  const revealEls = document.querySelectorAll(".section, .card");
  revealEls.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  revealEls.forEach((el) => io.observe(el));
}
