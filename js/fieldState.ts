import {Cell} from "./cell";

export let fieldCellState: Array<number>[];
export let fieldFillCellState: Set<Cell>;

export function addFillFieldState(cellX: number, cellY: number) {
  fieldCellState[cellX][cellY] = 1;
  fieldFillCellState.add(new Cell(cellX, cellY));
}

export function isAlive(cellX: number, cellY: number): Boolean {

  return fieldFillCellState.has(new Cell(cellX, cellY));
}

export function isAnyoneAlive(): Boolean {

  return fieldFillCellState.size !== 0;
}

export function deleteFillFieldState(cellX: number, cellY: number): void {
  fieldCellState[cellX][cellY] = 0;
  fieldFillCellState.delete(new Cell(cellX, cellY));
}

export function initFieldState(sizeX: number, sizeY: number): void {
  fieldCellState = Array.from({length: sizeX}).map(() =>
    Array.from({length: sizeY}).fill(0)
  ) as Array<number>[];

  fieldFillCellState = new Set<Cell>();
}


