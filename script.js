
let seconds = 0
let minutes = 0
let hour = 0
let milisseconds = 1000
let savedTime = []
let startTime = null
let stopTime = null

const timer = document.querySelector('.timer')
const stopBtn = document.querySelector('#stop')
const startBtn = document.querySelector("#start")
const clearBtn = document.querySelector('#clearTime')
const saveBtn = document.querySelector('#save')
const savedTimeDiv = document.querySelector('.saved-time-body')
const savedTimeContainer = document.querySelector('.saved-time')

if(savedTime.length < 1 ) {
    savedTimeContainer.style.display = 'none'
}


function getHour() {
    const date = new Date()
    let ghour = date.getHours()
    let gminutes = date.getMinutes()
    let gseconds = date.getSeconds()
    return `${ghour}:${gminutes}:${gseconds}`

}

function renderTime() {
    seconds++
    if (seconds === 60) {
        minutes++
        seconds = 0
    }
    if (minutes === 60) {
        hour++
        minutes = 0
    }
    const string = `${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    timer.innerHTML = string
}


function start() {
    let counter = setInterval(renderTime, milisseconds)
    startTime = getHour()
    stopBtn.addEventListener('click', () => {
        clearInterval(counter)
        stopTime = getHour()
    })
}

function clearTimer() {
    if (window.confirm("tem certeza que deseja zerar o cronômetro?")) {
        seconds = -1
        minutes = 0
        hour = 0
        renderTime()

    }
}

function renderSavedTime(data = []) {
    savedTimeContainer.style.display = 'flex'
    let html = data.map((item, index) => {
        let string = `<div class="saved-time-item"><div> ${item.initialHour} </div> <div>${item.hour < 10 ? '0' + item.hour : item.hour} : ${item.minutes < 10 ? '0' + item.minutes : item.minutes} : ${item.seconds < 10 ? '0' + item.seconds : item.seconds}</div> <div>${item.stoppedtime}</div></div>`
        return string
    }).join('')
    savedTimeDiv.innerHTML = html
}

function savedTimeFunction() {

    savedTime.push({ hour, minutes, seconds, initialHour: startTime, stoppedtime: stopTime })
    renderSavedTime(savedTime)
}

startBtn.addEventListener('click', start)
clearBtn.addEventListener('click', clearTimer)
saveBtn.addEventListener('click', savedTimeFunction)



