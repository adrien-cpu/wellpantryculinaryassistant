
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Garden from "./pages/Garden";
import MealPlanning from "./pages/MealPlanning";
import Pantry from "./pages/Pantry";
import Map from "./pages/Map";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/garden" element={<Garden />} />
      <Route path="/meal-planning" element={<MealPlanning />} />
      <Route path="/pantry" element={<Pantry />} />
      <Route path="/map" element={<Map />} />
      <Route path="/features" element={<Features />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
