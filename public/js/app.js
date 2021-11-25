console.log("Client side js file is loaded!");


// fetch(`http://localhost:3000/weather?address=!`)
// .then(res => res.json())
// .then(data => {
//     if(data.error)
//         console.error(data.error);
//     else{
//         console.log(data.location);
//         console.log(data.forecast);

//     }
// });

const weatherForm = document.querySelector('form');
const searchEl = document.querySelector("input");
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const location = searchEl.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';


    if(!location){
        messageOne.textContent = '';
        return messageTwo.textContent = 'Provide the location';
    } 

    fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
        if(data.error) {
            messageOne.textContent ='';
            messageTwo.textContent = data.error;
        }
        else {
            messageOne.textContent = data.location + '' + data.forecast;

            console.log(data.location);
            console.log(data.forecast);
        }
        
    });
});

