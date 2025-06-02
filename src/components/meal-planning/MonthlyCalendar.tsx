import React from "react";
import dayjs from "dayjs";
import type { DayMeals } from "@/types/meal-planning";

interface MonthlyCalendarProps {
  currentDate: dayjs.Dayjs;
  meals: Record<string, DayMeals>;
  onEditMeal: (day: string, type: "breakfast" | "lunch" | "dinner") => void;
}

const mealTypes = [
  { key: "breakfast", label: "🥣" },
  { key: "lunch", label: "🍽️" },
  { key: "dinner", label: "🌙" },
];

export default function MonthlyCalendar({ currentDate, meals, onEditMeal }: MonthlyCalendarProps) {
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.startOf("week");
  const endDay = endOfMonth.endOf("week");
  const days = [];
  let day = startDay;

  while (day.isBefore(endDay, "day") || day.isSame(endDay, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  console.log("meals keys:", Object.keys(meals));

  return (
    <div className="grid grid-cols-7 gap-1">
      {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
        <div key={d} className="font-bold text-center text-black">{d}</div>
      ))}
      {days.map((d) => {
        const dateStr = d.format("YYYY-MM-DD");
        const dayMeals = meals[dateStr] || {};
        console.log("dateStr:", dateStr, "dayMeals:", dayMeals);
        return (
          <div
            key={dateStr}
            className={`min-h-[90px] border p-1 text-xs text-black ${d.month() !== currentDate.month() ? "bg-gray-100" : ""}`}
          >
            <div className="font-semibold">{d.date()}</div>
            <div className="flex flex-col gap-1 mt-1">
              {Object.entries(dayMeals).map(([type, meal]) => (
                <div key={type} className="truncate">
                  <span>{mealTypes.find((m) => m.key === type)?.label}</span> {meal.name}
                </div>
              ))}
            </div>
            <button
              className="text-wp-green text-lg mt-1"
              onClick={() => onEditMeal(dateStr, "breakfast")}
              title="Ajouter/modifier un repas"
            >
              +
            </button>
          </div>
        );
      })}
    </div>
  );
}