import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Star, Heart } from "lucide-react";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onViewRecipe: (id: string | number) => void;
  onToggleFavorite?: (id: string | number, isFavorite: boolean) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onViewRecipe,
  onToggleFavorite
}) => {
  const { 
    id, 
    title, 
    image, 
    preparationTime, 
    cookingTime, 
    difficulty, 
    rating, 
    tags,
    isFavorite
  } = recipe;

  const totalTime = (preparationTime || 0) + (cookingTime || 0);

  return (
    <Card className="card-hover overflow-hidden border-wp-green-light bg-white dark:bg-wp-gray-dark dark:border-wp-green-dark h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        {onToggleFavorite && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(id, !isFavorite);
            }}
            className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black transition-colors"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart 
              className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} 
            />
          </button>
        )}
      </div>
      <CardHeader className="pb-0">
        <CardTitle className="text-wp-green-dark dark:text-wp-green line-clamp-1">{title}</CardTitle>
        <CardDescription>
          <div className="flex items-center space-x-4 mt-1">
            <div className="flex items-center text-wp-gray-dark dark:text-wp-gray-light text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {totalTime} min
            </div>
            <div className="flex items-center text-wp-gray-dark dark:text-wp-gray-light text-sm">
              <FileText className="w-4 h-4 mr-1" />
              {difficulty}
            </div>
            {rating && (
              <div className="flex items-center text-wp-orange text-sm">
                <Star className="w-4 h-4 mr-1 fill-wp-orange" />
                {rating.toFixed(1)}
              </div>
            )}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="border-wp-green-light bg-wp-green-light/50 text-wp-green-dark dark:bg-wp-green-dark/20 dark:border-wp-green-dark dark:text-wp-green-light"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-wp-green hover:bg-wp-green-dark" 
          onClick={() => onViewRecipe(id)}
        >
          Voir la recette
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;