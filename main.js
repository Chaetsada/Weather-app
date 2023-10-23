const input = document.getElementById('inputBox');
const searchBtn = document.getElementById('searchButton');
const errorMessage = document.getElementById('errorMsg');
const API_KEY = "b80e7896e8e1e4e1b8687604d0506817";

async function getWeather(location){
    //DATA Fetching
    let URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    let res = await fetch(URL+ location +`&appid=${API_KEY}`)
    if(res.status == 404){
        errorMessage.style.visibility = "visible";
        errorMessage.innerHTML = "Location not found !!";
        input.style.border = "2px solid crimson";
    }else if(res.status == 400){
        errorMessage.innerHTML = "Seem like Searchbox is empty!!";
        errorMessage.style.visibility = "visible";
        input.style.border = "2px solid crimson";
    }else{
        let data = await res.json();

        console.log(data);
        //Display data details
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + " °C";
            document.querySelector('.location').innerHTML = data.name;
            document.querySelector('.humidity').innerHTML = data.main.humidity + " %";
            document.querySelector('.wind').innerHTML = data.wind.speed + " Km/h";
            
            // errorMessage.innerHTML = " ";
            errorMessage.style.visibility = "hidden";
            input.style.border = "none";
            input.value = " "
        //Handle Weather images
            let iconWeather = document.querySelector('.weather-icon');   
            if(data.weather[0].main == "Clear"){
                iconWeather.src = "assets/clear.png"
            }else if(data.weather[0].main == "Cloud"){
                iconWeather.src = "assets/cloud.png"
            }else if(data.weather[0].main == "Dizzle"){
                iconWeather.src = "assets/dizzler.png"
            }else if(data.weather[0].main == "Mist"){
                iconWeather.src = "assets/mist.png"
            }else if(data.weather[0].main == "Rain"){
                iconWeather.src = "assets/rain.png"
            }else if(data.weather[0].main == "Snow"){
                iconWeather.src = "assets/snow.png"
            }
        }
}
searchBtn.addEventListener("click",()=>{
    getWeather(input.value);
});

const getCurrentBtn = document.getElementById('getButton');

async function getCurrentWeather(lat,lon){   
    let res =await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    let data = await res.json();
            console.log(data)
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + " °C";
            document.querySelector('.location').innerHTML = data.name;
            document.querySelector('.humidity').innerHTML = data.main.humidity + " %";
            document.querySelector('.wind').innerHTML = data.wind.speed + " Km/h";
            
            let iconWeather = document.querySelector('.weather-icon');
            if(data.weather[0].main == "Clear"){
                iconWeather.src = "assets/clear.png"
            }
            else if(data.weather[0].main == "Cloud"){
                iconWeather.src = "assets/cloud.png"
            }
            else if(data.weather[0].main == "Dizzle"){
                iconWeather.src = "assets/dizzler.png"
            }
            else if(data.weather[0].main == "Mist"){
                iconWeather.src = "assets/mist.png"
            }
            else if(data.weather[0].main == "Rain"){
                iconWeather.src = "assets/rain.png"
            }
            else if(data.weather[0].main == "Snow"){
                iconWeather.src = "assets/snow.png"
            }
}
getCurrentBtn.addEventListener("click",()=>{
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude.toFixed(2);
        let lon = position.coords.longitude.toFixed(2);

        getCurrentWeather(lat,lon);
    })
});