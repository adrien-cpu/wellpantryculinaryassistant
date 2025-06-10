import { useEffect, useState } from "react";
import { Calendar, BookOpen, ShoppingBasket, Leaf, BarChart2, DollarSign, Scale, Sparkles, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Helper function to generate week dates
const getWeekDates = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajuster si dimanche
  const monday = new Date(date.setDate(diff));
  
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(monday);
    nextDay.setDate(monday.getDate() + i);
    weekDates.push(nextDay);
  }
  return weekDates;
};

export default function Dashboard() {
  const [recipesCount, setRecipesCount] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  // Initialize currentWeek with actual dates instead of empty array
  const [currentWeek, setCurrentWeek] = useState<Date[]>(() => getWeekDates(new Date()));
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Données simulées pour les statistiques
  const stats = {
    plants: {
      active: 6,
      toWater: 2,
      harvests: 3,
      percentages: {
        active: 75,
        toWater: 25,
        harvests: 50
      }
    },
    pantry: {
      total: 42,
      expiringSoon: 5,
      categories: [
        { name: "Fruits & Légumes", amount: 8.2, color: "bg-green-400" },
        { name: "Produits laitiers", amount: 4.5, color: "bg-red-300" },
        { name: "Céréales", amount: 3.8, color: "bg-yellow-400" },
        { name: "Viandes", amount: 2.0, color: "bg-blue-300" }
      ]
    },
    mealPlan: {
      planned: 14,
      completed: 9,
      upcoming: 5
    },
    impact: {
      moneySaved: 243,
      foodSaved: 18.5,
      co2Reduced: 42,
      percentages: {
        money: 81,
        food: 75,
        co2: 84
      }
    }
  };

  // Données simulées pour le calendrier des repas
  const mealPlan = {
    "2025-05-19": {
      breakfast: { name: "Smoothie aux fruits rouges", calories: 320 },
      lunch: { name: "Salade de quinoa aux légumes", calories: 450 },
      dinner: { name: "Saumon grillé, légumes vapeur", calories: 520 }
    },
    "2025-05-20": {
      breakfast: { name: "Porridge aux pommes", calories: 380 },
      lunch: { name: "Wrap au poulet et avocat", calories: 420 },
      dinner: { name: "Risotto aux champignons", calories: 490 }
    },
    "2025-05-21": {
      breakfast: { name: "Œufs brouillés, pain complet", calories: 350 },
      lunch: { name: "Bowl de légumes rôtis", calories: 480 },
      dinner: { name: "Pâtes complètes, sauce tomate", calories: 510 }
    },
    "2025-05-22": {
      breakfast: { name: "Yaourt grec, granola", calories: 290 },
      lunch: { name: "Soupe de lentilles, pain", calories: 460 },
      dinner: { name: "Curry de légumes, riz basmati", calories: 540 }
    },
    "2025-05-23": {
      breakfast: { name: "Pancakes aux myrtilles", calories: 410 },
      lunch: { name: "Salade niçoise", calories: 390 },
      dinner: { name: "Quiche aux épinards", calories: 520 }
    }
  };

  // Update currentWeek when currentDate changes
  useEffect(() => {
    setCurrentWeek(getWeekDates(new Date(currentDate)));
  }, [currentDate]);

  useEffect(() => {
    async function fetchRecipes() {
      const { count } = await supabase
        .from("recipes")
        .select("*", { count: "exact", head: true });
      setRecipesCount(count || 0);
    }
    fetchRecipes();
  }, []);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { weekday: 'long' });
  };

  const navigateToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const navigateToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const getMealForDay = (date: Date, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    const dateStr = formatDate(date);
    return mealPlan[dateStr]?.[mealType] || null;
  };

  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-wp-green-dark mb-2">Tableau de bord</h1>
          <p className="text-wp-gray-dark dark:text-wp-gray-light mb-8">
            Retrouvez ici un aperçu de votre activité, vos statistiques et vos accès rapides.
          </p>

          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Potager */}
            <Card className="border-wp-green-light">
              <CardHeader className="pb-2">
                <CardTitle className="text-wp-green-dark dark:text-wp-green flex items-center text-lg">
                  <Leaf className="w-5 h-5 mr-2" />
                  Potager d'intérieur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-16 h-16">
                        <circle 
                          cx="32" 
                          cy="32" 
                          r="28" 
                          fill="none" 
                          stroke="#e5e7eb" 
                          strokeWidth="8"
                        />
                        <circle 
                          cx="32" 
                          cy="32" 
                          r="28" 
                          fill="none" 
                          stroke="#4ade80" 
                          strokeWidth="8"
                          strokeDasharray={2 * Math.PI * 28}
                          strokeDashoffset={2 * Math.PI * 28 * (1 - stats.plants.percentages.active / 100)}
                          transform="rotate(-90 32 32)"
                        />
                      </svg>
                      <span className="absolute text-2xl font-bold text-wp-green-dark">{stats.plants.active}</span>
                    </div>
                    <p className="text-sm mt-1">Plantes actives</p>
                  </div>
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-16 h-16">
                        <circle 
                          cx="32" 
                          cy="32" 
                          r="28" 
                          fill="none" 
                          stroke="#e5e7eb" 
                          strokeWidth="8"
                        />
                        <circle 
                          cx="32" 
                          cy="32" 
                          r="28" 
                          fill="none" 
                          stroke="#60a5fa" 
                          strokeWidth="8"
                          strokeDasharray={2 * Math.PI * 28}
                          strokeDashoffset={2 * Math.PI * 28 * (1 - stats.plants.percentages.toWater / 100)}
                          transform="rotate(-90 32 32)"
                        />
                      </svg>
                      <span className="absolute text-2xl font-bold text-blue-500">{stats.plants.toWater}</span>
                    </div>
                    <p className="text-sm mt-1">À arroser</p>
                  </div>
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-16 h-16">
                        <circle 
                          cx="32" 
                          cy="32" 
                          r="28" 
                          fill="none" 
                          stroke="#e5e7eb" 
                          strokeWidth="8"
                        />
                        <circle 
                          cx="32" 
                          cy="32" 
                          r="28" 
                          fill="none" 
                          stroke="#a78bfa" 
                          strokeWidth="8"
                          strokeDasharray={2 * Math.PI * 28}
                          strokeDashoffset={2 * Math.PI * 28 * (1 - stats.plants.percentages.harvests / 100)}
                          transform="rotate(-90 32 32)"
                        />
                      </svg>
                      <span className="absolute text-2xl font-bold text-purple-500">{stats.plants.harvests}</span>
                    </div>
                    <p className="text-sm mt-1">Récoltes</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-1">
                      <span className="text-xs font-medium text-green-800">4</span>
                    </div>
                    <p className="text-xs">Aromatiques</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-1">
                      <span className="text-xs font-medium text-red-800">6</span>
                    </div>
                    <p className="text-xs">Légumes</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-1">
                      <span className="text-xs font-medium text-yellow-800">2</span>
                    </div>
                    <p className="text-xs">Fruits</p>
                  </div>
                </div>
                <Button variant="link" className="w-full mt-4 text-wp-green" asChild>
                  <a href="/garden">Gérer mon potager</a>
                </Button>
              </CardContent>
            </Card>

            {/* Garde-manger */}
            <Card className="border-wp-green-light">
              <CardHeader className="pb-2">
                <CardTitle className="text-wp-green-dark dark:text-wp-green flex items-center text-lg">
                  <ShoppingBasket className="w-5 h-5 mr-2" />
                  Garde-manger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-wp-green-dark">{stats.pantry.total}</div>
                    <p className="text-sm">Produits</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-wp-orange-dark">{stats.pantry.expiringSoon}</div>
                    <p className="text-sm">Expirent bientôt</p>
                  </div>
                </div>
                
                <h4 className="text-sm font-medium mb-2">Catégories principales</h4>
                <div className="space-y-3">
                  {stats.pantry.categories.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{category.name}</span>
                        <span>{category.amount} kg</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${category.color}`} 
                          style={{ width: `${(category.amount / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="w-full mt-4 text-wp-green" asChild>
                  <a href="/pantry">Voir mon garde-manger</a>
                </Button>
              </CardContent>
            </Card>

            {/* Impact */}
            <Card className="border-wp-green-light">
              <CardHeader className="pb-2">
                <CardTitle className="text-wp-green-dark dark:text-wp-green flex items-center text-lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Votre impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">{stats.impact.moneySaved}€</div>
                    <p className="text-xs">Économies</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">{stats.impact.foodSaved} kg</div>
                    <p className="text-xs">Aliments sauvés</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">-{stats.impact.co2Reduced} kg</div>
                    <p className="text-xs">CO2</p>
                  </div>
                </div>
                
                <h4 className="text-sm font-medium mb-2">Progression vers vos objectifs</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Réduire le gaspillage de 30%</span>
                      <span>{stats.impact.percentages.food}%</span>
                    </div>
                    <Progress value={stats.impact.percentages.food} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Économiser 300€</span>
                      <span>{stats.impact.percentages.money}%</span>
                    </div>
                    <Progress value={stats.impact.percentages.money} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Réduire l'empreinte carbone de 50kg</span>
                      <span>{stats.impact.percentages.co2}%</span>
                    </div>
                    <Progress value={stats.impact.percentages.co2} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendrier des repas */}
          <Card className="mb-10 border-wp-green-light">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-wp-green-dark dark:text-wp-green flex items-center text-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Planning des repas
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={navigateToPreviousWeek}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    {currentWeek.length > 0 && (
                      <>Semaine du {formatDisplayDate(currentWeek[0])} au {formatDisplayDate(currentWeek[6])}</>
                    )}
                  </span>
                  <Button variant="outline" size="icon" onClick={navigateToNextWeek}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="p-3 bg-gray-50 text-left font-semibold w-24">Repas</th>
                      {currentWeek.map((date, index) => (
                        <th key={index} className="p-3 bg-gray-50 text-center font-semibold">
                          <div className="capitalize">{getDayName(date)}</div>
                          <div className="text-sm font-normal">{formatDisplayDate(date)}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {['breakfast', 'lunch', 'dinner'].map((mealType, mealIndex) => (
                      <tr key={mealType}>
                        <td className="p-3 font-medium bg-gray-50">
                          {mealType === 'breakfast' ? 'Petit-déjeuner' : 
                           mealType === 'lunch' ? 'Déjeuner' : 'Dîner'}
                        </td>
                        {currentWeek.map((date, dateIndex) => {
                          const meal = getMealForDay(date, mealType as any);
                          return (
                            <td key={dateIndex} className="border p-3 text-center align-middle">
                              {meal ? (
                                <div className="flex flex-col items-center gap-1">
                                  <span className="text-sm font-medium">{meal.name}</span>
                                  <span className="text-xs text-gray-500">{meal.calories} cal</span>
                                </div>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-2xl text-gray-400 hover:text-wp-green"
                                  aria-label="Ajouter un repas"
                                >
                                  +
                                </Button>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <Button className="bg-wp-green hover:bg-wp-green-dark" asChild>
                  <a href="/meal-planning">Voir le planning complet</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Accès rapides */}
          <h2 className="text-xl font-bold text-wp-green-dark dark:text-wp-green mb-4">Accès rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            <a href="/recipes" className="bg-wp-green hover:bg-wp-green-dark text-white rounded-lg p-4 flex flex-col items-center transition">
              <BookOpen className="w-6 h-6 mb-2" />
              <span className="font-semibold">Mes recettes</span>
              <span className="text-sm mt-1">{recipesCount} recettes sauvegardées</span>
            </a>
            <a href="/meal-planning" className="bg-wp-green hover:bg-wp-green-dark text-white rounded-lg p-4 flex flex-col items-center transition">
              <Calendar className="w-6 h-6 mb-2" />
              <span className="font-semibold">Planifier mes repas</span>
              <span className="text-sm mt-1">{stats.mealPlan.planned} repas planifiés</span>
            </a>
            <a href="/pantry" className="bg-wp-green hover:bg-wp-green-dark text-white rounded-lg p-4 flex flex-col items-center transition">
              <ShoppingBasket className="w-6 h-6 mb-2" />
              <span className="font-semibold">Gérer mon garde-manger</span>
              <span className="text-sm mt-1">{stats.pantry.expiringSoon} produits à surveiller</span>
            </a>
            <a href="/garden" className="bg-wp-green hover:bg-wp-green-dark text-white rounded-lg p-4 flex flex-col items-center transition">
              <Leaf className="w-6 h-6 mb-2" />
              <span className="font-semibold">Mon potager</span>
              <span className="text-sm mt-1">{stats.plants.toWater} plantes à arroser</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}