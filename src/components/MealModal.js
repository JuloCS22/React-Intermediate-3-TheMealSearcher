import { useState, useEffect } from "react";

export function MealModal({ mealId, isFavorite, onClose, onToggleFavorite }) {
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mealId) {
      setMeal(null);
      return;
    }

    setError(null);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur dans la requête");
        return res.json();
      })
      .then((data) => setMeal(data.meals[0]))
      .catch((err) => setError(err.message));
  }, [mealId]);

  return (
    <div id="myModal" className="modal" style={{ display: "block" }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {error && <p className="errortext">{error}</p>}
        {meal && (
          <>
            <span
              className={isFavorite ? "modal-heart-red" : "modal-heart-green"}
              onClick={() => onToggleFavorite(meal.idMeal)}
            >
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </span>
            <div key={meal.idMeal} className="modal-display">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="modal-img" />
              <h4>{meal.strMeal}</h4>
              <h5>
                This {meal.strCategory} meal is {meal.strArea}
              </h5>
              {meal.strInstructions
                .split(/\.\s+/)
                .filter(Boolean)
                .map((sentence, i) => (
                  <p key={i}>{sentence}.</p>
                ))}
              <ul className="modal-list">
                {Array.from({ length: 20 }, (_, i) => {
                  const ingredient = meal[`strIngredient${i + 1}`];
                  const measure = meal[`strMeasure${i + 1}`];
                  return ingredient ? (
                    <li key={i}>
                      {ingredient} - {measure}
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
