import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useNutritionData } from "@/hooks/useNutritionData";
import { useMealPlanning } from "@/hooks/useMealPlanning";
import NutritionCard from "@/components/meal-planning/NutritionCard";
import WeeklyNutritionSummary from "@/components/meal-planning/WeeklyNutritionSummary";
import NutritionLegend from "@/components/meal-planning/NutritionLegend";
import MealGenerationDialog from "@/components/meal-planning/MealGenerationDialog";
import MealEditDialog from "@/components/meal-planning/MealEditDialog";
import MealPlannerCalendar from "@/components/meal-planning/MealPlannerCalendar";
import MealPlannerTable from "@/components/meal-planning/MealPlannerTable";
import MonthlyCalendar from "@/components/meal-planning/MonthlyCalendar";
import WeeklyVerticalView from "@/components/meal-planning/WeeklyVerticalView";
import DailyView from "@/components/meal-planning/DailyView";
import type { DayMeals } from "@/types/meal-planning";
import dayjs from "dayjs";

const MealPlanningPage = () => {
  const { toast } = useToast();
  const { userGoals, calculateDayTotal, getWeeklyAverage } = useNutritionData();
  const { meals, updateMeal, replaceAllMeals } = useMealPlanning();

  const [view, setView] = useState<"month" | "week" | "day">("week");
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState(dayjs().format("YYYY-MM-DD"));

  const [editingMeal, setEditingMeal] = useState<{
    day: string;
    type: 'breakfast' | 'lunch' | 'dinner';
    meal: { name: string; description?: string };
  } | null>(null);

  const showComingSoon = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Cette fonctionnalité sera disponible prochainement.",
      duration: 3000,
    });
  };

  const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  const shoppingList = [
    { name: "Légumes", items: ["Courgettes (3)", "Aubergine (1)", "Poivrons (2)", "Champignons (250g)", "Épinards (200g)"] },
    { name: "Fruits", items: ["Pommes (6)", "Bananes (4)", "Myrtilles (125g)", "Fraises (250g)"] },
    { name: "Protéines", items: ["Œufs (12)", "Tofu (400g)", "Filet de poisson (300g)", "Poulet (500g)"] },
    { name: "Épicerie", items: ["Riz basmati (500g)", "Pâtes complètes (500g)", "Quinoa (250g)", "Sauce pesto (1 pot)"] },
  ];

  const weeklyAverage = getWeeklyAverage(weekDays);

  const handleEditMeal = (day: string, type: 'breakfast' | 'lunch' | 'dinner') => {
    setEditingMeal({
      day,
      type,
      meal: meals[day]?.[type] || { name: "", description: "" }
    });
    setSelectedDay(day);
    setView("day");
  };

  const handleSaveMeal = (updatedMeal: { name: string; description: string }) => {
    if (editingMeal) {
      updateMeal(editingMeal.day, editingMeal.type, updatedMeal);
      setEditingMeal(null);
    }
  };

  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-wp-green-dark dark:text-wp-green mb-2">Planification des repas</h1>
              <p className="text-wp-gray-dark dark:text-wp-gray-light">
                Organisez vos repas avec un suivi nutritionnel complet et générez automatiquement vos listes de courses
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              <MealGenerationDialog onMealsGenerated={replaceAllMeals} />
              <Button variant="outline" onClick={showComingSoon} className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <line x1="12" y1="20" x2="12" y2="10"></line>
                  <line x1="18" y1="20" x2="18" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="16"></line>
                </svg>
                Analyser les habitudes
              </Button>
            </div>
          </div>

          <NutritionLegend />

          <div className="mb-8">
            <WeeklyNutritionSummary 
              weeklyAverage={weeklyAverage}
              goals={userGoals}
            />
          </div>
          
          <Tabs defaultValue="planning" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="planning">Planning des repas</TabsTrigger>
              <TabsTrigger value="shopping">Liste de courses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="planning">
              <Card>
                <CardHeader>
                  <CardTitle>Planning</CardTitle>
                  <MealPlannerCalendar
                    view={view}
                    setView={setView}
                  />
                  <CardDescription>
                    Planifiez vos repas pour la semaine, le mois ou la journée et suivez votre nutrition quotidienne
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {view === "month" && (
                    <MonthlyCalendar
                      currentDate={currentDate}
                      meals={meals}
                      onEditMeal={handleEditMeal}
                    />
                  )}
                  {view === "week" && (
                    <WeeklyVerticalView
                      weekDays={weekDays}
                      meals={meals}
                      onEditMeal={handleEditMeal}
                    />
                  )}
                  {view === "day" && (
                    <DailyView
                      date={selectedDay}
                      meals={meals}
                      onEditMeal={handleEditMeal}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shopping">
              <Card>
                <CardHeader>
                  <CardTitle>Liste de courses</CardTitle>
                  <CardDescription>Générée automatiquement à partir de votre planning nutritionnel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {shoppingList.map((category, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-3">{category.name}</h3>
                        <ul className="space-y-2">
                          {category.items.map((item, i) => (
                            <li key={i} className="flex items-center">
                              <input 
                                type="checkbox" 
                                id={`item-${index}-${i}`} 
                                className="rounded border-wp-gray-dark text-wp-green focus:ring-wp-green mr-3"
                              />
                              <label htmlFor={`item-${index}-${i}`} className="text-wp-gray-dark dark:text-wp-gray-light">{item}</label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Button onClick={showComingSoon} variant="outline" className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M12 5v14"></path>
                        <path d="M5 12h14"></path>
                      </svg>
                      Ajouter un article
                    </Button>
                    <Button onClick={showComingSoon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Télécharger la liste
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <MealEditDialog
            isOpen={!!editingMeal}
            onClose={() => setEditingMeal(null)}
            meal={editingMeal?.meal || null}
            onSave={handleSaveMeal}
          />
        </div>
      </section>
    </Layout>
  );
};

export default MealPlanningPage;
