import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { DayMeals } from "@/types/meal-planning";

interface Meal {
  name: string;
  description?: string;
}

export const useMealPlanning = () => {
  const { toast } = useToast();
  
  const [meals, setMeals] = useState<Record<string, DayMeals>>({});

  const updateMeal = (day: string, mealType: 'breakfast' | 'lunch' | 'dinner', updatedMeal: Meal) => {
    setMeals(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: updatedMeal
      }
    }));
  };

  const replaceAllMeals = (newMeals: Record<string, DayMeals>) => {
    setMeals(newMeals);
    toast({
      title: "Menu mis à jour",
      description: "Votre planning de repas a été généré avec succès",
      duration: 3000,
    });
  };

  return { meals, updateMeal, replaceAllMeals };
};
