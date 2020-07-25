//Days
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

let now = new Date();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
let date = now.getDate();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let year = now.getFullYear();
let h4 = document.querySelector("h4");
h4.innerHTML = ` ${hours}:${minutes} ${day} ${month} ${date} ${year}`;

//Change Temp for City//

function search(event) {
  event.preventDefault();
  let search = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${search.value}.toUpperCase()`;
  searchCity(search.value);
}
function showTemp(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#tempNow");
  let tempNow = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${tempNow}`;
  fahrenheitTemp = response.data.main.temp;
  let currentHumidity = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  currentHumidity.innerHTML = `Humidity ${humidity}%`;
  let currentFeels = document.querySelector("#feels");
  let feels = Math.round(response.data.main.feels_like);
  currentFeels.innerHTML = `Feels like ${feels}°F`;
  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind speed ${currentWind} mph`;
  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${description}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let form1 = document.querySelector("#form1");
form1.addEventListener("submit", search);

function searchCity(city) {
  let place = document.querySelector("#search-text-input").value;
  let apiKey = "b1b919a86239e80b1ad3fa4e4880db02";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=imperial&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
  displayCelsiusTemp(event);
}

//Current Location//
function showPosition(response) {
  event.preventDefault();
  console.log(response.data);
  fahrenheitTemp = response.data.main.temp;
  let h1 = document.querySelector("h1");
  let tempNow = document.querySelector("#tempNow");
  let tempElement = Math.round(response.data.main.temp);
  tempNow.innerHTML = `${tempElement}`;
  h1.innerHTML = `${response.data.name}`;
  let currentHumidity = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  currentHumidity.innerHTML = `Humidity ${humidity}%`;
  let currentFeels = document.querySelector("#feels");
  let feels = Math.round(response.data.main.feels_like);
  currentFeels.innerHTML = `Feels like ${feels}°F`;
  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind speed ${currentWind} mph`;
  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${description}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  displayCelsiusTemp(event);
}

function retrievePosition(position) {
  let apiKey = "e5484fddc20637c7532aced4dfc662f6";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showPosition);
}

function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let getLocation = document.querySelector("#location");
getLocation.addEventListener("click", getCurrentPosition);

// convert the temps

function displayCelsiusTemp(event) {
  event.preventDefault();
  let ctemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  let temperatureElement = document.querySelector("#c-link");
  temperatureElement.innerHTML = `${ctemp}°C`;
}

function displayFahrenheitTemp(event) {
  let temperatureElement = document.querySelector("f-link");
  temperatureElement.innerHTML = `${ftemp}°F`;
}

let fahrenheitTemp = null;

let celsiusLink = document.querySelector("#c-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let city = "New York";
let apiKey = "b1b919a86239e80b1ad3fa4e4880db02";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
