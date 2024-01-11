// Declared variables for each button, container, element and the API key
const apiKey = "34992775f2f46c9b567e8fc38dba4aac";
const searchBox = document.querySelector(".form");
const searchBtn = document.querySelector("#search-form");
const clearBtn = document.querySelector(".clear");
const currentWeatherContainer = document.querySelector("#currentWeather");
const forecastContainer = document.querySelector("#forecast");
const searchedCitiesEl = document.querySelector("#searched-cities");
let searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];

// checkWeather hosts the apiURL for same day forecast and fetches the apiKey
function checkWeather(city) {
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
  currentWeatherContainer.innerHTML = "";
  fetch(apiUrl + city + `&appid=${apiKey}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // Variables are declared for icon and date
      const iconcode = data.weather[0].icon;
      const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      const dt = new Date(data.dt * 1000).toLocaleDateString();

      // Elements are created and appended. These elements display the date, temperature, humidity, and wind
      const title = document.createElement("h3");
      const icon = document.createElement("img");
      const temp = document.createElement("p");
      const wind = document.createElement("p");
      const humid = document.createElement("p");

      // Text is applied to each element
      title.textContent = data.name + " " + dt;
      temp.textContent = "Temperature: " + Math.round(data.main.temp) + "°F";
      wind.textContent = "Wind Speed: " + data.wind.speed + "MPH";
      humid.textContent = "Humidity: " + data.main.humidity + "%";
      icon.setAttribute("src", iconurl);

      // storeInLS function is called to store data in the local storage
      storeInLS(data.name);

      // icon element is appended to the title element
      title.append(icon);

      // All elements are appended the currentWeatherContainer variable
      currentWeatherContainer.append(title, temp, wind, humid);
    });
}

// runFiveDay hosts the apiURL for 5-day forecast and fetches the apiKey
function runFiveDay(city) {
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=";
  forecastContainer.innerHTML = "";

  fetch(apiUrl + city + `&appid=${apiKey}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // For loop to extract every eighth element.
      for (let i = 0; i < data.list.length; i += 8) {
        console.log(data.list[i]);
        // Array of variables declared to state day of the week instead of numerical date
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

        // To set box around the each element in 5-day forecast
        const forecastCard = document.createElement("div");
        forecastCard.setAttribute("class", "mx-2 p-2 card");

        // Variables are declared for icon, date, and title
        const iconcode = data.list[i].weather[0].icon;
        const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        // Created title,icon,temperature,wind, and humidity element
        const title = document.createElement("h5");
        const icon = document.createElement("img");
        const temp = document.createElement("p");
        const wind = document.createElement("p");
        const humid = document.createElement("p");

        // Text is applied to each element
        title.textContent = dayOfTheWeek + " " + dt.toLocaleDateString();
        temp.textContent =
          "Temperature: " + Math.round(data.list[i].main.temp) + "°F";
        wind.textContent = "Wind Speed: " + data.list[i].wind.speed + "MPH";
        humid.textContent = "Humidity: " + data.list[i].main.humidity + "%";
        icon.setAttribute("src", iconurl);

        // icon element is appended to the title element
        title.append(icon);

        // All elements are appended the currentWeatherContainer variable
        forecastCard.append(title, temp, wind, humid);
        forecastContainer.append(forecastCard);
      }
    });
}

// Event listener for search button
searchBtn.addEventListener("submit", function (event) {
  event.preventDefault();

  // Functions called with event listeners
  checkWeather(searchBox.value);
  runFiveDay(searchBox.value);
});

// Function to set recent searches to local storage
function storeInLS(city) {
  if (searchedCities.includes(city)) {
    return;
  }

  searchedCities.push(city);
  // Called loadButtons function to extract cities in local storage
  loadButtons();
  localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
}

// Function to have recent searches appear in button form to click and search city again
function loadButtons() {
  searchedCitiesEl.innerHTML = "";
  for (let i = 0; i < searchedCities.length; i++) {
    // declared variable to create button element
    const searchedCitiesList = document.createElement("button");
    // Added class to button
    searchedCitiesList.classList.add("w-50");
    // City text to display in button
    searchedCitiesList.textContent = searchedCities[i];
    // Added event listener to buttons that are created from local storage
    searchedCitiesList.addEventListener("click", function () {
      checkWeather(this.textContent);
      runFiveDay(this.textContent);
    });
// Appended searchedCitiesList to searched CitiesEl to display on HTML page
    searchedCitiesEl.appendChild(searchedCitiesList);
  }
}

// Run checkWeather, runFiveDay, and loadButtons to display when user loads page
checkWeather("new york");
runFiveDay("new york");
loadButtons();
