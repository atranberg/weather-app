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
  document.querySelector("#temperature-display").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
  document.querySelector("#weather-description-display").innerHTML =
    response.data.weather[0].description;

  let unixSunriseTimestamp = response.data.sys.sunrise;
  let sunriseDate = new Date(unixSunriseTimestamp * 1000);
  let sunriseHours = sunriseDate.getHours();
  let sunriseMinutes = sunriseDate.getMinutes();
  let formattedSunriseTime = `${sunriseHours}:${sunriseMinutes}`;
  document.querySelector("#sunrise-time").innerHTML = formattedSunriseTime;

  let unixSunsetTimestamp = response.data.sys.sunset;
  let sunsetDate = new Date();
  document.querySelector("#sunset-time").innerHTML = response.data.sys.sunset;
}

function searchCityWeather(event) {
  event.preventDefault();
  let apiKey = "03cb8d16f9a2b4cc3c8597d68446f50d";
  let citySearch = document.querySelector("#city-input").value;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}${citySearch}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", searchCityWeather);

function retrieveCurrentPosition(position) {
  let apiKey = "03cb8d16f9a2b4cc3c8597d68446f50d";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let url = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

  axios.get(url).then(showWeatherCondition);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(retrieveCurrentPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentPosition);
