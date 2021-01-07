const express = require('express');
const path = require('path');
const hbs = require('hbs');
const weatherData = require('./utils/1-weather-data');
const fullLocation = require('./utils/2-full-location');

const port = process.env.PORT || 3000;

const app = express();

// Setup the path for the public directory
const publicDirectoryPath = path.join(__dirname,'../public');

// Setup the path for the views directory
const viewsPath = path.join(__dirname, '../templates/views');

// Setup the path for the partials directory
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

// here we're serving static files inside the public directory
app.use(express.static(publicDirectoryPath));

//here we're serving dynamic files inside the views directory
app.set('view engine','hbs');

// Remember that if we change the name of the views directory, then we should setup the path: app.set('views',newDirectoryPath)
app.set('views', viewsPath);

app.get('',(req, res)=>{
    res.render('index',{
       title:'Weather',
    });
});

// app.get('/about',(req, res)=>{
//     res.render('about',{
//        title:'About me',
//        name:'Hassan'
//     });
// });

app.get('/weather',(req, res)=>{
    if(req.query.address){
        return weatherData(req.query.address, (error, response)=>{
            if(error){
                return res.send({error:error});
            }
            fullLocation(response.longitude, response.latitude,(error,fullLocation)=>{
                if(error){
                    return res.send({error:error});
                }

                res.send({
                    location:response.location,
                    description:response.description,
                    temperature:response.temperature,
                    windSpeed:response.windSpeed
                });
            });

        })
    }
    
    res.send({error:'you must provide the address'});
})

app.get('*', (req, res)=>{
    res.render('404-page', {
        title:'404',
        errorMsg:'Page not found'
    });
});

app.listen(port,()=>{
    console.log('server is up on port '+port);
})