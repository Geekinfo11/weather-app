const form = document.querySelector('form');
const search = document.querySelector('input');
const div = document.querySelector('.weather-data');
const day = document.querySelector('.day');
const date = document.querySelector('.date');
const city = document.querySelector('.location');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const error = document.querySelector('.error-msg');
const errorDiv = document.querySelector('.error-div')



//
const weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const todayIndex = new Date().getDay();
const today = new Date().getDate();
const currentMonth = new Date().getMonth();
day.innerHTML = weekdays[todayIndex-1];
date.innerHTML = today+'  '+months[currentMonth];



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!search.value){
        errorDiv.classList.add('alert')
        return errorDiv.innerHTML = '<p>you must provide the location</p>';
    }

    fetch('/weather?address='+search.value)
    .then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                errorDiv.classList.add('alert');
                return errorDiv.innerHTML = '<p>'+data.error+'</p>';
            }

            errorDiv.innerHTML = '';
            errorDiv.classList.remove('alert');
            city.innerHTML = data.location
            temperature.innerHTML = data.temperature+'<sup>o</sup>C'
            wind.innerHTML = data.windSpeed+'km/h'
        });
    });
});