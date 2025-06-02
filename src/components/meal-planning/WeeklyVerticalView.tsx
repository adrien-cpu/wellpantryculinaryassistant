import DailyView from "./DailyView";
import type { DayMeals } from "@/types/meal-planning";

interface WeeklyVerticalViewProps {
  weekDays: string[];
  meals: Record<string, DayMeals>;
  onEditMeal: (day: string, type: "breakfast" | "lunch" | "dinner") => void;
}

export default function WeeklyVerticalView({ weekDays, meals, onEditMeal }: WeeklyVerticalViewProps) {
  return (
    <div className="flex flex-col gap-8">
      {weekDays.map((day) => (
        <DailyView
          key={day}
          date={day}
          meals={meals}
          onEditMeal={onEditMeal}
        />
      ))}
    </div>
  );
}
