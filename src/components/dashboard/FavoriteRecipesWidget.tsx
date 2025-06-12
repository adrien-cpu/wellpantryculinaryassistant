import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types/recipe";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FavoriteRecipesWidgetProps {
  recipes: Recipe[];
  onViewRecipe: (id: string | number) => void;
}

const FavoriteRecipesWidget: React.FC<FavoriteRecipesWidgetProps> = ({ recipes, onViewRecipe }) => {
  // Filter only favorite recipes
  const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);
  
  // Take only the first 3 recipes for the widget
  const displayRecipes = favoriteRecipes.slice(0, 3);

  return (
    <Card className="border-wp-green-light dark:border-wp-green-dark">
      <CardHeader className="pb-2">
        <CardTitle className="text-wp-green-dark dark:text-wp-green flex items-center text-lg">
          <Heart className="h-5 w-5 mr-2 fill-red-500 text-red-500" />
          Recettes favorites
        </CardTitle>
      </CardHeader>
      <CardContent>
        {displayRecipes.length > 0 ? (
          <div className="space-y-4">
            {displayRecipes.map((recipe) => (
              <div 
                key={recipe.id} 
                className="flex gap-3 p-2 rounded-lg hover:bg-wp-green-light/20 transition-colors cursor-pointer"
                onClick={() => onViewRecipe(recipe.id)}
              >
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-wp-green-dark dark:text-wp-green line-clamp-1">{recipe.title}</h3>
                  <p className="text-xs text-wp-gray-dark dark:text-wp-gray-light line-clamp-2 mt-1">
                    {recipe.description || `Recette ${recipe.difficulty.toLowerCase()} prête en ${recipe.totalTime || (recipe.preparationTime + (recipe.cookingTime || 0))} minutes.`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Heart className="h-10 w-10 mx-auto mb-3 text-wp-gray-light" />
            <p className="text-wp-gray-dark dark:text-wp-gray-light mb-2">Vous n'avez pas encore de recettes favorites</p>
            <p className="text-sm text-wp-gray-dark dark:text-wp-gray-light">Ajoutez des recettes à vos favoris pour les retrouver facilement</p>
          </div>
        )}
        
        <Button asChild variant="link" className="w-full mt-4 text-wp-green">
          <Link to="/recipes" className="flex items-center justify-center">
            <span>Voir toutes les recettes</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FavoriteRecipesWidget;