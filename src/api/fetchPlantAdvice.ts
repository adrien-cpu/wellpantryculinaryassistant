export async function fetchPlantAdvice(plantName: string): Promise<string[]> {
  // Appel à une API ou IA fictive
  // Ici, tu peux simuler avec un setTimeout ou utiliser une vraie API
  return [
    `Conseil IA pour ${plantName} #1`,
    `Conseil IA pour ${plantName} #2`
  ];
}