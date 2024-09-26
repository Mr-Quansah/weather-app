const apiKey = "c6ee98477d6881db9b040eb728ce39ce";
const searchBtn = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
var data = '';

function search(){
    if(cityInput.value === ''){
        alert('Enter city name')
    }else{
        let city = cityInput.value;
        fetchWeather(city);
    }
}
async function fetchWeather(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if(!response.ok){
            throw new Error("City Not Found");
        }else{
            data = await response.json();
            // console.log(data);
            displayData(data);
        }
    }catch(error){
        weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayData(data){
    const { main, wind, weather } = data;
    weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Humidity: ${main.humidity} %</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        <p>Condition: ${weather[0].description}</p>
    `;
}