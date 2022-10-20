export const FindKandy = ({ setterFunction }) => {
  return (
    <input
      onChange={(changeEvent) => {
        setterFunction(changeEvent.target.value);
      }}
      type="text"
      placeholder="Enter kandy name"
    />
  );
};
