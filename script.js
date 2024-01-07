function formatdate(date) {

let hours=date.getHours();
if (hours<10){
hours=`0${hours}`;
}

let minutes=date.getMinutes();
if (minutes<10){
  minutes=`0${minutes}`;
}

let dayIndex=date.getDay();

let days= [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day=days[dayIndex];
return `${day}, ${hours}:${minutes}`;
}

let dateElement=document.querySelector("#date");
let currentTime=new Date();
dateElement.innerHTML=formatdate(currentTime);


function displayWeatherCondition(response) {
  console.log(response.data.name);
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city").innerHTML=response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML=response.data.main.humidity;
  document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML=response.data.weather[0].main;
  let iconElement=document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);


}

function searchCity(city) {
    let apiKey = "43b2fa3924e8439ae02236bb031f83ab";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
 let city = document.querySelector("#city-input").value;
  searchCity(city);
}

  
let weathersearchform = document.querySelector("#search-form");
weathersearchform.addEventListener("submit", handleSubmit);


let forecast=document.querySelector("#forecast");


 function formatDay(timestamp) {
   let date = new Date(timestamp * 1000);
   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

   return days[date.getDay()];
 }

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature=(celsiusTemperature * 9)/5+32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
  
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);

}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheitlink");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsiuslink");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Charlotte");

