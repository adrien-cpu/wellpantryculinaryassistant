import { AuthProvider } from "@/context/AuthContext";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Garden from "./pages/Garden";
import MealPlanning from "./pages/MealPlanning";
import Pantry from "./pages/Pantry";
import Map from "./pages/Map";
import NotFound from "./pages/NotFound";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import Features from "@/pages/Features";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import { Settings } from "lucide-react";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/garden" element={<Garden />} />
        <Route path="/meal-planning" element={<MealPlanning />} />
        <Route path="/pantry" element={<Pantry />} />
        <Route path="/map" element={<Map />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profil" element={<UserProfile />} />
        <Route path="/usersettings" element={<UserSettings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
