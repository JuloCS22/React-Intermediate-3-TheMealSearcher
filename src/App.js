import { useState } from "react";
import "./styles.css";
import { Navbar } from "./components/Navbar";
import { SearchBar } from "./components/SearchBar";
import { CategoryFilter } from "./components/CategoryFilter";
import { MealCard } from "./components/MealCard";
import { MealModal } from "./components/MealModal";
import { useCategories } from "./hooks/useCategories";
import { useMealSearch } from "./hooks/useMealSearch";
import { useFavorites } from "./hooks/useFavorites";

export default function App() {
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState("name");
  const [mealId, setMealId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavoriteOn, setIsFavoriteOn] = useState(false);

  const { categories } = useCategories();
  const { meals } = useMealSearch(query, searchMode);
  const { favId, favoriteMeals, toggleFavorite, clearFavorites } = useFavorites(isFavoriteOn);

  function handleNameSearch(e) {
    setSearchMode("name");
    setQuery(e.target.value);
  }

  function handleCategorySelect(e) {
    setSearchMode("category");
    setQuery(e.target.value);
  }

  function handleMealClick(id) {
    setMealId(id);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setMealId(null);
  }

  function returnHome() {
    setIsFavoriteOn(false);
    setQuery("");
    setSearchMode("name");
  }

  const displayedMeals = isFavoriteOn ? favoriteMeals : meals;

  return (
    <div>
      <h1>TheMealSearcher</h1>
      <h2>V 0</h2>

      <Navbar
        favCount={favId.length}
        onHome={returnHome}
        onFavorites={() => setIsFavoriteOn(true)}
      />

      {isFavoriteOn ? (
        <div style={{ textAlign: "center" }}>
          <button onClick={clearFavorites}>Delete all Favorites</button>
        </div>
      ) : (
        <>
          <SearchBar
            value={searchMode === "name" ? query : ""}
            onChange={handleNameSearch}
          />
          <CategoryFilter categories={categories} onSelect={handleCategorySelect} />
        </>
      )}

      <div className="mealsplace">
        {displayedMeals &&
          displayedMeals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} onClick={handleMealClick} />
          ))}
        {isModalOpen && (
          <MealModal
            mealId={mealId}
            isFavorite={favId.includes(mealId)}
            onClose={closeModal}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </div>

      <div className="thanks">
        This app is made with appetite thanks to{" "}
        <a href="https://www.themealdb.com/api.php">TheMealDB.</a>
      </div>
    </div>
  );
}
