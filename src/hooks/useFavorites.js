import { useState, useEffect } from "react";

export function useFavorites(isFavoriteOn) {
  const [favId, setFavId] = useState(() => {
    const saved = localStorage.getItem("favId");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("favId", JSON.stringify(favId));
  }, [favId]);

  useEffect(() => {
    if (!isFavoriteOn || favId.length === 0) {
      setFavoriteMeals([]);
      return;
    }

    setLoading(true);
    Promise.all(
      favId.map((id) =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch favorite");
            return res.json();
          })
          .then((data) => data.meals[0])
          .catch(() => null)
      )
    ).then((results) => {
      setFavoriteMeals(results.filter(Boolean));
      setLoading(false);
    });
  }, [isFavoriteOn, favId]);

  function toggleFavorite(id) {
    setFavId((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  function clearFavorites() {
    setFavId([]);
  }

  return { favId, favoriteMeals, loading, toggleFavorite, clearFavorites };
}
