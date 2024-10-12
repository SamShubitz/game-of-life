import { useState } from "react";
import Cell from "./Cell";

type Cell = {
  isActive: boolean;
  neighbors: number;
  index: number;
};

function App() {
  const size = 10;
  const initialGrid = new Array(size * size).fill(null).map((_, index) => {
    return {
      isActive: false,
      neighbors: 0,
      index: index,
    };
  });
  const [grid, setGrid] = useState(initialGrid);

  const getNeighbors = (
    selectedCellIndex: number,
    currentCellIndex: number,
    currentCellIsActive: boolean
  ) => {
    const activeCells = grid.filter((cell) => {
      return cell.index === selectedCellIndex && currentCellIsActive
        ? !cell.isActive
        : cell.isActive;
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

  const compareCells = (cellA: number, cellB: number) => {
    const neighborSolutions = [1, size - 1, size, size + 1];
    if (neighborSolutions.includes(Math.abs(cellA - cellB))) {
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
        neighbors: getNeighbors(
          selectedCellIndex,
          index,
          selectedCell ? !cell.isActive : cell.isActive
        ),
      };
    });
    setGrid(nextGrid);
  };

  const handleIncrement = () => {
    return 0;
  };

  const mappedGrid = grid.map((cell, i) => {
    return (
      <Cell
        key={i}
        onChange={updateGrid}
        index={i}
        isActive={cell.isActive}
        neighbors={cell.neighbors}
      />
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
