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
        messageTwo.textContent = '';
        return messageTwo.textContent = 'Provide the location';
    } 

    fetch(`/weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
        if(data.error) {
            messageOne.textContent ='';
            messageTwo.textContent = data.error;
        }
        else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;

            // console.log(data.location);
            // console.log(data.forecast);
        }
        
    });
});

