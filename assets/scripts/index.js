const time = document.getElementById('time');
const currentDate = document.getElementById('date');
const greeting = document.getElementById('greeting');
const userName = document.getElementById('name');
const task = document.getElementById('task');
const chbgButton = document.getElementById('change-bg-button');
let bgCounter = '';
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

function showTime() {
    let date = new Date;
    let month = date.getMonth();
    switch (month) {
        case 0:
            month = 'January';
            break;
        case 1:
            month = 'February';
            break;
        case 2:
            month = 'March';
            break;
        case 3:
            month = 'April';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'June';
            break;
        case 6:
            month = 'July';
            break;
        case 7:
            month = 'August';
            break;
        case 8:
            month = 'September';
            break;
        case 9:
            month = 'October';
            break;
        case 10:
            month = 'November';
            break;
        case 11:
            month = 'December';
            break;
    }
    let dayWeek = date.getDay();
    switch (dayWeek) {
        case 1:
            dayWeek = 'Monday';
            break;
        case 2:
            dayWeek = 'Tuesday';
            break;
        case 3:
            dayWeek = 'Wednesday';
            break;
        case 4:
            dayWeek = 'Thursday';
            break;
        case 5:
            dayWeek = 'Friday';
            break;
        case 6:
            dayWeek = 'Saturday';
            break;
        case 7:
            dayWeek = 'Sunday';
            break;
    }
    let day = date.getDate();
    let hours = date.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }
    let minuts = date.getMinutes();
    if (minuts < 10) {
        minuts = '0' + minuts;
    }
    let seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    currentDate.innerHTML = `${day} ${month} ${dayWeek}`;
    time.innerHTML = `${hours}:${minuts}:${seconds}`;
    setTimeout(showTime, 1000);
}

function changeBgCounter() {
    let date = new Date;
    if (date.getHours() > 6 && date.getHours() < 12) {
        bgCounter = 1;
    } else if (date.getHours() > 12 && date.getHours() < 18) {
        bgCounter = 2;
    } else if (date.getHours() > 18 && date.getHours() < 24) {
        bgCounter = 3;
    } else if (date.getHours() > 0 && date.getHours() < 6) {
        bgCounter = 4;
    }
    changeBg();
    setTimeout(changeBgCounter, 1440000);
}

function changeBg() {
    if (bgCounter === 1) {
        document.body.style.backgroundImage = "url('./assets/images/morning.jpg')";
        document.body.style.color = "rgb(252, 237, 217)";
        greeting.textContent = "Good Morning ";
    } else if (bgCounter === 2) {
        document.body.style.backgroundImage = "url('./assets/images/noon.jpg')";
        greeting.textContent = "Good Afternoon ";
        document.body.style.color = "rgb(252, 237, 217)";
    } else if (bgCounter === 3) {
        document.body.style.backgroundImage = "url('./assets/images/evening.jpg')";
        greeting.textContent = "Good Evening ";
    } else if (bgCounter === 4) {
        document.body.style.backgroundImage = "url('./assets/images/night.jpg')";
        document.body.style.color = "white";
        greeting.textContent = "Good Night ";
    }
}



chbgButton.addEventListener('click', function(e) {
    console.log(bgCounter);
    if (bgCounter < 4) {
        bgCounter++;
        changeBg();
    }
    if (bgCounter === 4) {
        changeBg();
        bgCounter = 0;
    }
});

function setName(e) {
    if (e.type === 'keypress') {
        if (e.which === 13 || e.keyCode === 13) {
            localStorage.setItem('name', e.target.innerText);
            userName.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

function setTask(e) {
    if (e.type === 'keypress') {
        if (e.which === 13 || e.keyCode === 13) {
            localStorage.setItem('task', e.target.innerText);
            task.blur();
        }
    } else {
        localStorage.setItem('task', e.target.innerText);
    }
}

function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which === 13 || e.keyCode === 13) {
            getWeather();
            localStorage.setItem('city', e.target.innerText)
            city.blur();
        } else {
            localStorage.setItem('city', e.target.innerText)
        }
    }
}


function getCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = '[Enter your city]';
    } else {
        city.textContent = localStorage.getItem('city');
    }
}

function getName() {
    if (localStorage.getItem('name') === null) {
        userName.textContent = '[Enter your name]';
    } else {
        userName.textContent = localStorage.getItem('name');
    }
}

function getTask() {
    if (localStorage.getItem('task') === null) {
        task.textContent = '[Enter your task]';
    } else {
        task.textContent = localStorage.getItem('task');
    }
}

userName.addEventListener('keypress', setName);
userName.addEventListener('blur', setName);
task.addEventListener('keypress', setTask);
task.addEventListener('blur', setTask);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=158ec464b7098aee233a474045e7a343&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
}


getWeather()
changeBgCounter();
showTime();
getName();
getTask();
getCity();