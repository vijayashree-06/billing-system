const StatusBadge = ({ status }) => {

  const map = {
    paid: {
      bg: "#dcfce7",
      color: "#166534",
      label: "Paid",
    },

    pending: {
      bg: "#fef3c7",
      color: "#92400e",
      label: "Pending",
    },

    overdue: {
      bg: "#fee2e2",
      color: "#991b1b",
      label: "Overdue",
    },
  };

  const s = map[status];

  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        padding: "3px 10px",
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {s.label}
    </span>
  );
};

export default StatusBadge;