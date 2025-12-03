const cityName = document.getElementById("city-name");
const countryName = document.getElementById("country-code");
const locationIn = document.getElementById("currentLocation");
const time = document.getElementById("local-time");
const temp = document.getElementById("temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const desc = document.getElementById("description");
const wIcon = document.getElementById("wIcon");
const errorCatch1 = document.getElementById("city-info");
const errorCatch2 = document.getElementById("weather-main");
const errorCatch3 = document.getElementById("weather-details");

//current Location
navigator.geolocation.getCurrentPosition(
  async (pos) => {
    const lon = pos.coords.longitude;
    const lat = pos.coords.latitude;
    console.log(lon, lat);

    await fetchAPI(lat, lon);
  },
  (error) => {
    const errorMessage = error.message;
    console.error(`Error retrieving location: ${errorMessage}`);
  }
);

async function fetchAPI(lat, lon) {
  const apikey1 = "65f9e533b5c5bbb105e8ea39eb51d075";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey1}&units=metric`
    );
    const data = await response.json();
    console.log(data);
    updateUI(data);
  } catch (error) {
    console.error(`Unable to fetch ${error.message}`);
  }
}

function updateUI(weatherData) {
  if (!weatherData?.weather || !weatherData?.main) {
    console.error("Invalid weather data received:", weatherData);
    errorCatch1.textContent =
      '<div class="state-error"><span>City not Found!</span></div>';
    locationIn.value = ``;
    errorCatch2.textContent = ``;
    errorCatch3.textContent = ``;
    return;
  }

  cityName.innerHTML = weatherData.name;
  time.textContent = getDayAndTime();
  temp.textContent = `${Math.floor(weatherData.main.temp)}°`;
  desc.textContent = weatherData.weather[0].description;
  feelsLike.textContent = `feels like ${Math.floor(
    weatherData.main.feels_like
  )}°`;
  humidity.textContent = `${weatherData.main.humidity}%`;
  wind.textContent = `${weatherData.wind.speed} km/h`;
  pressure.textContent = `${weatherData.main.pressure} hPa`;
  countryName.textContent = weatherData.sys.country;
  const iconCode = weatherData.weather[0].icon;
  const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  wIcon.innerHTML = `<img src="${iconURL}" alt="weather icon" class="icon-img" />`;
}

//Calculating date and time
function getDayAndTime() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[now.getDay()];
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${dayName}, ${hours}:${minutes}`;
}

//Searching for City temp manually
locationIn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchManually();
    locationIn.blur();
  }
});

//function called onclickig enter for searching city manually
async function searchManually() {
  const city = locationIn.value.trim();
  const apikey2 = "65f9e533b5c5bbb105e8ea39eb51d075";
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey2}&units=metric`
    );
    const data = await res.json();
    updateUI(data);
  } catch (error) {
    console.error(error.message);
    document.body.insertAdjacentHTML(
      "beforeend",
      '<div class="state-error"><span>City not Found!</span></div>'
    );
    locationIn.value = ``;
    setTimeout(() => document.querySelector(".state-error")?.remove(), 2200);
  }
}
