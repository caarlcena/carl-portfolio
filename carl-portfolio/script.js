// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
burger?.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
mobileMenu
  ?.querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => mobileMenu.classList.add("hidden")),
  );

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in");
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Active nav link
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  const middle = window.innerHeight / 2;

  // Walk sections top-to-bottom and keep the last one whose top has
  // scrolled past the midpoint line. This correctly handles short
  // sections (like Contact) whose rect might never simultaneously
  // straddle the midpoint on both top and bottom.
  let current = sections[0]?.id ?? null;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= middle) {
      current = section.id;
    }
  });

  // If we've scrolled all the way to the bottom of the page, always
  // land on the last section regardless of its rect math.
  const atBottom =
    Math.ceil(window.scrollY + window.innerHeight) >=
    document.documentElement.scrollHeight;

  if (atBottom) {
    current = sections[sections.length - 1].id;
  }

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);
