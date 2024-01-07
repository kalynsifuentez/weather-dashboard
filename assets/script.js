const apiKey = "34992775f2f46c9b567e8fc38dba4aac";
const searchBox = document.querySelector(".form");
const searchBtn = document.querySelector("#search-form");
const currentWeatherContainer = document.querySelector("#currentWeather");
const forecastContainer = document.querySelector("#forecast");

function checkWeather(city) {
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
  currentWeatherContainer.innerHTML = "";
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
      let temp = document.createElement("p");
      const wind = document.createElement("p");
      const humid = document.createElement("p");

      title.textContent = data.name + " " + dt;
      temp.textContent = "Temperature: " + Math.round(data.main.temp) + "°F";
      wind.textContent = "Wind Speed: " + data.wind.speed + "MPH";
      humid.textContent = "Humidity: " + data.main.humidity + "%";
      icon.setAttribute("src", iconurl);

      title.append(icon);
      console.log(temp);

      currentWeatherContainer.append(title, temp, wind, humid);
    });
}

function runFiveDay(city) {
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=";
  forecastContainer.innerHTML = "";

  fetch(apiUrl + city + `&appid=${apiKey}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      const title = document.createElement("h3");
      title.textContent = "5 Day Forecast";
      forecastContainer.append(title);



      for (let i = 0; i < data.list.length; i += 8) {
        console.log(i);
        const dt = new Date(data.list[i].dt * 1000).toLocaleDateString();

      const iconcode = data.list[i].weather[0].icon;
      const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
     

        const title = document.createElement("h5");
        title.textContent = dt;
        const icon = document.createElement("img");
         icon.setAttribute("src", iconurl);
      title.append(icon);
        let temp = document.createElement("p");
        let wind = document.createElement("p");
        let humid = document.createElement("p");
        temp.textContent = "Temperature: " + Math.round(data.list[i].main.temp) + "°F";
        wind.textContent = "Wind Speed: " + data.list[i].wind.speed + "MPH";
        humid.textContent = "Humidity: " + data.list[i].main.humidity + "%";

        forecastContainer.append(title, temp, wind, humid);
        // console.log(temp);
      }
    });
}

searchBtn.addEventListener("submit", (event) => {
  event.preventDefault();
  checkWeather(searchBox.value);
  runFiveDay(searchBox.value);
});

checkWeather("new york");
runFiveDay("new york");
