const request = require('request');

// make a request to get the temperature of a city, and also get the lon and lat
const weatherData = (cityName,callback) =>{
    const apiKey = '8ebec1d63afe7ac6396dec39fbc83b7e';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+apiKey+'&units=metric'+'&lang=en';
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to the weather service. check your internet connection!',undefined);
        }else if(response.body.cod == '404' || response.body.message == 'city not found'){
            callback('Unable to find location provided.',undefined);
        }
        else{
            callback(undefined,
                result = {
                    location:cityName,
                    description:response.body.weather[0].description,
                    temperature:response.body.main.temp+'°C',
                    longitude:response.body.coord.lon,
                    latitude:response.body.coord.lat
                }
            );
        }
    })
}

module.exports = weatherData;