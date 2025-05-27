let startTime = 0;
let elapsedTime = 0;
let interval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startstop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function updateDisplay() {
    const time = new Date(elapsedTime);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function startStop(){
    if (!running) {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        running = true;
        startStopBtn.textContent = 'Pause';
    } else{
        clearInterval(interval);
        running = false;
        startStopBtn.textContent = 'Start';
    }
}

function reset () {
    clearInterval(interval);
    running = false;
    elapsedTime = 0;
    updateDisplay();
    startStopBtn.textContent = 'Start';
    laps.innerHTML = ''; 
}

function recordLap(){
    if (!running) return;
    const lapTime = display.textContent;
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
    laps.prepend(li); 
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

updateDisplay();
