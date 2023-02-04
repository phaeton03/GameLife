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

function stopGame() {
  gameIsRunning = false;
  buttonStartStop.innerHTML = "Start";
  // При клике на кнопке `Stop` остановить таймер
  clearInterval(timer);
}
function startGame() {
  // При клике по кнопке старт
  // - поменять надпись на `Stop`
  gameIsRunning = true;
  buttonStartStop.innerHTML = "Stop";
  // - запустить таймер для обновления поля
  timer = setInterval(() => {
    // В таймере обновления поля
    // - посчитать новое состояние поля
    // - отрисовать новое состояние поля
    // - проверить, что есть живые клетки
    // - если живых клеток нет
    //    - остановить таймер
    //    - вывести сообщение
    calculateNewGeneration(field.getFieldContext(fieldCanvas));
    if (!isAnyoneAlive()) {
      alert("Death on the block");
      stopGame();
    }
  }, 1000);
}


