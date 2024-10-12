const Cell = ({
  onChange,
  isActive,
  index,
  neighbors,
}: {
  onChange: (selectedCellIndex: number) => void;
  isActive: boolean;
  index: number;
  neighbors: number;
}) => {
  // const activeColors = {
  //   "0": "cyan",
  //   "1": "green",
  //   "2": "black",
  //   "3": "red",
  //   "4": "yellow",
  //   "5": "white",
  //   "6": "violet",
  //   "7": "brown",
  // };

  // const neighborString = neighbors.toString();

  const color = isActive ? "green" : "orange";

  const handleClick = () => {
    onChange(index);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30px",
        width: "30px",
        border: "solid 1px black",
        backgroundColor: `${color}`,
      }}
      onClick={handleClick}
    >
      <p>{neighbors}</p>
    </div>
  );
};

export default Cell;
