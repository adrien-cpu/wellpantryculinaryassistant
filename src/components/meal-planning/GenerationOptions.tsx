import React from "react";

interface GenerationOptionsProps {
  people: number;
  setPeople: (n: number) => void;
  periodType: "jours" | "semaines" | "mois";
  setPeriodType: (t: "jours" | "semaines" | "mois") => void;
  periodValue: number;
  setPeriodValue: (n: number) => void;
  // Ajoute ici d'autres options communes si besoin
}

export default function GenerationOptions({
  people, setPeople, periodType, setPeriodType, periodValue, setPeriodValue
}: GenerationOptionsProps) {
  return (
    <div className="flex flex-col gap-4 text-black dark:text-white p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold">Options de génération</h3>
      <label>
        Nombre de personnes :
        <input
          type="number"
          min={1}
          value={people}
          onChange={e => setPeople(Number(e.target.value))}
          className="ml-2 border rounded px-2 py-1 text-black dark:text-white bg-white dark:bg-gray-700"
        />
      </label>
      <label>
        Période :
        <input 
          type="number"
          min={1}
          value={periodValue}
          onChange={e => setPeriodValue(Number(e.target.value))}
          className="ml-2 border rounded px-2 py-1 w-16 text-black dark:text-white bg-white dark:bg-gray-700"
        />
        <select
          value={periodType}
          onChange={e => setPeriodType(e.target.value as "jours" | "semaines" | "mois")}
          className="ml-2 border rounded px-2 py-1 text-black dark:text-white bg-white dark:bg-gray-700"
        >
          <option value="jours">jours</option>
          <option value="semaines">semaines</option>
          <option value="mois">mois</option>
        </select>
      </label>
      {/* Ajoute ici d'autres options communes */}
    </div>
  );
}