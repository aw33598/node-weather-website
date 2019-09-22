const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if(input.value === '') {
        messageOne.textContent = 'Please provide a location';
    } else {
        messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';
        fetch('http://localhost:5000/weather?address='+ input.value)
        .then(res => {
            res.json()
            .then(data => {
                if(data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.timezone;
                    messageTwo.textContent = data.placeName + ': It\'s currently ' + data.temp + ' degrees out there and ' + data.chance + '% chance of rain';
                }    
            });
        });
    }
});