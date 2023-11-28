

var timeInputs = null
var scrollAreas = null
    
var spanHeight = null
    
var hourIndex = 0
var minuteIndex = 0
var secondIndex = 0

document.addEventListener('DOMContentLoaded', function() {
    timeInputs = document.querySelectorAll('.time-input')
    scrollAreas = document.querySelectorAll('.scroll-area')

    drawInput()
   
    
    
    var numberSpan = timeInputs[0].querySelector('span');
    if(numberSpan) {
        spanHeight = numberSpan.offsetHeight;
        console.log("span height: ", spanHeight)
    }

    updateWheel()

    var goButton = document.querySelector('#go-button');
    if(goButton) {
        goButton.addEventListener('click', function() {
            const startTimerEvent = new CustomEvent('startTimer', {
                detail: { message: 'Hello from File 2' }
            });
            document.dispatchEvent(startTimerEvent);
        });
    }
    

    
});


function drawInput() {
    
    timeInputs.forEach((input, index) => {
        var limit = 0
        switch(index) {
            case 0:
                limit = 24
                break;
            case 1:
            case 2:
                limit = 60
                break;
        }

        for (let i = 0; i < limit; i++) {
            const span = document.createElement('span');
            
            span.textContent = i.toString().padStart(2, '0');
            input.appendChild(span);
        }

    })

    scrollAreas.forEach( (area, index) => {
        area.addEventListener('wheel', async (event) => {
            var direction = 0

            if(event.deltaY > 0) {
                direction = 1
            } else if(event.deltaY < 0) {
                direction = -1
            }

            switch(event.target.id) {
                case "hour-select-container":
                    hourIndex = Math.max(0, Math.min(hourIndex+direction, 23));
                    break;
                case "minute-select-container":
                    minuteIndex = Math.max(0, Math.min(minuteIndex+direction, 59));
                    break;
                case "second-select-container":
                    secondIndex = Math.max(0, Math.min(secondIndex+direction, 59));
                    break;
            }

            updateWheel();

            console.log(hourIndex + " hours     " + minuteIndex + " minutes     " + secondIndex + " seconds     ")

        });
    })
        

  
}

function updateWheel() {
    timeInputs.forEach( (input, index) => {
        var numberIndex
        switch(index) {
            case 0:
                numberIndex = hourIndex
                break;
            case 1:
                numberIndex = minuteIndex
                break;
            case 2:
                numberIndex = secondIndex
                break;
        }

        input.style.transform = `translateY(-${numberIndex * spanHeight}px)`;

        const spans = input.querySelectorAll('span');
        spans.forEach( (span, index) => {
            var distance = Math.abs( index - numberIndex )

            if(distance == 0) {
                span.style.textShadow = "0px 0px 3px rgba(255,255,255,0.5)"
                span.style.opacity = "1"
            }else if (distance <= 3){
                span.style.textShadow = "none"
                span.style.opacity = 1-distance*0.25
                var scale = 1-distance*0.07
                span.style.transform = 'scale('+scale+')'
            } else {
                span.style.opacity = "0"
            }
        })
    })
}