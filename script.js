import data from "./data.js";

handleDarkLightModes();
displayExtensions();

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

  function handleSwitchToggle() {
    const extensionElements = document.querySelectorAll(".extension");

    for (let i = 0; i < extensionElements.length; i++) {
      const extensionElement = extensionElements[i];
      const switchInput = extensionElement.querySelectorAll(".switch-input")[0];

      switchInput.addEventListener("change", () => {
        const element = data.find(
          (element) => element.name === extensionElement.id
        );
        element.isActive = !element.isActive;
        extensionElement.dataset.status =
          extensionElement.dataset.status === "active" ? "inactive" : "active";
      });
    }
  }

  const container = document.querySelectorAll(".extensions-container")[0];
  container.innerHTML = data
    .filter((extension) => {
      if (
        (filter === "Active" && !extension.isActive) ||
        (filter === "Inactive" && extension.isActive)
      ) {
        return;
      }
      return extension;
    })
    .map((extension) => renderExtensionCard(extension))
    .join("");
  handleSwitchToggle();
}
