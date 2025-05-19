
export interface Plant {
  id: number;
  name: string;
  image: string;
  wateringStatus: number;
  lastWatered: string;
  nextWatering: string;
  growthStage: string;
  tips: string;
  type: string;
}

export const gardenPlants: Plant[] = [
  {
    id: 1,
    name: "Basilic",
    image: "https://images.unsplash.com/photo-1592086326871-f7cf2f1801e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFzaWx8ZW58MHx8MHx8fDA%3D",
    wateringStatus: 80,
    lastWatered: "Hier",
    nextWatering: "Demain",
    growthStage: "Mature",
    tips: "Placez en plein soleil, arrosez régulièrement sans mouiller les feuilles.",
    type: "Herbe aromatique",
  },
  {
    id: 2,
    name: "Menthe",
    image: "https://images.unsplash.com/photo-1586032788002-c4e4e6edda2b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWludCUyMHBsYW50fGVufDB8fDB8fHww",
    wateringStatus: 40,
    lastWatered: "Il y a 3 jours",
    nextWatering: "Aujourd'hui",
    growthStage: "Mature",
    tips: "Préfère l'ombre partielle, attention à son expansion rapide.",
    type: "Herbe aromatique",
  },
  {
    id: 3,
    name: "Ciboulette",
    image: "https://images.unsplash.com/photo-1558622769-311935921b3d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpdmVzfGVufDB8fDB8fHww",
    wateringStatus: 65,
    lastWatered: "Il y a 2 jours",
    nextWatering: "Dans 2 jours",
    growthStage: "Jeune plant",
    tips: "Arrosez régulièrement, récoltez en coupant à 2 cm du sol.",
    type: "Herbe aromatique",
  },
  {
    id: 4,
    name: "Tomates cerises",
    image: "https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlcnJ5JTIwdG9tYXRvJTIwcGxhbnR8ZW58MHx8MHx8fDA%3D",
    wateringStatus: 30,
    lastWatered: "Il y a 4 jours",
    nextWatering: "Urgent !",
    growthStage: "Floraison",
    tips: "Besoin de beaucoup de soleil et de soutien pour les tiges.",
    type: "Légume",
  },
  {
    id: 5,
    name: "Persil",
    image: "https://images.unsplash.com/photo-1599491343332-92425a76dd22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFyc2xleXxlbnwwfHwwfHx8MA%3D%3D",
    wateringStatus: 70,
    lastWatered: "Il y a 1 jour",
    nextWatering: "Dans 3 jours",
    growthStage: "Mature",
    tips: "Évitez l'exposition directe au soleil en été.",
    type: "Herbe aromatique",
  },
  {
    id: 6,
    name: "Thym",
    image: "https://images.unsplash.com/photo-1553438755-476e4c5ac845?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGh5bWV8ZW58MHx8MHx8fDA%3D",
    wateringStatus: 60,
    lastWatered: "Il y a 2 jours",
    nextWatering: "Dans 2 jours",
    growthStage: "Mature",
    tips: "Plante méditerranéenne qui préfère un sol sec et drainé.",
    type: "Herbe aromatique",
  },
];
