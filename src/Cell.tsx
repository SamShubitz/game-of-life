const Cell = ({
  onChange,
  isActive,
  index,
}: {
  onChange: (selectedCellIndex: number) => void;
  isActive: boolean;
  index: number;
}) => {
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
        height: "20px",
        width: "20px",
        border: "solid 1px black",
        backgroundColor: `${color}`,
      }}
      onClick={handleClick}
    />
  );
};

export default Cell;
