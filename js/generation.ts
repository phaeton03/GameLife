import {Cell} from "./cell";
import {addFillFieldState, deleteFillFieldState, fieldCellState, fieldFillCellState, isAlive} from "./fieldState";

export function getNumberOfAliveNeighbours(cellX: number, cellY: number): number {
  let neighbours = 0;

  for (let i = cellX - 1; i <= cellX + 1; i += 1) {
    for (let j = cellY - 1; j <= cellY + 1; j += 1) {
      if (isAlive(i, j)) {
        neighbours++;
      }
    }
  }

  if (isAlive(cellX, cellY)) {
    neighbours--;
  }

  return neighbours;
}

export function getNewState(cellX: number, cellY: number): number {
  const aliveNeighbours = getNumberOfAliveNeighbours(cellX, cellY);

  if (isAlive(cellX, cellY) && !(aliveNeighbours in [2, 3])) {
    return 0;
  }

  if (!isAlive(cellX, cellY) && aliveNeighbours === 3) {
    return 1;
  }

  return fieldCellState[cellX][cellY];
}

export function calculateNewGeneration() {
  const tempFieldCellState = new Map<Cell, number>();

  fieldFillCellState.forEach(cell => {
    for (let i = cell.coordX - 1; i <= cell.coordX + 1; i += 1) {
      for (let j = cell.coordY - 1; j <= cell.coordY + 1; j += 1) {
        tempFieldCellState.set(new Cell(i, j), getNewState(i, j));
      }
    }
  });

  tempFieldCellState.forEach((state, cell) => {
    if(state === 0) {
      addFillFieldState(cell.coordX, cell.coordY);
    } else {
      deleteFillFieldState(cell.coordX, cell.coordY);
    }
  });

}
