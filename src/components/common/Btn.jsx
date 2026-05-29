const Btn = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled,
  style: extra,
}) => {

  const sizes = {
    sm: {
      padding: "6px 14px",
      fontSize: 13,
    },

    md: {
      padding: "10px 20px",
      fontSize: 14,
    },

    lg: {
      padding: "13px 28px",
      fontSize: 15,
    },
  };

  const variants = {
    primary: {
      background:
        "linear-gradient(135deg,#6366f1,#4f46e5)",
      color: "#fff",
      border: "none",
    },

    secondary: {
      background: "#f1f5f9",
      color: "#374151",
      border: "1px solid #e2e8f0",
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...sizes[size],
        ...variants[variant],
        borderRadius: 10,
        fontWeight: 600,
        cursor: disabled
          ? "not-allowed"
          : "pointer",
        transition: "all 0.2s",
        opacity: disabled ? 0.5 : 1,
        ...extra,
      }}
    >
      {children}
    </button>
  );
};

export default Btn;