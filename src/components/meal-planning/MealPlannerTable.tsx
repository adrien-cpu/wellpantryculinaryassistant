import React from "react";
import { Button } from "@/components/ui/button";
import type { DayMeals } from "@/types/meal-planning";

const mealTypes = [
	{ key: "breakfast", label: "Petit-déjeuner" },
	{ key: "lunch", label: "Déjeuner" },
	{ key: "dinner", label: "Dîner" },
];

export default function MealPlannerTable({
	weekDays,
	meals,
	onEditMeal,
}: {
	weekDays: string[];
	meals: Record<string, DayMeals>;
	onEditMeal: (day: string, type: "breakfast" | "lunch" | "dinner") => void;
}) {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full border-separate border-spacing-0 bg-white rounded-lg shadow text-black">
				<thead>
					<tr>
						<th className="p-3 bg-gray-50 text-left font-semibold">Repas</th>
						{weekDays.map((day) => (
							<th
								key={day}
								className="p-3 bg-gray-50 text-center font-semibold capitalize"
							>
								{day}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{mealTypes.map((meal) => (
						<tr key={meal.key}>
							<td className="p-3 font-medium bg-gray-50">{meal.label}</td>
							{weekDays.map((day) => (
								<td
									key={day + meal.key}
									className="border p-3 text-center align-middle"
								>
									{meals[day] && meals[day][meal.key] && meals[day][meal.key].name ? (
										<div className="flex flex-col items-center gap-1">
											<span>{meals[day][meal.key].name}</span>
											<Button
												variant="ghost"
												size="sm"
												onClick={() =>
													onEditMeal(day, meal.key as "breakfast" | "lunch" | "dinner")
												}
												className="text-xs text-wp-green-dark hover:text-wp-green"
											>
												Modifier
											</Button>
										</div>
									) : (
										<Button
											variant="ghost"
											size="icon"
											onClick={() =>
												onEditMeal(day, meal.key as "breakfast" | "lunch" | "dinner")
											}
											className="text-2xl text-gray-400 hover:text-wp-green"
											aria-label="Ajouter un repas"
										>
											+
										</Button>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}