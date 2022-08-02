const climber = document.querySelector(".climber");
const hanglers = document.querySelectorAll(".hangler");
const weather = document.querySelector(".no-snow");
const background = document.querySelector(".background");
let dropCount = 0
let count = -1;
let flagBack = true;
let flagFirstSnow = true;
// let flagDangerSnow = true;
let pos = 0;
const jumpSound = new Audio("audio/jump.mp3");
const windSound = new Audio("audio/wind.mp3");
const winSound = new Audio("audio/win.mp3");
const birdSound = new Audio("audio/birds.mp3");
const drop = new Audio("audio/drop.mp3");
const shot = new Audio("audio/shot.mp3");
const diedSound = new Audio("audio/died.mp3");

const snowBall1 = document.createElement("img");
snowBall1.src = "img/snowBall.png";
const snowBall2 = document.createElement("img");
snowBall2.src = "img/snowBall.png";
const snowBall3 = document.createElement("img");
snowBall3.src = "img/snowBall.png";

function restart() {
  let conf = confirm("Ура, вы на вершине! Хотите пройти путь заново?");
  if (conf) window.location.reload();
  else {
    if (!alert("Похоже, что всё-таки выбора у вас нет.."))
      window.location.reload();
  }
}
alert("Давным давно, на далёкой далёкой горе⛰️.....");
birdSound.play();
document.addEventListener("keydown", (event) => {
  if (dropCount === 2) {
    dropCount = 0
    alert('Возможно, чтобы сделать два шага вперёд, нужно сделать один шаг назад)')
   }
  if (event.code == "KeyX") {
    rotateClimber(pos);
    jumpSound.play();
    count > 8 ? count : count++;
    hanglers[count].appendChild(climber);
    if (count > 1) {
      birdSound.pause();
      windSound.play();
    }
    if (count ===1 ) background.style.background = "rgb(45, 94, 148)";
    if (count === 2) {
      
      
      weather.classList.replace("no-snow", "snow");
      weather = document.querySelector(".snow");

      hanglers[count].appendChild(climber);
    } else if (count === 3 && flagFirstSnow) {
      snowBall1.className = "enemy1";
      snowBall2.className = "enemy2";

      flagFirstSnow = false;
      background.prepend(snowBall1);
      background.prepend(snowBall2);
    } else if (count === 6 /*&& flagDangerSnow*/) {
      background.style.background = "rgb(74, 6, 6)";
      weather.style.animation = "snow 1s linear infinite";
      snowBall3.className = "enemy3";
      background.prepend(snowBall3);
     // flagDangerSnow = false;
    } else if (count === 8 && flagBack) {
      
      
      
      Count++
      drop.play();
      setTimeout(() => {
        hanglers[count - 7].appendChild(climber);
      }, 100);
      setTimeout(() => {
        count = count - 7;
      }, 110);
      
    } else if (count === 9) {
      const finish = document.createElement("img");
      finish.src = "img/win.gif";
      finish.className = "finish";
      windSound.pause();
      document.body.appendChild(finish);
      winSound.play();

      setTimeout(restart, 500);
    }
  } else if (event.code == "KeyZ") {
    rotateClimber(pos);
    jumpSound.play();
    count === 0 ? count : count--;
    hanglers[count].appendChild(climber);
    if (count === 6) {
      flagBack = false;
    }
  }
});

const rotateClimber = (position) => {
  if (position % 2 === 0) {
    pos++;
    climber.style.transform = "rotate(30deg)";
  } else {
    pos--;
    climber.style.transform = "rotate(-30deg)";
  }
};
let climberPos = {
  top: 0,
  left: 0,
};
let snowBall1Pos = {
  top: 1,
  left: 1,
};
let snowBall2Pos = {
  top: 1,
  left: 1,
};
let snowBall3Pos = {
  top: 1,
  left: 1,
};
const getBallPos = (snowBall, snowBallPos) => {
  const pos = snowBall.getBoundingClientRect();
  snowBallPos.top = Math.floor(pos.top) + window.pageYOffset;
  snowBallPos.left = Math.floor(pos.left) + window.pageXOffset;
};

const getClimberPos = () => {
  const pos = climber.getBoundingClientRect();
  climberPos.top = Math.floor(pos.top) + window.pageYOffset;
  climberPos.left = Math.floor(pos.left) + window.pageXOffset;
};

const checkCrash = (snowBall, snowBallPos) => {
  if (
    climberPos.left < snowBall.width + snowBallPos.left &&
    climberPos.left + climber.width > snowBallPos.left &&
    climberPos.top < snowBall.height + snowBallPos.top &&
    climberPos.top + climber.height > snowBallPos.top
  ) {
    climber.remove();
    snowBall.remove();
    const crash = document.createElement("img");
    crash.src = "img/crash3.gif";
    crash.style.width = "4vw";
    crash.style.height = "14vh";
    hanglers[count].appendChild(crash);
    clearInterval(climberInterval);
    clearInterval(ballInterval1);
    clearInterval(checkInterval1);
    clearInterval(ballInterval2);
    clearInterval(checkInterval2);
    clearInterval(ballInterval3);
    clearInterval(checkInterval3);
    shot.play();
    diedSound.play();
    setTimeout(died, 80);
  }
};

let ballInterval1 = setInterval(getBallPos, 1, snowBall1, snowBall1Pos);
let ballInterval2 = setInterval(getBallPos, 1, snowBall2, snowBall2Pos);
let ballInterval3 = setInterval(getBallPos, 1, snowBall3, snowBall3Pos);

let climberInterval = setInterval(getClimberPos, 1);

let checkInterval1 = setInterval(checkCrash, 1, snowBall1, snowBall1Pos);
let checkInterval2 = setInterval(checkCrash, 1, snowBall2, snowBall2Pos);
let checkInterval3 = setInterval(checkCrash, 1, snowBall3, snowBall3Pos);
const died = () => {
  if (!alert("Упс, YOU DIED! Попробуйте ещё раз 🤗")) window.location.reload();
};
