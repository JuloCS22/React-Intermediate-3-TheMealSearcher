export function MealCard({ meal, onClick }) {
  return (
    <div className="mealThumb" onClick={() => onClick(meal.idMeal)}>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      {meal.strMeal}
    </div>
  );
}
