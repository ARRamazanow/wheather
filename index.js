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
const citySelect = document.getElementById("city-select");

const apiKey = "API key"; // type your API key here

function getWeather(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        errorMessageEl.style.display = "block";
        errorMessageEl.innerText = "Miestas nerastas!";
        inputEl.style.borderColor = "red";
      } else {
        errorMessageEl.style.display = "none";
        inputEl.style.borderColor = "";

        const weather = data.current;
        const city = data.location;

        descriptionEl.innerText = weather.condition.text;
        temperatureEL.innerText = `${weather.temp_c} \u00B0C`;
        feelsEl.innerText = `Feels like: ${weather.feelslike_c} \u00B0C`;
        humidityEl.innerText = `Humidity: ${weather.humidity}%`;
        windEl.innerText = `Wind speed: ${weather.wind_kph} km/h`;

        switch (weather.condition.text.toLowerCase()) {
          case "clear":
            emojiEl.innerHTML = "☀️";
            break;
          case "rain":
            emojiEl.innerHTML = "🌧️";
            break;
          case "cloudy":
            emojiEl.innerHTML = "☁️";
            break;
          case "snow":
            emojiEl.innerHTML = "❄️";
            break;
          default:
            emojiEl.innerHTML = "🌤️";
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      errorMessageEl.style.display = "block";
      errorMessageEl.innerText = "Error fetching data.";
      inputEl.style.borderColor = "red";
    });
}

buttonEl.addEventListener("click", () => {
  const location = inputEl.value.trim();
  if (location) {
    locationEl.innerText = location;
    getWeather(location);
  }
});

data.forEach((city) => {
  const option = document.createElement("option");
  option.value = city.city;
  option.textContent = `${city.city}, ${city.country}`;
  citySelect.appendChild(option);
});

citySelect.addEventListener("change", () => {
  const selectedCity = citySelect.value;
  if (selectedCity) {
    locationEl.innerText = selectedCity;
    getWeather(selectedCity);
  }
});
