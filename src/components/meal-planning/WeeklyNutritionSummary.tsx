
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MealNutrition, UserNutritionGoals } from '@/hooks/useNutritionData';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface WeeklyNutritionSummaryProps {
  weeklyAverage: MealNutrition;
  goals: UserNutritionGoals;
}

const WeeklyNutritionSummary: React.FC<WeeklyNutritionSummaryProps> = ({
  weeklyAverage,
  goals
}) => {
  const caloriePercentage = (weeklyAverage.calories / goals.dailyCalories) * 100;

  const getTrendIcon = (percentage: number) => {
    if (percentage > 105) return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (percentage < 95) return <TrendingDown className="h-4 w-4 text-orange-500" />;
    return <Minus className="h-4 w-4 text-wp-green" />;
  };

  const getTrendText = (percentage: number) => {
    if (percentage > 105) return "Au-dessus de l'objectif";
    if (percentage < 95) return "En-dessous de l'objectif";
    return "Dans l'objectif";
  };

  const getTrendColor = (percentage: number) => {
    if (percentage > 105) return "text-red-600";
    if (percentage < 95) return "text-orange-600";
    return "text-wp-purple"; // Nouvelle couleur pour les calories
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Résumé nutritionnel hebdomadaire
          {getTrendIcon(caloriePercentage)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${getTrendColor(caloriePercentage)}`}>
            {weeklyAverage.calories}
          </div>
          <div className="text-sm text-wp-gray-dark">calories/jour en moyenne</div>
          <div className={`text-sm ${getTrendColor(caloriePercentage)}`}>
            {getTrendText(caloriePercentage)}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progression moyenne</span>
            <span>{Math.round(caloriePercentage)}%</span>
          </div>
          <Progress value={Math.min(caloriePercentage, 100)} className="h-3" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-wp-green-light rounded-lg">
            <div className="text-lg font-semibold text-wp-green">{weeklyAverage.protein}g</div>
            <div className="text-sm text-wp-gray-dark">Protéines/jour</div>
          </div>
          <div className="text-center p-3 bg-wp-orange-light rounded-lg">
            <div className="text-lg font-semibold text-wp-orange">{weeklyAverage.carbs}g</div>
            <div className="text-sm text-wp-gray-dark">Glucides/jour</div>
          </div>
          <div className="text-center p-3 bg-wp-brown-light rounded-lg">
            <div className="text-lg font-semibold text-wp-brown-dark">{weeklyAverage.fat}g</div>
            <div className="text-sm text-wp-gray-dark">Lipides/jour</div>
          </div>
          <div className="text-center p-3 bg-wp-green-light rounded-lg">
            <div className="text-lg font-semibold text-wp-green-dark">{weeklyAverage.fiber}g</div>
            <div className="text-sm text-wp-gray-dark">Fibres/jour</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyNutritionSummary;
