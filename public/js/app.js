const form = document.querySelector('form');
const search = document.querySelector('input');
const div = document.querySelector('.weather-data');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!search.value){
        return div.innerHTML = '<p>you must provide the location</p>';
    }

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+search.value+'&appid=8ebec1d63afe7ac6396dec39fbc83b7e&units=metric'+'&lang=en')
    .then((response)=>{
        response.json().then((data)=>{
            if(data.cod == '404'){
                return div.innerHTML = '<p>Unable to find location</p>';
            }

            fetch('https://api.opencagedata.com/geocode/v1/json?q='+data.coord.lat+'+'+data.coord.lon+'&key=17938df38e014a19852cca69df9e0595')
            .then((response)=>{
                response.json().then((result)=>{
                    if(result.status.code != 200){
                        return div.innerHTML = '<p>error occured';
                    }
                    div.innerHTML = '<p>Location: '+result.results[0].formatted+'</p>'+
                                    '<p>Temperature: '+data.main.temp+'°C</p>'+
                                    '<p>Description: '+data.weather[0].description+'</p>';
                })
            })
        });
    });
});