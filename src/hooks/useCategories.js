import { useState, useEffect } from "react";

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => setCategories(data.meals))
      .catch((err) => console.error("Categories fetch error:", err));
  }, []);

  return { categories };
}
