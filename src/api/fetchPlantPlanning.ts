import type { Task } from "@/components/garden/GardenData";

export async function fetchPlantPlanning(plantName: string, dateAjout: string): Promise<Task[]> {
  // Simule un appel IA/API
  return [
    { date: dateAjout, action: "Planter", done: true },
    { date: "Dans 3 jours", action: "Arroser", done: false },
    { date: "Dans 7 jours", action: "Fertiliser", done: false }
  ];
}