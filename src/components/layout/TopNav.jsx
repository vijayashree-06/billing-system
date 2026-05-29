// src/components/layout/TopNav.jsx

function TopNav({ title }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>{title}</h2>
    </div>
  );
}

export default TopNav;