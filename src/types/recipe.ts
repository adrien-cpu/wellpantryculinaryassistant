export interface RecipeIngredient {
  id?: string;
  name: string;
  quantity: number;
  unit: string;
  optional?: boolean;
}

export interface RecipeStep {
  id?: string;
  stepNumber: number;
  instruction: string;
  duration?: number;
  tips?: string;
}

export interface Recipe {
  id: string | number;
  title: string;
  description?: string;
  image: string;
  preparationTime: number;
  cookingTime?: number;
  totalTime?: number;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  servings: number;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tags: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
  };
  rating?: number;
  authorId?: string;
  isFavorite?: boolean;
}