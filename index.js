let now = new Date();
let h1 = document.querySelector("h1");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

h1.innerHTML = `${day} ${month} ${date},${year} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#example-inputCity1");

  let h3 = document.querySelector("#city");
  h3.innerHTML = `${searchInput.value}`;
  getCityTemp(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
          <div class="weather-forecast-date">
              ${formatDay(forecastDay.dt)}</div>
              
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" width="42" />
          <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">
                  ${Math.round(forecastDay.temp.max)}°
              </span>
              <span class="weather-forecast-temperature-min">
                  ${Math.round(forecastDay.temp.min)}°
              </span>
          </div>
      </div>

`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "7477c64b4f44c38c61eb4a8445849157";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = temperature;
  let humidity = Math.round(response.data.main.humidity);
  let visibility = Math.round(response.data.visibility);
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let visibilityElement = document.querySelector("#visibility");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  temperatureElement.innerHTML = `${temperature}`;
  humidityElement.innerHTML = `${humidity}%`;
  visibilityElement.innerHTML = `${visibility}`;
  windElement.innerHTML = `${wind}km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  descriptionElement.innerHTML = `${description}`;

  getForecast(response.data.coord);
}

function getCityTemp(city) {
  const apiKey = "7477c64b4f44c38c61eb4a8445849157";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-input");
form.addEventListener("submit", search);
