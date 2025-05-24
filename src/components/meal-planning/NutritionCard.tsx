
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { MealNutrition, UserNutritionGoals } from '@/hooks/useNutritionData';

interface NutritionCardProps {
  nutrition: MealNutrition;
  goals: UserNutritionGoals;
  title: string;
  type?: 'meal' | 'daily';
}

const NutritionCard: React.FC<NutritionCardProps> = ({ 
  nutrition, 
  goals, 
  title, 
  type = 'meal' 
}) => {
  const caloriePercentage = (nutrition.calories / goals.dailyCalories) * 100;
  const proteinGoal = (goals.dailyCalories * goals.proteinPercentage / 100) / 4; // 4 cal/g
  const carbsGoal = (goals.dailyCalories * goals.carbsPercentage / 100) / 4; // 4 cal/g
  const fatGoal = (goals.dailyCalories * goals.fatPercentage / 100) / 9; // 9 cal/g

  const getStatusColor = (percentage: number) => {
    if (type === 'daily') {
      if (percentage < 80) return 'text-orange-600';
      if (percentage > 120) return 'text-red-600';
      return 'text-wp-purple'; // Couleur violette pour les calories
    }
    return 'text-wp-purple'; // Couleur violette pour les calories même pour les repas
  };

  const getStatusBadge = (percentage: number) => {
    if (type !== 'daily') return null;
    
    if (percentage < 80) {
      return <Badge variant="outline" className="text-orange-600 border-orange-600">Faible</Badge>;
    }
    if (percentage > 120) {
      return <Badge variant="outline" className="text-red-600 border-red-600">Élevé</Badge>;
    }
    return <Badge variant="outline" className="text-wp-green border-wp-green">Optimal</Badge>;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {getStatusBadge(caloriePercentage)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-2xl font-bold ${getStatusColor(caloriePercentage)}`}>
            {nutrition.calories}
          </div>
          <div className="text-sm text-wp-gray-dark">calories</div>
          {type === 'daily' && (
            <div className="text-xs text-wp-gray-dark mt-1">
              Objectif: {goals.dailyCalories} cal
            </div>
          )}
        </div>

        {type === 'daily' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>{Math.round(caloriePercentage)}%</span>
            </div>
            <Progress 
              value={Math.min(caloriePercentage, 100)} 
              className="h-2"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center p-2 bg-wp-gray-light dark:bg-wp-gray-dark rounded">
            <div className="font-medium text-wp-green">{nutrition.protein}g</div>
            <div className="text-xs text-wp-gray-dark">Protéines</div>
            {type === 'daily' && (
              <div className="text-xs text-wp-gray-dark">
                /{Math.round(proteinGoal)}g
              </div>
            )}
          </div>
          <div className="text-center p-2 bg-wp-gray-light dark:bg-wp-gray-dark rounded">
            <div className="font-medium text-wp-orange">{nutrition.carbs}g</div>
            <div className="text-xs text-wp-gray-dark">Glucides</div>
            {type === 'daily' && (
              <div className="text-xs text-wp-gray-dark">
                /{Math.round(carbsGoal)}g
              </div>
            )}
          </div>
          <div className="text-center p-2 bg-wp-gray-light dark:bg-wp-gray-dark rounded">
            <div className="font-medium text-wp-brown-dark">{nutrition.fat}g</div>
            <div className="text-xs text-wp-gray-dark">Lipides</div>
            {type === 'daily' && (
              <div className="text-xs text-wp-gray-dark">
                /{Math.round(fatGoal)}g
              </div>
            )}
          </div>
          <div className="text-center p-2 bg-wp-gray-light dark:bg-wp-gray-dark rounded">
            <div className="font-medium text-wp-green-dark">{nutrition.fiber}g</div>
            <div className="text-xs text-wp-gray-dark">Fibres</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionCard;
