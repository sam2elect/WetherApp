const apikey = "417e5e47e007f7938b48ffa2581405b0";

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(({ coords: { longitude: lon, latitude: lat } }) => {
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          console.log(new Date().getTime());
          const dat = new Date(data.dt);
          console.log(dat.toLocaleString(undefined,'Asia/Kolkata'));
          console.log(new Date().getMinutes());
          weatherReport(data);
        });
    });
  }
});



async function searchByCity() {
    const place = document.getElementById('input').value;
    const urlsearch = `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`;
  
    try {
      const res = await fetch(urlsearch);
      const data = await res.json();
      console.log(data);
      weatherReport(data);
    } catch (error) {
      console.error(error);
    }
  
    document.getElementById('input').value = '';
  }
  
function weatherReport(data) {
  const urlcast = `http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apikey}`;

  fetch(urlcast)
    .then(res => res.json())
    .then(forecast => {
      console.log(forecast.city);
      hourForecast(forecast);
      dayForecast(forecast);

      console.log(data);
      const { name, sys, main, weather, wind } = data;

      const city = document.getElementById('city');
      const temp = document.getElementById('temperature');
      const cloud = document.getElementById('clouds');
      const img = document.getElementById('img');
      const humidity = document.getElementById('humidity');
      const windspeed = document.getElementById('windspeed');

      city.innerText = `${name}, ${sys.country}`;
      temp.innerText = `${(main.temp - 273.15).toFixed(1)} °C`;
      cloud.innerText = `${weather[0].description}`;
      img.src = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
      humidity.innerText = `Humidity: ${main.humidity}%`;
      windspeed.innerText = `Wind Speed: ${wind.speed} km/h`;
    });
}

function hourForecast(forecast){
    document.querySelector('.templist').innerHTML=''
    for (let i = 0; i < 5; i++) {

        var date= new Date(forecast.list[i].dt*1000)
        console.log((date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00',''))

        let hourR=document.createElement('div');
        hourR.setAttribute('class','next');

        let div= document.createElement('div');
        let time= document.createElement('p');
        time.setAttribute('class','time')
        time.innerText= (date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00','');

        let temp= document.createElement('p');
        temp.innerText= Math.floor((forecast.list[i].main.temp_max - 273))+ ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273))+ ' °C';

        div.appendChild(time)
        div.appendChild(temp)

        let desc= document.createElement('p');
        desc.setAttribute('class','desc')
        desc.innerText= forecast.list[i].weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc)
        document.querySelector('.templist').appendChild(hourR);
}
}

function dayForecast(forecast){
    document.querySelector('.weekF').innerHTML=''
    for (let i = 8; i < forecast.list.length; i+=8) {
        console.log(forecast.list[i]);
        let div= document.createElement('div');
        div.setAttribute('class','dayF');
        
        let day= document.createElement('p');
        day.setAttribute('class','date')
        day.innerText= new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/Kolkata');
        div.appendChild(day);

        let temp= document.createElement('p');
        temp.innerText= Math.floor((forecast.list[i].main.temp_max - 273))+ ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273))+ ' °C';
        div.appendChild(temp)

        let description= document.createElement('p');
        description.setAttribute('class','desc')
        description.innerText= forecast.list[i].weather[0].description;
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div)
    }
} 