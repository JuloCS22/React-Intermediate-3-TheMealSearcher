export function CategoryFilter({ categories, onSelect }) {
  return (
    <div className="categoryfilter">
      <h5>Search by Categories</h5>
      {categories.map((c) => (
        <button
          key={c.strCategory}
          className="categorybutton"
          value={c.strCategory}
          onClick={onSelect}
        >
          {c.strCategory}
        </button>
      ))}
    </div>
  );
}
