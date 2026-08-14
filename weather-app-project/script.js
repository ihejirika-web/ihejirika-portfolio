const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const copyBtn = document.getElementById("copyBtn");

// Paste your API key here
const apiKey = "f5940b61ec016f70f50958e7f3837181";
let weatherReport = "";

searchBtn.addEventListener("click", function () {
  const city = cityInput.value.trim();

  if (city === "") {
    weatherResult.innerHTML = "<p>⚠️ Please enter a city name.</p>";
    return;
  }

  weatherResult.innerHTML = "<p>⏳ Loading weather...</p>";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        weatherResult.innerHTML = `
            <p style="color:red;">
                ❌ City not found! Please try again.
            </p>
        `;
        return;
      }

      let icon = "☀️";

      if (data.weather[0].main === "Clouds") {
        icon = "☁️";
      } else if (data.weather[0].main === "Rain") {
        icon = "🌧️";
      } else if (data.weather[0].main === "Thunderstorm") {
        icon = "⛈️";
      } else if (data.weather[0].main === "Snow") {
        icon = "❄️";
      } else if (data.weather[0].main === "Mist") {
        icon = "🌫️";
      }

      weatherReport = `
📍 ${data.name}
🌡️ Temperature: ${data.main.temp} °C
${icon} Weather: ${data.weather[0].main}
💧 Humidity: ${data.main.humidity}%
🌬️ Wind Speed: ${data.wind.speed} m/s
`;

      cityInput.value = "";

      weatherResult.innerHTML = `
        <h2>${data.name}</h2>
        <p>🌡️ Temperature: ${data.main.temp} °C</p>
        <p>${icon} Weather: ${data.weather[0].main}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
    `;
    })
    .catch((error) => {
      weatherResult.innerHTML = "<p>❌ Something went wrong.</p>";
      console.error(error);
    });
});

copyBtn.addEventListener("click", function () {
  if (weatherReport === "") {
    alert("⚠️ Please search for a city first.");
    return;
  }

  navigator.clipboard
    .writeText(weatherReport)
    .then(() => {
      alert("✅ Weather report copied successfully!");
    })
    .catch((error) => {
      console.error(error);
      alert("❌ Failed to copy weather report.");
    });
});

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

copyBtn.addEventListener("click", function () {
  if (weatherReport === "") {
    alert("⚠️ Please search for a city first.");
    return;
  }

  navigator.clipboard
    .writeText(weatherReport)
    .then(() => {
      alert("✅ Weather report copied successfully!");
    })
    .catch((error) => {
      console.error(error);
      alert("❌ Failed to copy weather report.");
    });
});
