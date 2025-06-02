import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { 
  ChartPieIcon, 
  FireIcon, 
  ScaleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusSmallIcon
} from '@heroicons/react/24/outline';

interface NutritionGoals {
  daily_calorie_target?: number;
  macros_target?: {
    protein: number; // en %
    carbs: number; // en %
    fat: number; // en %
  };
  weight_goal?: 'lose' | 'maintain' | 'gain';
  target_weight?: number;
}

interface DailyProgress {
  calories: {
    consumed: number;
    target: number;
    percentage: number;
  };
  macros: {
    protein: { consumed: number; target: number; percentage: number };
    carbs: { consumed: number; target: number; percentage: number };
    fat: { consumed: number; target: number; percentage: number };
  };
}

export default function NutritionGoalsWidget() {
  const [goals, setGoals] = useState<NutritionGoals>({
    macros_target: { protein: 30, carbs: 40, fat: 30 }
  });
  const [progress, setProgress] = useState<DailyProgress>({
    calories: { consumed: 0, target: 2000, percentage: 0 },
    macros: {
      protein: { consumed: 0, target: 0, percentage: 0 },
      carbs: { consumed: 0, target: 0, percentage: 0 },
      fat: { consumed: 0, target: 0, percentage: 0 }
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserGoals();
    loadDailyProgress();
  }, []);

  const loadUserGoals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_nutrition_profiles')
        .select('daily_calorie_target, macros_target, weight_goal, target_weight')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching nutrition goals:', error);
        return;
      }

      if (data) {
        setGoals({
          daily_calorie_target: data.daily_calorie_target,
          macros_target: data.macros_target || { protein: 30, carbs: 40, fat: 30 },
          weight_goal: data.weight_goal,
          target_weight: data.target_weight
        });
      }
    } catch (error) {
      console.error('Error loading nutrition goals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDailyProgress = async () => {
    try {
      // Simuler le chargement des données de progression quotidienne
      // Dans une implémentation réelle, ces données viendraient de la base de données
      const dailyCalories = 1650;
      const dailyProtein = 75; // en grammes
      const dailyCarbs = 180; // en grammes
      const dailyFat = 55; // en grammes
      
      const calorieTarget = goals.daily_calorie_target || 2000;
      
      // Calculer les objectifs de macros en grammes
      const proteinTarget = (calorieTarget * (goals.macros_target?.protein || 30) / 100) / 4; // 4 calories par gramme de protéine
      const carbsTarget = (calorieTarget * (goals.macros_target?.carbs || 40) / 100) / 4; // 4 calories par gramme de glucide
      const fatTarget = (calorieTarget * (goals.macros_target?.fat || 30) / 100) / 9; // 9 calories par gramme de lipide
      
      setProgress({
        calories: {
          consumed: dailyCalories,
          target: calorieTarget,
          percentage: Math.min(100, (dailyCalories / calorieTarget) * 100)
        },
        macros: {
          protein: {
            consumed: dailyProtein,
            target: proteinTarget,
            percentage: Math.min(100, (dailyProtein / proteinTarget) * 100)
          },
          carbs: {
            consumed: dailyCarbs,
            target: carbsTarget,
            percentage: Math.min(100, (dailyCarbs / carbsTarget) * 100)
          },
          fat: {
            consumed: dailyFat,
            target: fatTarget,
            percentage: Math.min(100, (dailyFat / fatTarget) * 100)
          }
        }
      });
    } catch (error) {
      console.error('Error loading daily progress:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center">
          <ChartPieIcon className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Objectifs nutritionnels</h2>
        </div>
      </div>

      <div className="p-6">
        {/* Calories */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <FireIcon className="h-5 w-5 text-orange-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">Calories</h3>
            </div>
            <div className="text-sm font-medium text-gray-700">
              {progress.calories.consumed} / {progress.calories.target} kcal
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress.calories.percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full ${
                progress.calories.percentage > 100 
                  ? 'bg-red-500' 
                  : progress.calories.percentage > 90 
                    ? 'bg-yellow-500' 
                    : 'bg-green-500'
              }`}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Macronutriments */}
        <div className="space-y-4">
          {/* Protéines */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Protéines</span>
              <span className="text-sm text-gray-500">
                {Math.round(progress.macros.protein.consumed)}g / {Math.round(progress.macros.protein.target)}g
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress.macros.protein.percentage}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="h-full bg-blue-500"
              />
            </div>
          </div>

          {/* Glucides */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Glucides</span>
              <span className="text-sm text-gray-500">
                {Math.round(progress.macros.carbs.consumed)}g / {Math.round(progress.macros.carbs.target)}g
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress.macros.carbs.percentage}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                className="h-full bg-green-500"
              />
            </div>
          </div>

          {/* Lipides */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Lipides</span>
              <span className="text-sm text-gray-500">
                {Math.round(progress.macros.fat.consumed)}g / {Math.round(progress.macros.fat.target)}g
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress.macros.fat.percentage}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                className="h-full bg-yellow-500"
              />
            </div>
          </div>
        </div>

        {/* Objectif de poids */}
        {goals.weight_goal && goals.target_weight && (
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <ScaleIcon className="h-5 w-5 text-indigo-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-700">Objectif de poids</h3>
              </div>
              <div className="flex items-center text-sm font-medium text-gray-700">
                {goals.weight_goal === 'lose' ? (
                  <ArrowTrendingDownIcon className="h-4 w-4 text-green-500 mr-1" />
                ) : goals.weight_goal === 'gain' ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 text-blue-500 mr-1" />
                ) : (
                  <MinusSmallIcon className="h-4 w-4 text-gray-500 mr-1" />
                )}
                <span>{goals.target_weight} kg</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {goals.weight_goal === 'lose' 
                ? 'Objectif de perte de poids' 
                : goals.weight_goal === 'gain' 
                  ? 'Objectif de prise de poids' 
                  : 'Maintien du poids actuel'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}