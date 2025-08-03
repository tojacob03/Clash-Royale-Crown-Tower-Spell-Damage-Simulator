// js/theme-toggle.js

const btn   = document.getElementById("theme-toggle");
const html  = document.documentElement;

btn.addEventListener("click", () => {
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
});

// Initial State: nur das Light-Icon zeigen
document.addEventListener("DOMContentLoaded", () => {
  html.setAttribute("data-theme", "light");
});
