import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types/recipe";
import { Clock, ChefHat, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface RecipeWidgetProps {
  recipes: Recipe[];
  onViewRecipe: (id: string | number) => void;
}

const RecipeWidget: React.FC<RecipeWidgetProps> = ({ recipes, onViewRecipe }) => {
  // Take only the first 3 recipes for the widget
  const displayRecipes = recipes.slice(0, 3);

  return (
    <Card className="border-wp-green-light dark:border-wp-green-dark">
      <CardHeader className="pb-2">
        <CardTitle className="text-wp-green-dark dark:text-wp-green flex items-center text-lg">
          Recettes recommandées
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                <div className="flex items-center gap-3 text-xs text-wp-gray-dark dark:text-wp-gray-light mt-1">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{recipe.totalTime || (recipe.preparationTime + (recipe.cookingTime || 0))} min</span>
                  </div>
                  <div className="flex items-center">
                    <ChefHat className="w-3 h-3 mr-1" />
                    <span>{recipe.difficulty}</span>
                  </div>
                  {recipe.rating && (
                    <div className="flex items-center text-wp-orange">
                      <Star className="w-3 h-3 mr-1 fill-wp-orange" />
                      <span>{recipe.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
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

export default RecipeWidget;