import * as field from "./field"
import {isAnyoneAlive} from "./fieldState";
import {calculateNewGeneration} from "./generation";
//let fieldState;
const DEFAULT_SIZE_X = 1000;
const DEFAULT_SIZE_Y = 1000;
const fieldCanvas = document.querySelector(".field") as HTMLCanvasElement;
const buttonStartStop = document.querySelector(".btn__start__stop") as HTMLElement;
let gameIsRunning = false;
let timer: NodeJS.Timeout;
document.addEventListener("DOMContentLoaded", function () {
  field.createField(DEFAULT_SIZE_X, DEFAULT_SIZE_Y);
  const buttonClear = document.querySelector(".btn__clear");

  if (buttonClear) {
    buttonClear.addEventListener("click", field.clearField);
  }
});
fieldCanvas.addEventListener("click", (ev) => field.updateFieldCell(ev));
buttonStartStop.addEventListener("click", () => {
  if (!gameIsRunning) {
    startGame();
  } else {
    stopGame();
  }
});

function stopGame() {
  gameIsRunning = false;
  buttonStartStop.innerHTML = "Start";
  // При клике на кнопке `Stop` остановить таймер
  clearInterval(timer);
}
function startGame() {
  gameIsRunning = true;
  buttonStartStop.innerHTML = "Stop";
  timer = setInterval(() => {
    calculateNewGeneration(field.getFieldContext(fieldCanvas));
    if (!isAnyoneAlive()) {
      alert("Death on the block");
      stopGame();
    }
  }, 1000);
}



