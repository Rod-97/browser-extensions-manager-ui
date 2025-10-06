const body = document.body;

function setBgColor() {
  const iconSun = document.getElementById("icon-sun");
  const iconMoon = document.getElementById("icon-moon");
  const logoText = document.getElementById("logo-text");

  if (body.classList.contains("dark-mode")) {
    iconSun.classList.add("active");
    iconMoon.classList.remove("active");
    logoText.setAttribute("fill", "#FFFFFF");
  } else if (body.classList.contains("light-mode")) {
    iconMoon.classList.add("active");
    iconSun.classList.remove("active");
    logoText.setAttribute("fill", "#091540");
  }
}

setBgColor();

document.getElementById("toggle-bg").addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
  setBgColor();
});
