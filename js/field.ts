export {createField, updateFieldCell, clearField, fieldCellState}
import {Cell} from "./cell";

const cellSize = new Cell(20, 20);
const cellBorderSize = 0.5;

let fieldCellState: Array<number>[];
const fieldFillCellState: Set<Cell> = new Set<Cell>();

function createField(sizeX: number, sizeY: number): void {
  fieldCellState = Array.from({length: sizeY}).map(() =>
    Array.from({length: sizeX}).fill(0)
  ) as Array<number>[];

  const field = document.querySelector(".field") as HTMLCanvasElement;

  field.style.setProperty('width', `${sizeX}`);
  field.style.setProperty('height', `${sizeY}`);
  field.width = sizeX;
  field.height = sizeY;

  const fieldContext = field.getContext('2d');

  if (!fieldContext) {
    throw Error("Empty context!");
  }

  for (let x = 0; x < sizeX; x += cellSize.sizeX) {
    fieldContext.moveTo(x, 0);
    fieldContext.lineTo(x, sizeY);
  }

  for (let y = 0; y < sizeY; y += cellSize.sizeY) {
    fieldContext.moveTo(0, y);
    fieldContext.lineTo(sizeX, y);
  }

  fieldContext.strokeStyle = 'grey';
  fieldContext.stroke();
}

function updateFieldCell(event: MouseEvent): void {
  const field = document.querySelector(".field") as HTMLCanvasElement;
  console.log("x " + event.clientX, "y" + event.clientY)
  console.log("offsetLeft " + field.offsetLeft, "offsetTop " + field.offsetTop)
  const cellX = Math.floor((event.clientX - field.offsetLeft) / cellSize.sizeX);
  const cellY = Math.floor((event.clientY - field.offsetTop) / cellSize.sizeY);
  console.log("cellX " + cellX, "cellY " + cellY);

  const fieldContext = getFieldContext(field);

  if (!fieldCellState[cellX][cellY]) {
    console.log("true");
    fieldCellState[cellX][cellY] = 1;
    fieldContext.fillStyle = "black";
    fieldFillCellState.add(new Cell(cellX, cellY));
  } else {
    console.log("false");
    fieldCellState[cellX][cellY] = 0;
    fieldFillCellState.delete(new Cell(cellX, cellY));
    fieldContext.fillStyle = "white";
  }

  fieldContext.fillRect(cellX * cellSize.sizeX + cellBorderSize, cellY * cellSize.sizeY + cellBorderSize,
    cellSize.sizeX - 2 * cellBorderSize, cellSize.sizeY - 2 * cellBorderSize);
}

function clearField(): void {
  const field = document.querySelector(".field") as HTMLCanvasElement;
  const fieldContext = getFieldContext(field);
  fieldContext.fillStyle = "white";
  // fieldFillCellState.forEach((cell) => {
  //
  // })

  fieldContext.clearRect(0, 0, field.width, field.height);
}

function getFieldContext(field: HTMLCanvasElement): CanvasRenderingContext2D {
  const fieldContext = field.getContext('2d');

  if (!fieldContext) {
    throw Error("Empty context!");
  }

  return fieldContext;
}

