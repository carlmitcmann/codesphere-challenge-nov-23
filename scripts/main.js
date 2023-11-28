var timerActive = false

var timerContainer = document.getElementById("timer-container")
var inputContainer = document.getElementById("input-container")

document.addEventListener('startTimer', function(event) {
    console.log('Event received in File 1:', event.detail.message);
    
});




document.addEventListener('DOMContentLoaded', function() {
    if(timerActive) {
        timerContainer.style.opacity = 1
        inputContainer.style.opacity = 0
    } else {
        timerContainer.style.opacity = 0
        inputContainer.style.opacity = 1
    }
    drawClock([0,0,0,0,0])
    const timer = setInterval(countdown, 1000); // Calls countdown function every 1000 milliseconds (1 second)
});

function drawClock(numbers) {
    if(numbers.length!=5) {
        return
    }
    
    const timerDigits = document.querySelectorAll('.timerDigit');
    timerDigits.forEach((digit, index) => {
        var layout = numberLayouts[numbers[index]]
        for (let i = 0; i < 15; i++) {
            const span = document.createElement('span');
            if(layout[i] == 0) {
                span.classList.add("inactive")
            }
            const value = index * 15 + i;
            span.textContent = value.toString().padStart(2, '0');
            digit.appendChild(span);
        }
    });
}

function redrawClock(numbers) {
    if (numbers.length !== 5) {
        return;
    }

    const timerDigits = document.querySelectorAll('.timerDigit');
    
    const timerDigitIndex = Math.floor(numbers[4] / 15); // Get the timerDigit index based on currentSecond
    const spanIndex = numbers[4] % 15; // Get the index within the timerDigit

    timerDigits.forEach((digit, index) => {
        var layout = numberLayouts[numbers[index]];
        const spans = digit.querySelectorAll('span');
        spans.forEach((span, i) => {
            if (layout[i] === 0) {
                span.classList.add('inactive');
            } else {
                span.classList.remove('inactive');
            }

            if(index == timerDigitIndex && i == spanIndex) {
                span.classList.add('currentSecond')
            } else {
                span.classList.remove('currentSecond')
            }
        });
    });
}


/**
 * Timer function
 */
let seconds = 86400; // 24 hours in seconds

function countdown() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    const timeArray = [
        parseInt(formattedHours.charAt(0)), // hourDigit1
        parseInt(formattedHours.charAt(1)), // hourDigit2
        parseInt(formattedMinutes.charAt(0)), // minuteDigit1
        parseInt(formattedMinutes.charAt(1)), // minuteDigit2
        parseInt(formattedSeconds) // seconds
    ];

    //console.log(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`);

    if (seconds > 0) {
        redrawClock(timeArray)
        seconds--;
    } else {
        clearInterval(timer);
        console.log('Countdown finished!');
    }
}


/**
 * Timer inactive/active sheet
 */
var numberLayouts = [
    [1, 1, 1, 
     1, 0, 1, 
     1, 0, 1, 
     1, 0, 1, 
     1, 1, 1], // 0
     
    [1, 1, 0, 
     0, 1, 0, 
     0, 1, 0, 
     0, 1, 0, 
     1, 1, 1], // 1
     
    [1, 1, 1, 
     0, 0, 1, 
     1, 1, 1, 
     1, 0, 0, 
     1, 1, 1], // 2
     
    [1, 1, 1, 
     0, 0, 1, 
     1, 1, 1, 
     0, 0, 1, 
     1, 1, 1], // 3
     
    [1, 0, 1, 
     1, 0, 1, 
     1, 1, 1, 
     0, 0, 1, 
     0, 0, 1], // 4
     
    [1, 1, 1, 
     1, 0, 0, 
     1, 1, 1, 
     0, 0, 1, 
     1, 1, 1], // 5
     
    [1, 1, 1, 
     1, 0, 0, 
     1, 1, 1, 
     1, 0, 1, 
     1, 1, 1], // 6
     
    [1, 1, 1, 
     0, 0, 1, 
     0, 0, 1, 
     0, 0, 1, 
     0, 0, 1], // 7
     
    [1, 1, 1, 
     1, 0, 1, 
     1, 1, 1, 
     1, 0, 1, 
     1, 1, 1], // 8
     
    [1, 1, 1, 
     1, 0, 1, 
     1, 1, 1, 
     0, 0, 1, 
     1, 1, 1] // 9
];