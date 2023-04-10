$("#city-form").on("submit", function (event) {
  let currentTemp, humidity, windSpeed, weatherDesc, currentDay
  event.preventDefault();
const cityName = $("#city-input").val().trim();

  
const apiKey = "204bec23efe05b77bb2ad34522a2a685";
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

// Made two API requests using jQuery's $.when() method
$.when(
  $.ajax({
    url: currentWeatherUrl,
    method: "GET",
  }),
  $.ajax({
    url: forecastUrl,
    method: "GET",
  })
  ).then(function (currentWeatherResponse, forecastResponse) {
    currentDay = moment(forecastResponse[0].list[0].dt_txt).format("MMMM/Do/YYYY");
    currentTemp = currentWeatherResponse[0].main.temp;
    humidity = currentWeatherResponse[0].main.humidity;
    windSpeed = currentWeatherResponse[0].wind.speed;
    weatherDesc = currentWeatherResponse[0].weather[0].description;

    const forecastData = forecastResponse[0].list;
    const fiveDayForecast = [];
  for (let i = 7; i < forecastData.length; i += 8) {
    const date = moment(forecastData[i].dt_txt).format("MMMM Do, YYYY");
    const temp = forecastData[i].main.temp;
    const humidity = forecastData[i].main.humidity;
    const weatherDesc = forecastData[i].weather[0].description;

    // TODO: round this off
    const tempF = ((temp - 273.15) * 9/5 + 32).toFixed(2);

    fiveDayForecast.push({ date, temp: tempF, humidity, weatherDesc });
    }
  });
});