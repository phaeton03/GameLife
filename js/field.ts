export {createField, updateFieldCell, clearField, fieldCellState, fieldFillCellState}
import {Cell} from "./cell";
import {
  fieldCellState,
  fieldFillCellState,
  deleteFillFieldState,
  addFillFieldState,
  initFieldState
} from "./fieldState";

const cellSize = new Cell(20, 20);
const cellBorderSize = 0.5;
const EMPTY_STATE_COLOR = "white";
const FILL_STATE_COLOR = "black";

export const fieldStateMap = new Map([
  [0, (x: number, y: number, context: CanvasRenderingContext2D) => {
    addFillFieldState(x, y);
    context.fillStyle = FILL_STATE_COLOR;
  }],
  [1, (x: number, y: number, context: CanvasRenderingContext2D) => {
    deleteFillFieldState(x, y);
    context.fillStyle = EMPTY_STATE_COLOR;
  }]
]);

function createField(sizeX: number, sizeY: number): void {
  initFieldState(sizeX, sizeY);

  const field = document.querySelector(".field") as HTMLCanvasElement;
  field.width = sizeX;
  field.height = sizeY;

  const fieldContext = field.getContext('2d');

  if (!fieldContext) {
    throw Error("Empty context!");
  }

  for (let x = 0; x < sizeX; x += cellSize.coordX) {
    fieldContext.moveTo(x, 0);
    fieldContext.lineTo(x, sizeY);
  }

  for (let y = 0; y < sizeY; y += cellSize.coordY) {
    fieldContext.moveTo(0, y);
    fieldContext.lineTo(sizeX, y);
  }

  fieldContext.strokeStyle = 'grey';
  fieldContext.stroke();
}

export function drawFieldCanvas(cellX: number, cellY: number): void {
  const field = document.querySelector(".field") as HTMLCanvasElement;
  const fieldContext = getFieldContext(field);
  const filledFieldState = fieldStateMap.get(fieldCellState[cellX][cellY]);
  if (!filledFieldState) {
    throw Error('Absent field state exception');
  }
  filledFieldState(cellX, cellY, fieldContext);

  fieldContext.fillRect(cellX * cellSize.coordX + cellBorderSize, cellY * cellSize.coordY + cellBorderSize,
    cellSize.coordX - 2 * cellBorderSize, cellSize.coordY - 2 * cellBorderSize);
}

function updateFieldCell(event: MouseEvent): void {
  const field = document.querySelector(".field") as HTMLCanvasElement;
  console.log("x " + event.clientX, "y" + event.clientY)
  console.log("offsetLeft " + field.offsetLeft, "offsetTop " + field.offsetTop)
  const cellX = Math.floor((event.clientX - field.offsetLeft) / cellSize.coordX);
  const cellY = Math.floor((event.clientY - field.offsetTop) / cellSize.coordY);
  console.log("cellX " + cellX, "cellY " + cellY);

  drawFieldCanvas(cellX, cellY);

  console.log(fieldFillCellState);
}

function clearField(): void {
  const field = document.querySelector(".field") as HTMLCanvasElement;
  const fieldContext = getFieldContext(field);
  fieldContext.fillStyle = "white";

  fieldFillCellState.forEach((cell) => {
    fieldContext.fillRect(cell.coordX * cellSize.coordX + cellBorderSize, cell.coordY * cellSize.coordY + cellBorderSize,
      cellSize.coordX - 2 * cellBorderSize, cellSize.coordY - 2 * cellBorderSize);
  });

  initFieldState(fieldCellState.length, fieldCellState[0].length);

  fieldFillCellState.clear();
}

export function getFieldContext(field: HTMLCanvasElement): CanvasRenderingContext2D {
  const fieldContext = field.getContext('2d');

  if (!fieldContext) {
    throw Error("Empty context!");
  }

  return fieldContext;
}


// export function getFillFieldState(cellX: number, cellY: number): Cell | undefined {
//
//   return [...fieldFillCellState].find(cell => cell === new Cell(cellX, cellY)) || 5;
// }
