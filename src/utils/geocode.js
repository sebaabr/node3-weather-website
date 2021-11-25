const request = require('postman-request');

// import fetch from 'node-fetch';
// import request from 'postman-request';


const geocode = async (address, callback) =>{

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXNkMTEiLCJhIjoiY2t3OTIzbzBlMHpyOTJ2cGE2ZHMyamJ6ZSJ9.SmZvZWZq7adgpYRcjzy8IQ&limit=1`;

    request({ url, json: true}, (error, {body}) => {
        // console.log(responce);
        if(error){
            callback('Unable to connenct to location service!', undefined);
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search!', undefined);
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });

    /*
    try{
        const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXNkMTEiLCJhIjoiY2t3OTIzbzBlMHpyOTJ2cGE2ZHMyamJ6ZSJ9.SmZvZWZq7adgpYRcjzy8IQ&limit=1`);
        const data = await res.json();
        if(data.features.length === 0){
            throw new Error('No matching results')
        }

        console.log(data);

        callback({
            latitude: data.features[0].center[1],
            longitude: data.features[0].center[0],
            location: data.features[0].place_name,
        });

    } catch(err){
        callback('Unable to connect to location service! \n' + err.message);
    }
    */

};

module.exports = geocode;
// export default geocode;