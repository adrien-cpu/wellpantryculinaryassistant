import { useState } from "react";
import dayjs from "dayjs";
import MealPlannerCalendar from "@/components/meal-planning/MealPlannerCalendar";
import MealPlannerTable from "@/components/meal-planning/MealPlannerTable";
import MonthlyCalendar from "@/components/meal-planning/MonthlyCalendar";
import WeeklyVerticalView from "@/components/meal-planning/WeeklyVerticalView";
import DailyView from "@/components/meal-planning/DailyView";
import type { DayMeals } from "@/types/meal-planning";

const weekDays = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

export default function MealPlanningPage() {
  const [view, setView] = useState<"month" | "week" | "day">("week");
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState(dayjs().format("YYYY-MM-DD"));

  // Exemple de structure de données pour meals
  const [meals, setMeals] = useState<Record<string, DayMeals>>({});

  const handleEditMeal = (day: string, type: "breakfast" | "lunch" | "dinner") => {
    // Ouvre un modal ou gère l'édition du repas
    setSelectedDay(day);
    setView("day");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MealPlannerCalendar
        view={view}
        setView={setView}
      />

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
    </div>
  );
}