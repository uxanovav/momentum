const time = document.getElementById('time');
const currentDate = document.getElementById('date');
const greeting = document.getElementById('greeting');
const userName = document.getElementById('name');
const task = document.getElementById('task');
const chbgButton = document.getElementById('change-bg-button');
const chqtButton = document.getElementById('change-qoute-button');
let bgCounter = '';
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const quotesText = document.querySelector('.quotes-text');



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
    bgCounter = date.getHours();
    console.log(bgCounter);
    changeBg();
    setTimeout(changeBgCounter, 3600000);
}

function changeBg() {
    if (bgCounter >= 0 && bgCounter < 6) {
        document.body.style.backgroundImage = `url('./assets/images/${bgCounter}.jpg')`;
        greeting.textContent = "Good Night,"; 
    } else if (bgCounter >= 6 && bgCounter < 12) {
        document.body.style.backgroundImage = `url('./assets/images/${bgCounter}.jpg')`;
        greeting.textContent = "Good Morning, ";
    } else if (bgCounter >= 12 && bgCounter < 18) {
        document.body.style.backgroundImage = `url('./assets/images/${bgCounter}.jpg')`;
        greeting.textContent = "Good Afternoon," ;
    } else if (bgCounter >= 18 && bgCounter <= 23) {
        document.body.style.backgroundImage = `url('./assets/images/${bgCounter}.jpg')`;
        greeting.textContent = "Good Evening,";
    }
}

chqtButton.addEventListener('click', getQuotes);

chbgButton.addEventListener('click', function (e) {
    if (bgCounter < 24) {
        bgCounter++;
        changeBg();
    }
    if (bgCounter === 24) {
        bgCounter = 0;
        changeBg();
    }
});



function setName(e) {
    if (e.type === 'keypress') {
        if (e.which === 13 || e.keyCode === 13) {
            if (e.target.innerText === '') {
                e.target.innerText = localStorage.getItem('name');
            }
            localStorage.setItem('name', e.target.innerText);
            userName.blur();
        }
    } else {
        if (e.target.innerText === '') {
            e.target.innerText = localStorage.getItem('name');
        }
        localStorage.setItem('name', e.target.innerText);
    }
}

function setTask(e) {
    if (e.type === 'keypress') {
        if (e.which === 13 || e.keyCode === 13) {
            if (e.target.innerText === '') {
                e.target.innerText = localStorage.getItem('task');
            }
            localStorage.setItem('task', e.target.innerText);
            task.blur();
        }
    } else {
        if (e.target.innerText === '') {
            e.target.innerText = localStorage.getItem('task');
        }
        localStorage.setItem('task', e.target.innerText);
    }
}

function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which === 13 || e.keyCode === 13) {
            if (e.target.innerText === '') {
                e.target.innerText = localStorage.getItem('city');
            }
            localStorage.setItem('city', e.target.innerText)
            getWeather();
            city.blur();
        }
    } else {
        if (e.target.innerText === '') {
            e.target.innerText = localStorage.getItem('city');
        }
        localStorage.setItem('city', e.target.innerText)
        getWeather();
    }
}


function getCity() {
    if (localStorage.getItem('city') === null) {
        localStorage.setItem('city', 'Ulyanovsk');
    }
    city.textContent = localStorage.getItem('city');
}

function getName() {
    if (localStorage.getItem('name') === null) {
        localStorage.setItem('name', '[Enter your name]');
    }
    userName.textContent = localStorage.getItem('name');
}


function getTask() {
    if (localStorage.getItem('task') === null) {
        localStorage.setItem('task', '[Enter your focus]');
    }
    task.textContent = localStorage.getItem('task');
}

userName.addEventListener('keypress', setName);
userName.addEventListener('blur', setName);
userName.addEventListener('click', function (ev) {
    ev.target.innerText = ' ';
})
task.addEventListener('keypress', setTask);
task.addEventListener('blur', setTask);
task.addEventListener('click', function (ev) {
    ev.target.innerText = ' ';
})
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', function (ev) {
    ev.target.innerText = ' ';
})

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=158ec464b7098aee233a474045e7a343&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `Temp - ${data.main.temp}°C `;
    wind.textContent = `Wind-speed - ${data.wind.speed} meter/sec `;
    humidity.textContent = `Humidity - ${data.main.humidity} %`;
    weatherDescription.textContent = data.weather[0].description;
}

async function getQuotes() {
    const url = `https://api.chucknorris.io/jokes/random`;
    const res = await fetch(url);
    const data = await res.json();
    quotesText.textContent = `"${data.value}"`;
}


changeBgCounter();
showTime();
getName();
getTask();
getCity();
getWeather();
getQuotes();