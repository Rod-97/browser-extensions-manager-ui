import data from "./data.js";

handleDarkLightModes();
displayExtensions();
handleSwitchToggle();
handlefilterButtons();

function handleDarkLightModes() {
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
}

function displayExtensions(filter = "All") {
  const container = document.querySelectorAll(".extensions-container")[0];
  container.innerHTML = data
    .filter((extension) => {
      if (
        (filter === "Active" && !extension.isActive) ||
        (filter === "Inactive" && extension.isActive)
      ) {
        return false;
      }
      return true;
    })
    .map((extension) => renderExtensionCard(extension))
    .join("");

  function renderExtensionCard(extension) {
    const { logo, name, description, isActive } = extension;

    return `<div id="${name}" class="extension" data-status="${
      isActive ? "active" : "inactive"
    }">
          <div class="info">
            <div class="img-container">
              <img src="${logo}" alt="${name}" />
            </div>

            <div class="text">
              <h2>${name}</h2>
              <p>
                ${description}
              </p>
            </div>
          </div>
          <div class="buttons">
            <button class="remove-btn">Remove</button>
            <label class="switch">
              <input class="switch-input" type="checkbox" ${
                isActive ? "checked" : ""
              } />
              <span class="slider round"></span>
            </label>
          </div>
        </div>`;
  }
}

function handleSwitchToggle() {
  const extensionsContainer = document.querySelectorAll(
    ".extensions-container"
  )[0];

  extensionsContainer.addEventListener("change", (event) => {
    if (!event.target.classList.contains("switch-input")) return;

    const extensionElement = event.target.closest(".extension");

    const extensionData = data.find(
      (element) => element.name === extensionElement.id
    );

    extensionData.isActive = !extensionData.isActive;
    extensionElement.dataset.status = extensionData.isActive
      ? "active"
      : "inactive";
  });
}

function handlefilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((filterBtn) => {
    filterBtn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("selected"));
      filterBtn.classList.add("selected");
      displayExtensions(filterBtn.dataset.filter);
    });
  });
}
