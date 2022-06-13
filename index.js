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
  let descriptionElement = document.querySelector("#description");
  temperatureElement.innerHTML = `${temperature}`;
  humidityElement.innerHTML = `${humidity}%`;
  visibilityElement.innerHTML = `${visibility}`;
  windElement.innerHTML = `${wind}km/h`;
  descriptionElement.innerHTML = `${description}`;
}

function getCityTemp(city) {
  const apiKey = "7477c64b4f44c38c61eb4a8445849157";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-input");
form.addEventListener("submit", search);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
