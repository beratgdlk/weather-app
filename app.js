const cityInput = document.getElementById('city-input');
const getWeatherButton = document.getElementById('get-weather');
const weatherResult = document.getElementById('weather-result');

// API Anahtarınızı buraya ekleyin
const apiKey = 'YOUR_API_KEY_HERE';

// Hava durumu verisini alma fonksiyonu
getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        fetchWeather(city);
        cityInput.value = ''; // Giriş kutusunu temizle
    }
});

// Hava durumu API isteği fonksiyonu
function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherResult.innerHTML = `<p class="error">${error.message}</p>`;
        });
}

// Hava durumu bilgisini gösterme fonksiyonu
function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description;
    const icon = weather[0].icon;

    weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p>${temperature}°C</p>
        <p>${description}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}" />
    `;
}
