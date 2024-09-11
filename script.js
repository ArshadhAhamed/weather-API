document.addEventListener('DOMContentLoaded', () => {
  
    document.getElementById('weather-form').addEventListener('submit', fetchWeatherData);
});


function fetchWeatherData(event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const apiKey = '1f277bf62e3f6a28aa2d757fa9216eb2'; // Replace with your actual Weatherstack API key
    const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success === false) {
                displayError('Unable to retrieve weather data. Please check the city name and try again.');
            } else {
                displayWeatherData(data);
            }
        })
        .catch(error => displayError('An error occurred while fetching data.'));
}


function displayWeatherData(data) {
    const weatherResult = document.getElementById('weather-result');
    const { location, current } = data;

    weatherResult.innerHTML = `
        <h3>${location.name}, ${location.country}</h3>
        <p><strong>Temperature:</strong> ${current.temperature}°C</p>
        <p><strong>Weather:</strong> ${current.weather_descriptions.join(', ')}</p>
        <p><strong>Wind Speed:</strong> ${current.wind_speed} km/h</p>
        <p><strong>Humidity:</strong> ${current.humidity}%</p>
    `;
}


function displayError(message) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `<p class="text-danger">${message}</p>`;
}
