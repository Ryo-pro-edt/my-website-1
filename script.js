const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const backToTop = document.querySelector("[data-back-to-top]");
const savedTheme = localStorage.getItem("profile-theme");

if (savedTheme) {
  root.dataset.theme = savedTheme;
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

  if (nextTheme === "light") {
    delete root.dataset.theme;
    localStorage.removeItem("profile-theme");
    return;
  }

  root.dataset.theme = nextTheme;
  localStorage.setItem("profile-theme", nextTheme);
});

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("is-visible", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const revealTargets = document.querySelectorAll(".section, .profile-visual");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealTargets.forEach(target => {
  target.classList.add("reveal");
  observer.observe(target);
});
