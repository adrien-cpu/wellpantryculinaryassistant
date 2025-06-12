import { Recipe } from "@/types/recipe";

export const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Risotto aux champignons",
    description: "Un risotto crémeux aux champignons de Paris et shiitake, parfumé au parmesan et à l'huile de truffe.",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJpc290dG98ZW58MHx8MHx8fDA%3D",
    preparationTime: 15,
    cookingTime: 25,
    totalTime: 40,
    difficulty: "Moyen",
    servings: 4,
    ingredients: [
      { name: "Riz arborio", quantity: 320, unit: "g" },
      { name: "Champignons de Paris", quantity: 250, unit: "g" },
      { name: "Champignons shiitake", quantity: 100, unit: "g" },
      { name: "Oignon", quantity: 1, unit: "pièce" },
      { name: "Ail", quantity: 2, unit: "gousses" },
      { name: "Bouillon de légumes", quantity: 1, unit: "L" },
      { name: "Vin blanc sec", quantity: 100, unit: "ml" },
      { name: "Parmesan râpé", quantity: 80, unit: "g" },
      { name: "Huile d'olive", quantity: 3, unit: "cuillères à soupe" },
      { name: "Huile de truffe", quantity: 1, unit: "cuillère à café", optional: true },
      { name: "Sel", quantity: 1, unit: "pincée" },
      { name: "Poivre", quantity: 1, unit: "pincée" },
      { name: "Persil frais", quantity: 2, unit: "cuillères à soupe" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Nettoyer et couper les champignons en petits morceaux.", duration: 5 },
      { stepNumber: 2, instruction: "Émincer finement l'oignon et l'ail.", duration: 3 },
      { stepNumber: 3, instruction: "Dans une casserole, faire chauffer le bouillon de légumes et le maintenir à frémissement.", duration: 2 },
      { stepNumber: 4, instruction: "Dans une grande poêle, faire revenir l'oignon dans l'huile d'olive jusqu'à ce qu'il soit translucide.", duration: 3 },
      { stepNumber: 5, instruction: "Ajouter l'ail et les champignons, faire revenir 5 minutes.", duration: 5 },
      { stepNumber: 6, instruction: "Ajouter le riz et le faire nacrer pendant 2 minutes en remuant constamment.", duration: 2 },
      { stepNumber: 7, instruction: "Verser le vin blanc et laisser évaporer complètement.", duration: 2 },
      { stepNumber: 8, instruction: "Ajouter le bouillon chaud une louche à la fois, en attendant qu'il soit absorbé avant d'en ajouter une nouvelle. Remuer régulièrement.", duration: 18, tips: "Cette étape est cruciale pour la texture crémeuse du risotto." },
      { stepNumber: 9, instruction: "Quand le riz est al dente (après environ 18 minutes), retirer du feu et incorporer le parmesan râpé.", duration: 2 },
      { stepNumber: 10, instruction: "Assaisonner avec du sel, du poivre, et ajouter l'huile de truffe si désirée.", duration: 1 },
      { stepNumber: 11, instruction: "Servir immédiatement, parsemé de persil frais ciselé.", duration: 1 }
    ],
    tags: ["Végétarien", "Italien", "Champignons"],
    nutritionalInfo: {
      calories: 450,
      protein: 12,
      carbs: 65,
      fat: 15,
      fiber: 3
    },
    rating: 4.8
  },
  {
    id: 2,
    title: "Buddha bowl au tofu",
    description: "Un bol complet et équilibré avec du tofu mariné, des légumes croquants et une sauce tahini crémeuse.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1ZGRoYSUyMGJvd2x8ZW58MHx8MHx8fDA%3D",
    preparationTime: 20,
    cookingTime: 15,
    totalTime: 35,
    difficulty: "Facile",
    servings: 2,
    ingredients: [
      { name: "Tofu ferme", quantity: 200, unit: "g" },
      { name: "Sauce soja", quantity: 2, unit: "cuillères à soupe" },
      { name: "Sirop d'érable", quantity: 1, unit: "cuillère à soupe" },
      { name: "Huile de sésame", quantity: 1, unit: "cuillère à café" },
      { name: "Quinoa", quantity: 100, unit: "g" },
      { name: "Carottes", quantity: 2, unit: "pièces" },
      { name: "Concombre", quantity: 1, unit: "pièce" },
      { name: "Avocat", quantity: 1, unit: "pièce" },
      { name: "Chou rouge", quantity: 100, unit: "g" },
      { name: "Edamame", quantity: 100, unit: "g" },
      { name: "Tahini", quantity: 2, unit: "cuillères à soupe" },
      { name: "Jus de citron", quantity: 1, unit: "cuillère à soupe" },
      { name: "Eau", quantity: 2, unit: "cuillères à soupe" },
      { name: "Graines de sésame", quantity: 1, unit: "cuillère à soupe" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Couper le tofu en cubes et le mariner dans un mélange de sauce soja, sirop d'érable et huile de sésame pendant au moins 15 minutes.", duration: 15, tips: "Plus le tofu marine longtemps, plus il sera savoureux." },
      { stepNumber: 2, instruction: "Rincer le quinoa et le cuire selon les instructions du paquet (généralement 15 minutes dans 2 fois son volume d'eau).", duration: 15 },
      { stepNumber: 3, instruction: "Pendant ce temps, râper les carottes, trancher finement le chou rouge et couper le concombre et l'avocat en dés.", duration: 10 },
      { stepNumber: 4, instruction: "Faire revenir le tofu mariné dans une poêle à feu moyen-vif jusqu'à ce qu'il soit doré sur toutes les faces.", duration: 8 },
      { stepNumber: 5, instruction: "Préparer la sauce en mélangeant le tahini, le jus de citron et l'eau jusqu'à obtenir une consistance crémeuse.", duration: 2 },
      { stepNumber: 6, instruction: "Assembler les bols : quinoa au fond, puis disposer harmonieusement les légumes, le tofu et les edamame.", duration: 5 },
      { stepNumber: 7, instruction: "Arroser de sauce tahini et saupoudrer de graines de sésame avant de servir.", duration: 1 }
    ],
    tags: ["Végétalien", "Sain", "Sans gluten"],
    nutritionalInfo: {
      calories: 520,
      protein: 22,
      carbs: 45,
      fat: 28,
      fiber: 12
    },
    rating: 4.6
  },
  {
    id: 3,
    title: "Lasagnes aux légumes",
    description: "Des lasagnes généreuses aux légumes de saison, avec une béchamel légère et du fromage gratiné.",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFzYWduYXxlbnwwfHwwfHx8MA%3D%3D",
    preparationTime: 30,
    cookingTime: 45,
    totalTime: 75,
    difficulty: "Moyen",
    servings: 6,
    ingredients: [
      { name: "Feuilles de lasagne", quantity: 12, unit: "pièces" },
      { name: "Courgettes", quantity: 2, unit: "pièces" },
      { name: "Aubergine", quantity: 1, unit: "pièce" },
      { name: "Poivron rouge", quantity: 1, unit: "pièce" },
      { name: "Oignon", quantity: 1, unit: "pièce" },
      { name: "Ail", quantity: 3, unit: "gousses" },
      { name: "Tomates concassées", quantity: 800, unit: "g" },
      { name: "Concentré de tomate", quantity: 2, unit: "cuillères à soupe" },
      { name: "Lait", quantity: 500, unit: "ml" },
      { name: "Farine", quantity: 40, unit: "g" },
      { name: "Beurre", quantity: 40, unit: "g" },
      { name: "Fromage râpé", quantity: 200, unit: "g" },
      { name: "Huile d'olive", quantity: 3, unit: "cuillères à soupe" },
      { name: "Herbes de Provence", quantity: 1, unit: "cuillère à café" },
      { name: "Sel", quantity: 1, unit: "pincée" },
      { name: "Poivre", quantity: 1, unit: "pincée" }
    ],
    steps: [
      { stepNumber: 1, instruction: "Préchauffer le four à 180°C.", duration: 1 },
      { stepNumber: 2, instruction: "Couper les légumes (courgettes, aubergine, poivron) en petits dés et émincer l'oignon et l'ail.", duration: 10 },
      { stepNumber: 3, instruction: "Dans une grande poêle, faire revenir l'oignon et l'ail dans l'huile d'olive jusqu'à ce qu'ils soient translucides.", duration: 3 },
      { stepNumber: 4, instruction: "Ajouter les légumes et les faire revenir à feu moyen pendant 10 minutes.", duration: 10 },
      { stepNumber: 5, instruction: "Ajouter les tomates concassées, le concentré de tomate, les herbes de Provence, le sel et le poivre. Laisser mijoter 15 minutes à feu doux.", duration: 15, tips: "Si la sauce est trop liquide, laissez-la réduire un peu plus longtemps." },
      { stepNumber: 6, instruction: "Pendant ce temps, préparer la béchamel : faire fondre le beurre dans une casserole, ajouter la farine et remuer pour former un roux. Cuire 1 minute.", duration: 2 },
      { stepNumber: 7, instruction: "Verser progressivement le lait chaud tout en fouettant pour éviter les grumeaux. Cuire à feu doux jusqu'à épaississement.", duration: 5 },
      { stepNumber: 8, instruction: "Dans un plat à gratin, alterner les couches : sauce tomate aux légumes, feuilles de lasagne, béchamel, et répéter jusqu'à épuisement des ingrédients.", duration: 10 },
      { stepNumber: 9, instruction: "Terminer par une couche de béchamel et saupoudrer généreusement de fromage râpé.", duration: 2 },
      { stepNumber: 10, instruction: "Enfourner pour 30-35 minutes, jusqu'à ce que le dessus soit doré et bouillonnant.", duration: 35 },
      { stepNumber: 11, instruction: "Laisser reposer 10 minutes avant de servir.", duration: 10, tips: "Cette étape est importante pour que les lasagnes se tiennent mieux à la découpe." }
    ],
    tags: ["Végétarien", "Italien", "Plat familial"],
    nutritionalInfo: {
      calories: 380,
      protein: 15,
      carbs: 42,
      fat: 18,
      fiber: 6
    },
    rating: 4.7
  }
];