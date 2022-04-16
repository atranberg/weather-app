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
