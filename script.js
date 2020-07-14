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
let h3 = document.querySelector("fullDate");
fullDate.innerHTML = `${hours}:${minutes} ${day} ${month} ${date} ${year}`;

let getDay = document.querySelector("h2");
getDay.innerHTML = `${day}`;

//Change Temp for City//

function search(event) {
  event.preventDefault();
  let search = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${search.value}`;
  searchCity(search.value);
}
function showTemp(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#tempNow");
  let tempNow = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${tempNow}°F`;
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
}

//Current Location//
function showPosition(response) {
  event.preventDefault();
  console.log(response.data);
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("tempNow");
  let temperature = Math.round(response.data.main.temp);
  tempNow.innerHTML = `${temperature}°F`;
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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

//let descriptionElement = document.querySelector("#description");
//descriptionElement.innerHTML = response.data.weather[0].description;

// convert the temps

//function displayCelsiusTemp(event) {
//event.preventDefault();
//let ctemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
//let temperatureElement = document.querySelector("#c-link");
//tempNow.innerHTML = ctemp;
//}

//let fahrenheitTemp = null;
//let celsiusLink = document.querySelector("#c-link");
//celsiusLink.addEventListener("click", displayCelsiusTemp);
