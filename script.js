const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&q=";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")
const weatherIconD = [];
const alert=[];  
 

async function cheakWeather(city){
    const response = await fetch(apiUrl + city + '&appid=179d1bb386b74925b6b0b9d48c2fd8c3&units=metric'); 
    console.log(response); 
    var data = await response.json(); 
    console.log(data); 

    const response1 = await fetch('http://api.weatherapi.com/v1/forecast.json?key=cbdd927dcd9640f3a8b210516232508&q=' + city +'&days=7&aqi=yes&alerts=yes'); 
    var data1 = await response1.json(); 
    console.log(response1); 
    console.log(data1); 

    for (let i=1; i<5; i++){
        weatherIconD[i] =document.querySelector(".weather-iconD" + [i]); 
    }


    if(response.status == 404){
        document.querySelector(".error").style.display = "block"; 
        document.querySelector(".weather").style.display = "none"; 
        document.querySelector(".DailyWeather").style.display = "none";
        document.querySelector(".aleart").style.display = "none";
        document.querySelector(".moreDays").style.display = "none";
        document.querySelector(".moreAlerts").style.display = "none";
    } else {
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "Images/clouds.png";
        } else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "Images/clear.png";
        }  else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "Images/rain.png";
        }  else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "Images/mist.png";
        }  else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "Images/snow.png";
        }  else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "Images/drizzle.png";
        }

        if(data1.alerts.alert.length == 0){
            document.querySelector(".alertM").innerHTML = "Any Alearts will appear here if your are reading this meassage then there is no aleart in this area" ;
            document.querySelector(".moreAlerts").style.display = "none";
        } else {
            document.querySelector(".moreAlerts").style.display = "block";
            let alertt = " ";
            let alertD = " "; 
            for(let i=0;i< data1.alerts.alert.length  ; i++){
                const number = i+1; 
                alertt += "Alert " + number + ": " + data1.alerts.alert[i].event  + "</br>";
                alertD += "Alert " + number + ": " + data1.alerts.alert[i].event  + "</br> Discription: " + data1.alerts.alert[i].desc ;
                
            }
            document.querySelector(".alertM").innerHTML = alertt; 


        }

    
    document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country; 
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; 
    document.querySelector(".feels-like").innerHTML = "Feels Like " + Math.round(data.main.feels_like) + "°C"; 
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; 
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";  

    //Daily
    for (let i=1; i<5; i++){
    document.querySelector(".date" + i).innerHTML = data1.forecast.forecastday[i].date; 
    weatherIconD[i].src = data1.forecast.forecastday[i].day.condition.icon;
    document.querySelector(".Dtemp" + i).innerHTML = Math.round(data1.forecast.forecastday[i].day.avgtemp_c) + "°C"; 
    document.querySelector(".DMaxT" + i).innerHTML = 'Max-Temp ' + Math.round(data1.forecast.forecastday[i].day.maxtemp_c) + "°C"; 
    document.querySelector(".Rchance" + i).innerHTML = data1.forecast.forecastday[i].day.daily_chance_of_rain + "°%"; 

    } 


    document.querySelector(".weather").style.display = "block";
    document.querySelector(".DailyWeather").style.display = "block";
    document.querySelector(".error").style.display = "none"; 
    document.querySelector(".aleart").style.display = "block";
    document.querySelector(".moreDays").style.display = "block";
    }
}

searchButton.addEventListener("click", ()=>{
    cheakWeather(searchBox.value); 
})




