import { useState } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, Calendar, CalendarDays } from "lucide-react";
import type { DayMeals } from "@/types/meal-planning";

type ViewMode = "month" | "week" | "day";

export default function MealPlannerCalendar({
  view,
  setView,
  onViewChange,
  onDateChange,
}: {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  onViewChange?: (view: ViewMode) => void;
  onDateChange?: (date: dayjs.Dayjs) => void;
}) {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const goPrev = () => {
    const newDate =
      view === "month"
        ? currentDate.subtract(1, "month")
        : view === "week"
        ? currentDate.subtract(1, "week")
        : currentDate.subtract(1, "day");
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };
  const goNext = () => {
    const newDate =
      view === "month"
        ? currentDate.add(1, "month")
        : view === "week"
        ? currentDate.add(1, "week")
        : currentDate.add(1, "day");
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const handleView = (v: ViewMode) => {
    setView(v);
    onViewChange?.(v);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div className="flex gap-2">
        <button
          onClick={() => setView("month")}
          className={view === "month" ? "font-bold text-wp-green" : ""}
        >
          <Calendar className="inline w-4 h-4 mr-1" /> Mois
        </button>
        <button
          onClick={() => setView("week")}
          className={view === "week" ? "font-bold text-wp-green" : ""}
        >
          <CalendarDays className="inline w-4 h-4 mr-1" /> Semaine
        </button>
        <button
          onClick={() => setView("day")}
          className={view === "day" ? "font-bold text-wp-green" : ""}
        >
          <CalendarDays className="inline w-4 h-4 mr-1" /> Jour
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={goPrev}>
          <ChevronLeft />
        </button>
        <span className="font-semibold">
          {view === "month" &&
            currentDate.format("MMMM YYYY")}
          {view === "week" &&
            `Semaine du ${currentDate
              .startOf("week")
              .format("DD/MM")} au ${currentDate
              .endOf("week")
              .format("DD/MM")}`}
          {view === "day" && currentDate.format("dddd DD MMMM YYYY")}
        </span>
        <button onClick={goNext}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}