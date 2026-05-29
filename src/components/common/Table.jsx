const Table = ({
  columns,
  data,
  onRowClick,
}) => {

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#f8fafc",
            }}
          >
            {columns.map((c) => (
              <th
                key={c.key}
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                }}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              onClick={() =>
                onRowClick &&
                onRowClick(row)
              }
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  style={{
                    padding: "14px 16px",
                  }}
                >
                  {c.render
                    ? c.render(row[c.key], row)
                    : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;