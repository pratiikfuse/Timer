// take all thre inputs value when  user clicks on set button

const setTimerButton = document.getElementById("set-timer");
const timerContainer = document.getElementById("timers-container");
let audio = new Audio("./alarm.mp3");

let timerCount = 0;

// console.log(setTimerButton);

setTimerButton.addEventListener("click", getAllInputs);

function getAllInputs(e) {
  let hours = document.getElementById("h").value;
  let minutes = document.getElementById("m").value;
  let seconds = document.getElementById("s").value;

  if (hours.length == 0 || minutes.length == 0 || seconds.length == 0) {
    alert("invalid input");
    return;
  }
  //   console.log(hours, minutes, seconds);
  hours = parseInt(hours);
  minutes = parseInt(minutes);
  seconds = parseInt(seconds);

  if (validateInputs(hours, minutes, seconds)) {
    createTimer(hours, minutes, seconds);
  } else {
    alert("invalid input");
  }
}

function timer() {}

function createTimer(hours, minutes, seconds) {
  document.getElementById("no-timers").style.display = "none";
  timerCount++;
  let div = document.createElement("div");
  div.className = "timer-div";
  let p = document.createElement("p");

  let h4 = document.createElement("h4");
  // h4.innerText = `${hours}:${minutes}:${seconds}`;
  let deleteButton = document.createElement("button");

  deleteButton.className = "buttons";

  div.append(p, h4, deleteButton);
  // lms
  if (seconds == 0 && minutes == 0 && hours != 0) {
    hours--;
    minutes = 59;
  } else if (seconds == 0 && minutes != 0) {
    //   console.log("here");
    minutes--;
    seconds = 59;
  }
  if (seconds == 0 && (minutes != 0 || hours != 0)) {
    seconds = 59;
  }
  h4.innerText = `${hours}:${minutes}:${seconds}`;

  if (seconds != 0) {
    seconds--;
  }

  // l;m

  let timeOutid = setInterval(() => {
    if (seconds == 0 && minutes == 0 && hours != 0) {
      hours--;
      minutes = 59;
    } else if (seconds == 0 && minutes != 0) {
      //   console.log("here");
      minutes--;
      seconds = 59;
    }
    if (seconds == 0 && minutes == 0 && hours == 0) {
      //   console.log("timer stopped");
      div.removeChild(p);
      div.removeChild(h4);
      div.removeChild(deleteButton);
      let h2 = document.createElement("h2");
      h2.innerText = "Timer is Up!";
      div.appendChild(h2);
      deleteButton.innerText = "stop";
      div.appendChild(deleteButton);
      div.classList.remove("timer-div");
      div.className = "timer-stop";

      audio.play();
      clearInterval(timeOutid);
    }
    if (seconds == 0 && (minutes != 0 || hours != 0)) {
      seconds = 59;
    }
    h4.innerText = `${hours}:${minutes}:${seconds}`;

    seconds--;
  }, 1000);
  p.innerText = "Time Left :";
  deleteButton.innerText = "delete";
  timerContainer.appendChild(div);

  deleteButton.addEventListener("click", (e) => {
    clearInterval(timeOutid);
    audio.pause();
    let target = e.target.parentNode;
    target.remove();
    timerCount--;
    if (timerCount == 0) {
      document.getElementById("no-timers").style.display = "block";
    }
  });
}
function stopTimer() {}

function validateInputs(hours, minutes, seconds) {
  if (hours < 0 || minutes > 59 || minutes < 0 || seconds > 59 || seconds < 0) {
    return false;
  } else {
    return true;
  }
}
