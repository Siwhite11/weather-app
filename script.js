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
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("tempNow");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${response.data.name}`;
  tempNow.innerHTML = `${temperature}°F`;
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

let location = document.querySelector("#location");
location.addEventListener("click", getCurrentPosition);
