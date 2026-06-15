import { useState, useEffect } from "react";

export function useMealSearch(query, searchMode) {
  const [meals, setMeals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setMeals(null);
      return;
    }

    const endpoint =
      searchMode === "category"
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`
        : `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    setLoading(true);
    setError(null);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur dans la requête");
        return res.json();
      })
      .then((data) => {
        setMeals(data.meals);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [query, searchMode]);

  return { meals, loading, error };
}
