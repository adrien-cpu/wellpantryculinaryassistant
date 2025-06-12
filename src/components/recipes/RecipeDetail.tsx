import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@/types/recipe";
import { Clock, Users, ChefHat, Heart, Printer, Share2, BookOpen } from "lucide-react";

interface RecipeDetailProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
  onToggleFavorite?: (id: string | number, isFavorite: boolean) => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  open,
  onClose,
  onToggleFavorite
}) => {
  if (!recipe) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-wp-green-dark dark:text-wp-green">{recipe.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="rounded-lg overflow-hidden mb-4">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-64 object-cover"
              />
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-wp-green mr-2" />
                <div>
                  <p className="text-xs text-wp-gray-dark dark:text-wp-gray-light">Temps total</p>
                  <p className="font-medium">{recipe.totalTime || (recipe.preparationTime + (recipe.cookingTime || 0))} min</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <ChefHat className="h-5 w-5 text-wp-green mr-2" />
                <div>
                  <p className="text-xs text-wp-gray-dark dark:text-wp-gray-light">Difficulté</p>
                  <p className="font-medium">{recipe.difficulty}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="h-5 w-5 text-wp-green mr-2" />
                <div>
                  <p className="text-xs text-wp-gray-dark dark:text-wp-gray-light">Portions</p>
                  <p className="font-medium">{recipe.servings} personnes</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Description</h3>
              <p className="text-wp-gray-dark dark:text-wp-gray-light">{recipe.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Ingrédients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex justify-between text-wp-gray-dark dark:text-wp-gray-light">
                    <span>{ingredient.name}{ingredient.optional ? ' (optionnel)' : ''}</span>
                    <span className="font-medium">{ingredient.quantity} {ingredient.unit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Valeurs nutritionnelles</h3>
              {recipe.nutritionalInfo ? (
                <div className="grid grid-cols-5 gap-2 text-center">
                  <div className="bg-wp-green-light/20 p-2 rounded">
                    <p className="text-xs text-wp-gray-dark dark:text-wp-gray-light">Calories</p>
                    <p className="font-bold text-wp-purple">{recipe.nutritionalInfo.calories}</p>
                  </div>
                  <div className="bg-wp-green-light/20 p-2 rounded">
                    <p className="text-xs text-wp-gray-dark dark:text-wp-gray-light">Protéines</p>
                    <p className="font-bold text-wp-green">{recipe.nutritionalInfo.protein}g</p>
                  </div>
                  <div className="bg-wp-green-light/20 p-2 rounded">
                    <p className="text-xs text-wp-gray-dark dark:text-wp-gray-light">Glucides</p>
                    <p className="font-bold text-wp-orange">{recipe.nutritionalInfo.carbs}g</p>
                  </div>
                  <div className="bg-wp-green-light/20 p-2 rounded">
                    <p className="text-xs text-wp-gray-dark dark:text-wp-gray-light">Lipides</p>
                    <p className="font-bold text-wp-brown">{recipe.nutritionalInfo.fat}g</p>
                  </div>
                  <div className="bg-wp-green-light/20 p-2 rounded">
                    <p className="text-xs text-wp-gray-dark dark:text-wp-gray-light">Fibres</p>
                    <p className="font-bold text-wp-green-dark">{recipe.nutritionalInfo.fiber || 0}g</p>
                  </div>
                </div>
              ) : (
                <p className="text-wp-gray-dark dark:text-wp-gray-light italic">Information non disponible</p>
              )}
            </div>
          </div>
          
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Préparation</h3>
              <ol className="space-y-4">
                {recipe.steps.map((step) => (
                  <li key={step.stepNumber} className="relative pl-8 pb-4 border-l border-wp-green-light">
                    <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-wp-green text-white font-medium text-sm">
                      {step.stepNumber}
                    </div>
                    <p className="text-wp-gray-dark dark:text-wp-gray-light mb-1">{step.instruction}</p>
                    {step.duration && (
                      <div className="flex items-center text-xs text-wp-gray-dark dark:text-wp-gray-light mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{step.duration} min</span>
                      </div>
                    )}
                    {step.tips && (
                      <div className="mt-2 text-sm italic text-wp-orange-dark dark:text-wp-orange bg-wp-orange-light/20 p-2 rounded">
                        <span className="font-medium">Astuce :</span> {step.tips}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-wp-green-light bg-wp-green-light/50 text-wp-green-dark dark:bg-wp-green-dark/20 dark:border-wp-green-dark dark:text-wp-green-light"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center mt-6">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimer</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Partager</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Mode pas à pas</span>
            </Button>
          </div>
          
          <div className="flex gap-2">
            {onToggleFavorite && (
              <Button 
                variant={recipe.isFavorite ? "default" : "outline"} 
                className={recipe.isFavorite ? "bg-wp-green" : "border-wp-green text-wp-green"}
                onClick={() => onToggleFavorite(recipe.id, !recipe.isFavorite)}
              >
                <Heart className={`w-4 h-4 mr-2 ${recipe.isFavorite ? 'fill-white' : ''}`} />
                {recipe.isFavorite ? "Favori" : "Ajouter aux favoris"}
              </Button>
            )}
            <Button onClick={onClose}>Fermer</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetail;