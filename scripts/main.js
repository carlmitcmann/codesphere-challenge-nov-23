var timerActive = false

var timerContainer = document.getElementById("timer-container")
var inputContainer = document.getElementById("input-container")
var resetButton = null
var goButton = document.getElementById("go-button")

/**
 * start the timer
 */ let seconds = 0; // timer seconds
    let timer
document.addEventListener('startTimer', function(event) {
    resetButton = document.getElementById("reset-button")
    
    var inputData = event.detail.message

    seconds += inputData.hours * 60 * 60
    seconds += inputData.minutes * 60
    seconds += inputData.seconds

    // start timer
    timer = setInterval(countdown, 1000); // Calls countdown function every 1000 milliseconds (1 second)
    
    // switch from input view to timer view
    toggleTimerView()
    
});




document.addEventListener('DOMContentLoaded', function() {
    drawClock([0,0,0,0,0])

    if( resetButton != null) {
        resetButton.addEventListener('click', function() {
            toggleTimerView()
            seconds = 0
        });
    }
    
});

function toggleTimerView() {
    timerActive = !timerActive
    if(timerActive) {
        inputContainer.classList.add("opacity-0")

        timerContainer.classList.add("opacity-1")


        

        
        goButton.style.display = "none"
    } else {
        inputContainer.classList.remove("opacity-0")

        timerContainer.classList.remove("opacity-1")

        
        goButton.style.display = "block"
    }
}

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

    if (seconds >= 0) {
        redrawClock(timeArray)
        seconds--;
    } else {
        console.log('Countdown finished!');
        clearInterval(timer);
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