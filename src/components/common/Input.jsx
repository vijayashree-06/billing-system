const Input = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {label && (
        <label
          style={{
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          padding: "12px 14px",
          fontSize: 14,
          outline: "none",
        }}
      />
    </div>
  );
};

export default Input;