const apiKey = "34992775f2f46c9b567e8fc38dba4aac";

const searchBox = document.querySelector(".banana");

const searchBtn = document.querySelector("#search-form");
const currentWeatherContainer = document.querySelector("#currentWeather");
const forecastContainer = document.querySelector('#forecast')

function checkWeather(city) {
    const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
    currentWeatherContainer.innerHTML = ''
  fetch(apiUrl + city + `&appid=${apiKey}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);

      const iconcode = data.weather[0].icon;

      const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

      const dt = new Date(data.dt * 1000).toLocaleDateString();

      const title = document.createElement("h3");
      const icon = document.createElement("img");
      const temp = document.createElement("p");
      const wind = document.createElement("p");
      const humid = document.createElement("p");

      title.textContent = data.name + " " + dt;
      temp.textContent = "Temperature: " + Math.round(data.main.temp) + "°F";
      wind.textContent = "Wind Speed: " + data.wind.speed + "MPH";
      humid.textContent = "Humidity: " + data.main.humidity + "%"
      icon.setAttribute('src', iconurl)


      title.append(icon)

      currentWeatherContainer.append(title, temp, wind, humid);

    });
}

function runFiveDay(city){
    const apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=";

    fetch(apiUrl + city + `&appid=${apiKey}`)
    .then(function (res) {
      return res.json();
    }).then(function(data){

        console.log(data);
        const title = document.createElement("h3");
        title.textContent = '5 Day Forecast'
        forecastContainer.append(title)
        for (let i = 0; i < data.list.length; i+=8) {
            console.log(i);
            
        }
    })
}


searchBtn.addEventListener("submit", (event) => {
  event.preventDefault();
  checkWeather(searchBox.value);
  runFiveDay(searchBox.value)
});

checkWeather('new york')