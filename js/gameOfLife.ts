import * as field from "./field"

//let fieldState;
const DEFAULT_SIZE_X = 1000;
const DEFAULT_SIZE_Y = 1000;
const fieldCanvas = document.querySelector(".field") as HTMLCanvasElement;
document.addEventListener("DOMContentLoaded", function () {
  field.createField(DEFAULT_SIZE_X, DEFAULT_SIZE_Y);
  const buttonClear = document.querySelector(".btn__clear");

  if (buttonClear) {
    buttonClear.addEventListener("click", field.clearField);
  }
});
fieldCanvas.addEventListener("click", (ev) => field.updateFieldCell(ev));

// function gameOfLife(sizeX: number, sizeY: number, gameElement: HTMLElement): void {
//   fieldState = Array.from({length: sizeY}).map(() =>
//     Array.from({length: sizeX}).fill(0)
//   );
// }


