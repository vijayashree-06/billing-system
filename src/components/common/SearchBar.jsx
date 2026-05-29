const SearchBar = ({
  value,
  onChange,
  placeholder,
}) => {

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        style={{
          width: "100%",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          padding: "12px 14px",
          fontSize: 14,
        }}
      />
    </div>
  );
};

export default SearchBar;