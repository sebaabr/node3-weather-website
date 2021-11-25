const request = require('postman-request');

// import fetch from "node-fetch";
// import request from 'postman-request';

const forecast = async function(latitude, longitude, callback){
    

        const url = `http://api.weatherstack.com/current?access_key=30e038799fd6a06bd64f9cb3903c917b&query=${latitude},${longitude}&units=m`;
        request({ url, json:true }, (error, {body}) => {
            // console.log(responce);
            if(error){
                callback('Unable to connect to location!', undefined);
            } else if(body.error) {
                callback('Invalid data!', undefined);
            }
            else{
                // console.log(responce);
                callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out, but it feels like ${body.current.feelslike} degrees.`);
            }
        });
    /*
    try{
        const res = await fetch(`http://api.weatherstack.com/current?access_key=30e038799fd6a06bd64f9cb3903c917b&query=${latitude},${longitude}&units=m`);
        const data = await res.json();
        console.log('***************');
        console.log(data);

        if(data.success === false)
            throw new Error('incorrect data!');
    
        callback(`${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out, but it feels like ${data.current.feelslike} degrees. `);
    }
    catch(err){
        console.error(err.message);
    }
    */
};

module.exports = forecast;

// export default forecast;