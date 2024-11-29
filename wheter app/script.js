const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById("weatherInfo");

document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("city").value;
    if (city) {
        fetchWeatherByCity(city);
    }
});

document.getElementById("locateBtn").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            () => alert("Unable to retrieve your location")
        );
    } else {
        alert("Geolocation is not supported by your browser");
    }
});

function fetchWeatherByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch((error) => console.error("Error fetching weather data:", error));
}

function fetchWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch((error) => console.error("Error fetching weather data:", error));
}

function displayWeather(data) {
    if (data.cod === 200) {
        weatherInfo.classList.remove("hidden");
        document.getElementById("cityName").textContent = data.name;
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("temperature").textContent = data.main.temp;
        document.getElementById("humidity").textContent = data.main.humidity;
    } else {
        alert("City not found");
    }
}
