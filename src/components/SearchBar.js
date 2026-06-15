export function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        className="searchinput"
        placeholder="search meal name"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
