import type { DayMeals } from "@/types/meal-planning";

interface DailyViewProps {
  date: string; // ex: "Lundi"
  meals: Record<string, DayMeals>;
  onEditMeal: (day: string, type: "breakfast" | "lunch" | "dinner") => void;
}

const mealTypes = [
  { key: "breakfast", label: "Petit-déjeuner" },
  { key: "lunch", label: "Déjeuner" },
  { key: "dinner", label: "Dîner" },
];

export default function DailyView({ date, meals, onEditMeal }: DailyViewProps) {
  // Récupère les repas du jour
  const dayMeals = meals[date] || {};

  // Simule des données nutritionnelles pour l'exemple
  const nutrition = {
    breakfast: { calories: 320, proteins: 12, carbs: 45, fats: 8, fibers: 6 },
    lunch: { calories: 450, proteins: 25, carbs: 55, fats: 12, fibers: 8 },
    dinner: { calories: 520, proteins: 30, carbs: 60, fats: 18, fibers: 5 },
  };

  // Calcule le total du jour
  const total = {
    calories: 320 + 450 + 520,
    proteins: 12 + 25 + 30,
    carbs: 45 + 55 + 60,
    fats: 8 + 12 + 18,
    fibers: 6 + 8 + 5,
  };

  console.log("date", date, "meals", meals, "dayMeals", dayMeals);

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-wp-green mb-6">{date}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {mealTypes.map((meal) => (
          <div key={meal.key} className="bg-wp-gray-dark rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">{meal.label}</h3>
            <div className="mb-2">{dayMeals[meal.key]?.name || <span className="italic text-gray-400">Non planifié</span>}</div>
            <div className="mb-2 text-sm text-gray-300">{dayMeals[meal.key]?.description}</div>
            <button
              className="text-wp-green font-semibold mt-2"
              onClick={() => onEditMeal(date, meal.key as "breakfast" | "lunch" | "dinner")}
            >
              Modifier
            </button>
            <div className="mt-4">
              <div className="font-bold">Nutrition</div>
              <div className="text-2xl text-purple-400 font-bold">{nutrition[meal.key].calories} <span className="text-base font-normal">calories</span></div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div className="text-green-400">{nutrition[meal.key].proteins}g Protéines</div>
                <div className="text-orange-400">{nutrition[meal.key].carbs}g Glucides</div>
                <div className="text-yellow-400">{nutrition[meal.key].fats}g Lipides</div>
                <div className="text-green-600">{nutrition[meal.key].fibers}g Fibres</div>
              </div>
            </div>
          </div>
        ))}
        {/* Total du jour */}
        <div className="bg-wp-gray-dark rounded-lg p-6 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Total {date}</h3>
            <div className="text-3xl text-orange-500 font-bold">{total.calories}</div>
            <div className="text-gray-400 text-sm">Objectif: 2000 cal</div>
            <div className="mt-2">Progression <span className="ml-2">{Math.round((total.calories / 2000) * 100)}%</span></div>
            <div className="w-full h-2 bg-gray-700 rounded mt-1 mb-2">
              <div
                className="h-2 bg-green-500 rounded"
                style={{ width: `${Math.min(100, (total.calories / 2000) * 100)}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
            <div className="text-green-400">{total.proteins}g Protéines</div>
            <div className="text-orange-400">{total.carbs}g Glucides</div>
            <div className="text-yellow-400">{total.fats}g Lipides</div>
            <div className="text-green-600">{total.fibers}g Fibres</div>
          </div>
        </div>
      </div>
    </div>
  );
}