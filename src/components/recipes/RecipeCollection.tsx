import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types/recipe";
import RecipeCard from "./RecipeCard";
import { Heart, Clock, Star, Plus } from "lucide-react";

interface RecipeCollectionProps {
  recipes: Recipe[];
  onViewRecipe: (id: string | number) => void;
  onToggleFavorite?: (id: string | number, isFavorite: boolean) => void;
  onCreateCollection?: () => void;
}

const RecipeCollection: React.FC<RecipeCollectionProps> = ({
  recipes,
  onViewRecipe,
  onToggleFavorite,
  onCreateCollection
}) => {
  const [activeTab, setActiveTab] = useState("all");

  // Filter recipes based on active tab
  const filteredRecipes = React.useMemo(() => {
    if (activeTab === "favorites") {
      return recipes.filter(recipe => recipe.isFavorite);
    }
    if (activeTab === "recent") {
      // In a real app, you would have a lastViewed property
      // For now, just return the first 3 recipes as "recent"
      return recipes.slice(0, 3);
    }
    return recipes;
  }, [recipes, activeTab]);

  return (
    <Card className="border-wp-green-light dark:border-wp-green-dark">
      <CardHeader>
        <CardTitle className="text-wp-green-dark dark:text-wp-green">Mes collections</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>Favoris</span>
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Récentes</span>
            </TabsTrigger>
            <TabsTrigger value="top" className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>Top</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onViewRecipe={onViewRecipe}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="favorites" className="space-y-6">
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecipes.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onViewRecipe={onViewRecipe}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-wp-gray-light mx-auto mb-4" />
                <p className="text-wp-gray-dark dark:text-wp-gray-light mb-4">Vous n'avez pas encore de recettes favorites</p>
                <p className="text-sm text-wp-gray-dark dark:text-wp-gray-light">Ajoutez des recettes à vos favoris pour les retrouver facilement</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recent" className="space-y-6">
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecipes.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onViewRecipe={onViewRecipe}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-wp-gray-light mx-auto mb-4" />
                <p className="text-wp-gray-dark dark:text-wp-gray-light mb-4">Vous n'avez pas encore consulté de recettes</p>
                <p className="text-sm text-wp-gray-dark dark:text-wp-gray-light">Les recettes que vous consultez apparaîtront ici</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="top" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes
                .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                .slice(0, 6)
                .map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onViewRecipe={onViewRecipe}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {onCreateCollection && (
          <div className="mt-6 flex justify-center">
            <Button 
              variant="outline" 
              onClick={onCreateCollection}
              className="border-wp-green text-wp-green hover:bg-wp-green-light"
            >
              <Plus className="w-4 h-4 mr-2" />
              Créer une collection
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeCollection;