const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();

//Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static sirectory to serve
app.use(express.static(publicDir));

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'sabr'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'sabr'
    })
});

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'sabr',
        helpText: 'This in some helpful text'
    });
});



app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You need to provide the address!'
        });
    };

    const address = req.query.address;


    geocode(address, (error,{latitude, longitude, location} = {}) => {

        if(error){
            return res.send({ error});
        //    return console.log("could not find location");
        }
        else {
            forecast(latitude, longitude, (error, responce) => {
                if(error){
                    return res.send({ error});
                //   return  console.log('Could not find lication');
                } 
                res.send({
                    forecast: responce,
                    location,
                    address: req.query.address
                });
                    // console.log(location);
                    // console.log(responce);
            });
        }
    });

    
});

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: '404',
        name: 'sabr',
        message: 'Help article not found'
    });
});

app.get('*', (req, res)=>{
    res.render('error', {
        title: '404',
        name: 'sabr',
        message: 'Page not found'
    });
});




app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});