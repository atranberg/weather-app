let now = new Date();
let dateElement = document.querySelector("#date-display");
let timeElement = document.querySelector("#time-display");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dateElement.innerHTML = `${day} ${date} ${month} ${year}`;
timeElement.innerHTML = `${hours}:${minutes}`;

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayWeatherForecast(response) {
  let forecast = response.data.daily;
  let forecastDisplay = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
          <div class="forecastDay">${formatForecastDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" width="40"/>
          <div class="forecastTemperature">
            <span class="forecastTemperatureMax" id="#forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span>
             |
            <span class="forecastTemperatureMin" id="#forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
        </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastDisplay.innerHTML = forecastHTML;
}

function retrieveForecast(coordinates) {
  let apiKey = "03cb8d16f9a2b4cc3c8597d68446f50d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherForecast);
}

function showWeatherCondition(response) {
  document.querySelector("#city-display").innerHTML = response.data.name;
  document
    .querySelector("#main-icon-display")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#main-icon-display")
    .setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature-display").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#units").innerHTML = `°C`;

  document.querySelector("#weather-description-display").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;

  let unixSunriseTimestamp = response.data.sys.sunrise;
  let sunriseDate = new Date(unixSunriseTimestamp * 1000);
  let sunriseHours = sunriseDate.getHours();
  if (sunriseHours < 10) {
    sunriseHours = `0${sunriseHours}`;
  }
  let sunriseMinutes = sunriseDate.getMinutes();
  if (sunriseMinutes < 10) {
    sunriseMinutes = `0${sunriseMinutes}`;
  }
  let formattedSunriseTime = `${sunriseHours}:${sunriseMinutes}`;
  document.querySelector("#sunrise-time").innerHTML = formattedSunriseTime;

  let unixSunsetTimestamp = response.data.sys.sunset;
  let sunsetDate = new Date(unixSunsetTimestamp * 1000);
  let sunsetHours = sunsetDate.getHours();
  if (sunsetHours < 10) {
    sunsetHours = `0${sunsetHours}`;
  }
  let sunsetMinutes = sunsetDate.getMinutes();
  if (sunsetMinutes < 10) {
    sunsetMinutes = `0${sunsetMinutes}`;
  }
  let formattedSunsetTime = `${sunsetHours}:${sunsetMinutes}`;
  document.querySelector("#sunset-time").innerHTML = formattedSunsetTime;

  let weatherDescription = response.data.weather[0].description;
  if (weatherDescription === "clear sky") {
    document
      .querySelector("#weather-image-display")
      .setAttribute("src", "media/clearSky.jpg");
  }
  if (weatherDescription === "few clouds") {
    document
      .querySelector("#weather-image-display")
      .setAttribute("src", "media/fewClouds.jpg");
  }
  if (weatherDescription === "scattered clouds") {
    document
      .querySelector("#weather-image-display")
      .setAttribute("src", "media/scatteredClouds.jpg");
  }
  if (weatherDescription === "broken clouds") {
    document
      .querySelector("#weather-image-display")
      .setAttribute("src", "media/brokenClouds.jpg");
  }
  if (weatherDescription === "shower rain") {
    document
      .querySelector("#weather-image-display")
      .setAttribute("src", "media/showerRain.jpg");
  }
  if (weatherDescription === "rain") {
    document
      .querySelector("#weather-image-display")
      .setAttribute("src", "media/rain.jpg");
  }
  if (weatherDescription === "thunderstorm") {
    document
      .querySelector("#weather-image-display")
      .setAttribute("src", "media/thunderstorm.jpg");
  }
  if (weatherDescription === "snow") {
    document
      .querySelector("#weather-image-display")
      .setAttribute("src", "media/snow.jpg");
  }
  if (weatherDescription === "mist") {
    document
      .querySelector("#weather-image-display")
      .setAttribute("src", "media/mist.jpg");
  } else {
    document
      .querySelector("#weather-image-display")
      .setAttribute("src", "media/scatteredClouds.jpg");
  }

  retrieveForecast(response.data.coord);
}

function searchCityWeather(city) {
  let apiKey = "03cb8d16f9a2b4cc3c8597d68446f50d";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeatherCondition);
}
function handleSearch(event) {
  event.preventDefault();
  let citySearchInput = document.querySelector("#city-input");
  searchCityWeather(citySearchInput.value);
}
let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", handleSearch);

function retrieveCurrentPosition(position) {
  let apiKey = "03cb8d16f9a2b4cc3c8597d68446f50d";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let url = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

  axios.get(url).then(showWeatherCondition);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let displayTemperature = document.querySelector("#temperature-display");
  displayTemperature.innerHTML = Math.round(fahrenheitTemperature);
  document.querySelector("#units").innerHTML = `°F`;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  document.querySelector("#temperature-display").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#units").innerHTML = `°C`;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

function currentPosition() {
  navigator.geolocation.getCurrentPosition(retrieveCurrentPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCityWeather("Borås");
