import { data } from "./data/cities.js";

const inputEl = document.querySelector("#city-input");
const buttonEl = document.querySelector("#search-btn");
const citySelector = document.getElementById("city-selector");
const locationEl = document.querySelector("#city-name");
const emojiEl = document.querySelector(".weather-icon span");
const temperatureEL = document.querySelector("#temperature");
const descriptionEl = document.querySelector("#description");
const feelsEl = document.querySelector("#feels-like");
const humidityEl = document.querySelector("#humidity");
const windEl = document.querySelector("#wind");
const errorMessageEl = document.querySelector("#error-message");


buttonEl.addEventListener("click", () => {
  const location = inputEl.value;

  if (location) {
    locationEl.innerText = location;
    participation(location);
  }
});

function participation(location) {
  let found = false;

  for (const element of data) {
    if (location.toLowerCase() === element.city.toLowerCase()) {
      found = true;

      // Jei miestas rastas, paslėpti klaidos pranešimą ir grąžinti įprastą spalvą
      errorMessageEl.style.display = "none";
      inputEl.style.borderColor = "";  // Grąžina įprastą spalvą

      // Atnaujinti informaciją
      descriptionEl.innerText = element.precipitation;
      if (element.precipitation === "rain") {
        emojiEl.innerHTML = "🌧️";
      }
      if (element.precipitation === "sun") {
        emojiEl.innerHTML = "☀️";
      }
      if (element.precipitation === "cloudy") {
        emojiEl.innerHTML = "☁️";
      }
      temperatureEL.innerText = `${element.temperature} \u00B0C`;
      feelsEl.innerText = `Feels like: ${element.feels_like} \u00B0C`;
      humidityEl.innerText = `Humidity: ${element.humidity}%`;
      windEl.innerText = `Wind speed: ${element.wind} m/s`;
    }
  }

  if (!found) {
    // Jei miestas nerastas, rodyti klaidos pranešimą ir raudoną spalvą
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Miestas nerastas!";
    inputEl.style.borderColor = "red";  // Keičia paieškos laukelio spalvą į raudoną
  }
}