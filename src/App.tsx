import { useState } from "react";
import Cell from "./Cell";

type Cell = {
  isActive: boolean;
  neighbors: number;
  index: number;
};

function App() {
  const size = 20;
  const initialGrid = new Array(size * size).fill(null).map((_, index) => {
    return {
      isActive: false,
      neighbors: 0,
      index: index,
    };
  });
  const [grid, setGrid] = useState(initialGrid);

  const getNeighbors = (
    currentCellIndex: number,
    selectedCellIndex?: number
  ) => {
    const activeCells = grid.filter((cell) => {
      return cell.index === selectedCellIndex ? cell.isActive : cell.isActive;
    });

    let neighborCount = 0;

    activeCells.forEach((cell) => {
      const isNeighbor = compareCells(currentCellIndex, cell.index);
      if (isNeighbor) {
        neighborCount += 1;
      }
    });
    return neighborCount;
  };

  const compareCells = (activeCell: number, currentCell: number) => {
    const neighborSolutions = [1, size - 1, size, size + 1];
    const edgeCaseA = activeCell % size === 0;
    const edgeCaseB = activeCell % size === size - 1;

    if (edgeCaseA) {
      if (
        activeCell - currentCell === 1 ||
        activeCell - currentCell === size + 1 ||
        activeCell - currentCell === -(size - 1)
      )
        return false;
    }
    if (edgeCaseB) {
      if (
        activeCell - currentCell === -1 ||
        activeCell - currentCell === size - 1 ||
        activeCell - currentCell === -(size + 1)
      )
        return false;
    }
    const solution = Math.abs(activeCell - currentCell);
    if (neighborSolutions.includes(solution)) {
      return true;
    }
    return false;
  };

  const updateGrid = (selectedCellIndex: number) => {
    const nextGrid = grid.map((cell, index) => {
      const selectedCell = selectedCellIndex === index;
      return {
        ...cell,
        isActive: selectedCell ? !cell.isActive : cell.isActive,
        neighbors: getNeighbors(index, selectedCellIndex),
      };
    });
    setGrid(nextGrid);
  };

  const handleIncrement = () => {
    const nextGrid = grid.map((cell) => {
      const isActive = cell.isActive
        ? cell.neighbors === 2 || cell.neighbors === 3
        : cell.neighbors === 3;
      return {
        ...cell,
        isActive: isActive,
        neighbors: getNeighbors(cell.index, isActive ? cell.index : undefined),
      };
    });
    setGrid(nextGrid);
  };

  const mappedGrid = grid.map((cell, i) => {
    return (
      <Cell key={i} onChange={updateGrid} index={i} isActive={cell.isActive} />
    );
  });

  return (
    <div style={{ width: "100vw" }}>
      <button onClick={handleIncrement}>Increment</button>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${size}, 1fr)`,
          }}
        >
          {mappedGrid}
        </div>
      </div>
    </div>
  );
}

export default App;
