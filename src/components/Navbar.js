export function Navbar({ favCount, onHome, onFavorites }) {
  return (
    <div className="navbar">
      <button className="navbarButton" onClick={onHome}>
        HOME
      </button>
      <button className="navbarButton" onClick={onFavorites}>
        FAVORITES
        {favCount > 0 && <span className="fav-number">{favCount}</span>}
      </button>
    </div>
  );
}
