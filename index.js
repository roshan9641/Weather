let cityName = document.querySelector(".weather-city");
let dateAndTime = document.querySelector(".weather-date-time");
let w_Forecast = document.querySelector(".weather-forecast");
let w_Icon = document.querySelector(".weather-icon");
let w_Temprature = document.querySelector(".weather-temprature");
let w_Min = document.querySelector(".weather-min");
let w_Max = document.querySelector(".weather-max");
let w_FeelsLike = document.querySelector(".weather-feelsLike");
let w_Humidity = document.querySelector(".weather-humidity");
let w_Wind = document.querySelector(".weather-wind");
let w_Pressure = document.querySelector(".weather-pressure");
let citySearch = document.querySelector(".weather-search");

let getCountryName = (code) =>{
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
}

let getDateAndTime = (dt) => {
    let curDate = new Date(dt*1000);
    console.log(curDate);

    let options = {
        weekDay: "long",
        year: "numeric",
        month: "long",
        date: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    let formatter = new Intl.DateTimeFormat("en-US",options);
    console.log(formatter);
    
    return formatter.format(curDate);
    
};
let city = "asansol";
citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    let cityNameBox = document.querySelector(".city-name");
    console.log(cityNameBox.value);
    city = cityNameBox.value;
    getWeatherData();
    cityNameBox.value = "";
});

let getWeatherData = async()=>{
    let webUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6b830620878249ec6bbba0e0a9466e89`;

try {
    let res = await fetch(webUrl);
    let data  = await res.json();
    console.log(data);
   let {main,name,weather,wind,sys,dt}=data;
    
    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateAndTime.innerHTML = getDateAndTime(dt);
    w_Temprature.innerHTML = `${(main.temp - 273.15).toFixed(2)}&#176;C`;
    w_Min.innerHTML = `Min: ${(main.temp_min - 273.15).toFixed()}&#176`;
    w_Max.innerHTML = `Max: ${(main.temp_max - 273.15).toFixed()}&#176`;
    w_FeelsLike.innerHTML = `${(main.feels_like -273.15).toFixed(2)}&#176`;
    w_Humidity.innerHTML = `${main.humidity}%`;
    w_Wind.innerHTML = `${wind.speed} m/s`;
    w_Pressure.innerHTML = `${main.pressure} hPa`;
    w_Forecast.innerHTML = weather[0].main;
    w_Icon.innerHTML = `<img src= "http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
    
    
   
    
} catch (error) {
    console.log(error);
    
}
};
document.body.addEventListener("load",getWeatherData());