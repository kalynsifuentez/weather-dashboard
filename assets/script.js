const apiKey = "34992775f2f46c9b567e8fc38dba4aac";
const searchBox = document.querySelector(".form");
const searchBtn = document.querySelector("#search-form");
const currentWeatherContainer = document.querySelector("#currentWeather");
const forecastContainer = document.querySelector("#forecast");
const searchedCitiesEl = document.querySelector("#searched-cities");
let searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];

function checkWeather(city) {
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
  currentWeatherContainer.innerHTML = "";
  fetch(apiUrl + city + `&appid=${apiKey}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // console.log(data);

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
      humid.textContent = "Humidity: " + data.main.humidity + "%";
      icon.setAttribute("src", iconurl);

      title.append(icon);
      // console.log(temp);
      storeInLS(data.name);

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
      for (let i = 0; i < data.list.length; i += 8) {
        console.log(data.list[i]);
        const dt = new Date(data.list[i].dt * 1000);
        const daysOfTheWeek = [
          "Sun",
          "Mon",
          "Tues",
          "Wed",
          "Thurs",
          "Fri",
          "Sat",
        ];

        const dayOfTheWeek = daysOfTheWeek[dt.getDay()];

        const forecastCard = document.createElement("div");
        forecastCard.setAttribute("class", "mx-2 p-2 card");

        const iconcode = data.list[i].weather[0].icon;
        const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        const title = document.createElement("h5");
        title.textContent = dayOfTheWeek + " " + dt.toLocaleDateString();

        const icon = document.createElement("img");
        icon.setAttribute("src", iconurl);
        title.append(icon);
        const temp = document.createElement("p");
        const wind = document.createElement("p");
        const humid = document.createElement("p");
        temp.textContent =
          "Temperature: " + Math.round(data.list[i].main.temp) + "°F";
        wind.textContent = "Wind Speed: " + data.list[i].wind.speed + "MPH";
        humid.textContent = "Humidity: " + data.list[i].main.humidity + "%";

        forecastCard.append(title, temp, wind, humid);
        forecastContainer.append(forecastCard);
      }
    });
}

searchBtn.addEventListener("submit", function (event) {
  event.preventDefault();

  checkWeather(searchBox.value);
  runFiveDay(searchBox.value);
});

function storeInLS(city) {
  if (searchedCities.includes(city)) {
    return;
  }

  searchedCities.push(city);
  loadButtons();
  localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
}

function loadButtons() {
  searchedCitiesEl.innerHTML = "";
  for (let i = 0; i < searchedCities.length; i++) {
    const searchedCitiesList = document.createElement("button");
    searchedCitiesList.classList.add("w-50");

    searchedCitiesList.textContent = searchedCities[i];

    searchedCitiesList.addEventListener("click", function () {
      checkWeather(this.textContent);
      runFiveDay(this.textContent);
    });

    searchedCitiesEl.appendChild(searchedCitiesList);
  }
}
// clearBtn.addEventListener("click", () => {
//   localStorage.clear();
//   resultEl.innerText = '';
//   resultNameEl.innerText = '';
// });

checkWeather("new york");
runFiveDay("new york");

loadButtons();
