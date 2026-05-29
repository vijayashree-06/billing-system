const items = [
  "dashboard",
  "billing",
  "products",
  "reports",
];

export default function MobileNav({
  page,
  setPage,
}) {
  return (
    <div className="mobile-nav">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => setPage(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}