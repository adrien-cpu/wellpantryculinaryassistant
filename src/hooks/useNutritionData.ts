
import { useState, useMemo } from 'react';

export interface MealNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface DayNutrition {
  breakfast: MealNutrition;
  lunch: MealNutrition;
  dinner: MealNutrition;
  total: MealNutrition;
}

export interface UserNutritionGoals {
  dailyCalories: number;
  proteinPercentage: number;
  carbsPercentage: number;
  fatPercentage: number;
}

export const useNutritionData = () => {
  const [userGoals] = useState<UserNutritionGoals>({
    dailyCalories: 2000,
    proteinPercentage: 30,
    carbsPercentage: 40,
    fatPercentage: 30,
  });

  // Données nutritionnelles simulées pour les repas
  const nutritionData: Record<string, Record<string, MealNutrition>> = {
    "Lundi": {
      breakfast: { calories: 320, protein: 12, carbs: 45, fat: 8, fiber: 6 },
      lunch: { calories: 450, protein: 25, carbs: 55, fat: 12, fiber: 8 },
      dinner: { calories: 520, protein: 30, carbs: 60, fat: 18, fiber: 5 }
    },
    "Mardi": {
      breakfast: { calories: 380, protein: 15, carbs: 52, fat: 10, fiber: 7 },
      lunch: { calories: 420, protein: 28, carbs: 35, fat: 15, fiber: 6 },
      dinner: { calories: 490, protein: 26, carbs: 58, fat: 16, fiber: 9 }
    },
    "Mercredi": {
      breakfast: { calories: 350, protein: 18, carbs: 28, fat: 16, fiber: 4 },
      lunch: { calories: 480, protein: 22, carbs: 48, fat: 20, fiber: 12 },
      dinner: { calories: 510, protein: 24, carbs: 65, fat: 14, fiber: 8 }
    },
    "Jeudi": {
      breakfast: { calories: 290, protein: 16, carbs: 32, fat: 8, fiber: 5 },
      lunch: { calories: 460, protein: 35, carbs: 25, fat: 22, fiber: 3 },
      dinner: { calories: 540, protein: 28, carbs: 70, fat: 15, fiber: 10 }
    },
    "Vendredi": {
      breakfast: { calories: 410, protein: 14, carbs: 58, fat: 12, fiber: 6 },
      lunch: { calories: 390, protein: 20, carbs: 45, fat: 14, fiber: 7 },
      dinner: { calories: 520, protein: 18, carbs: 62, fat: 20, fiber: 11 }
    },
    "Samedi": {
      breakfast: { calories: 480, protein: 20, carbs: 55, fat: 18, fiber: 4 },
      lunch: { calories: 380, protein: 24, carbs: 40, fat: 12, fiber: 8 },
      dinner: { calories: 580, protein: 32, carbs: 58, fat: 24, fiber: 6 }
    },
    "Dimanche": {
      breakfast: { calories: 520, protein: 25, carbs: 45, fat: 22, fiber: 3 },
      lunch: { calories: 420, protein: 18, carbs: 52, fat: 14, fiber: 9 },
      dinner: { calories: 490, protein: 35, carbs: 48, fat: 16, fiber: 7 }
    }
  };

  const calculateDayTotal = (day: string): DayNutrition => {
    const dayData = nutritionData[day];
    if (!dayData) {
      return {
        breakfast: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
        lunch: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
        dinner: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
        total: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
      };
    }

    const total: MealNutrition = {
      calories: dayData.breakfast.calories + dayData.lunch.calories + dayData.dinner.calories,
      protein: dayData.breakfast.protein + dayData.lunch.protein + dayData.dinner.protein,
      carbs: dayData.breakfast.carbs + dayData.lunch.carbs + dayData.dinner.carbs,
      fat: dayData.breakfast.fat + dayData.lunch.fat + dayData.dinner.fat,
      fiber: dayData.breakfast.fiber + dayData.lunch.fiber + dayData.dinner.fiber
    };

    return {
      breakfast: dayData.breakfast,
      lunch: dayData.lunch,
      dinner: dayData.dinner,
      total
    };
  };

  const getCalorieStatus = (calories: number): 'low' | 'optimal' | 'high' => {
    const percentage = (calories / userGoals.dailyCalories) * 100;
    if (percentage < 80) return 'low';
    if (percentage > 120) return 'high';
    return 'optimal';
  };

  const getWeeklyAverage = (days: string[]): MealNutrition => {
    const totalNutrition = days.reduce((acc, day) => {
      const dayTotal = calculateDayTotal(day).total;
      return {
        calories: acc.calories + dayTotal.calories,
        protein: acc.protein + dayTotal.protein,
        carbs: acc.carbs + dayTotal.carbs,
        fat: acc.fat + dayTotal.fat,
        fiber: acc.fiber + dayTotal.fiber
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

    return {
      calories: Math.round(totalNutrition.calories / days.length),
      protein: Math.round(totalNutrition.protein / days.length),
      carbs: Math.round(totalNutrition.carbs / days.length),
      fat: Math.round(totalNutrition.fat / days.length),
      fiber: Math.round(totalNutrition.fiber / days.length)
    };
  };

  return {
    userGoals,
    nutritionData,
    calculateDayTotal,
    getCalorieStatus,
    getWeeklyAverage
  };
};
