(function () {
  const root = document.querySelector(".app");
  if (!root) return;

  const key = "qaid_theme";
  const btn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(key, theme);
    if (icon) icon.textContent = theme === "dark" ? "🌙" : "☀️";
  }

  const saved = localStorage.getItem(key);
  setTheme(saved || "dark");

  if (btn) {
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }
})();
