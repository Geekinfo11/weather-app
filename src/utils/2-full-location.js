const request = require('request');

// this function return the full location based on longitude and latitude.
const fullLocation = (longitude,latitude,callback)=>{
    const geoApiKey = 'dc1854afd2524c4b86e2cc68e456cd4f';
    const geoUrl = 'https://api.opencagedata.com/geocode/v1/json?q='+latitude+'+'+longitude+'&key='+geoApiKey;
    request({url:geoUrl,json:true},(error,response)=>{
        console.log(response.body)
        if(error){
            callback('Unable to connect to the geocode service.check your internet connection');
        }
        else if(response.body.status.code == 400){
           callback('invalid coordinates longitude and latitude',undefined);
        }
        else{
            callback(undefined,
                response.body.results[0].formatted
            );
        }
    });
}

module.exports = fullLocation;