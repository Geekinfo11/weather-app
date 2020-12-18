const request = require('request');

// this function return the full location based on longitude and latitude.
const fullLocation = (longitude,latitude,callback)=>{
    const geoApiKey = '17938df38e014a19852cca69df9e0595';
    const geoUrl = 'https://api.opencagedata.com/geocode/v1/json?q='+latitude+'+'+longitude+'&key='+geoApiKey;
    request({url:geoUrl,json:true},(error,response)=>{
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