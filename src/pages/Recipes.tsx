import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Loader2 } from "lucide-react";
import RecipeCard from "@/components/recipes/RecipeCard";
import RecipeFilters from "@/components/recipes/RecipeFilters";
import RecipeDetail from "@/components/recipes/RecipeDetail";
import RecipeCollection from "@/components/recipes/RecipeCollection";
import { useRecipes } from "@/hooks/useRecipes";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import GenerationOptions from "@/components/meal-planning/GenerationOptions";

const RecipesPage = () => {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [people, setPeople] = React.useState(2);
  const [periodType, setPeriodType] = React.useState<"jours" | "semaines" | "mois">("jours");
  const [periodValue, setPeriodValue] = React.useState(1);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const {
    recipes,
    loading,
    allTags,
    selectedRecipe,
    isDetailOpen,
    hasActiveFilters,
    handleSearch,
    handleFilterChange,
    handleClearFilters,
    handleViewRecipe,
    handleToggleFavorite,
    setIsDetailOpen
  } = useRecipes();

  const showComingSoon = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Cette fonctionnalité sera disponible prochainement.",
      duration: 3000,
    });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setModalOpen(false);
      
      toast({
        title: "Recettes générées",
        description: "De nouvelles recettes ont été générées selon vos préférences",
        duration: 3000,
      });
    }, 2000);
  };

  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-wp-green-dark dark:text-wp-green mb-2">Bibliothèque de recettes</h1>
              <p className="text-wp-gray-dark dark:text-wp-gray-light">
                Découvrez des milliers de recettes et filtrez selon vos préférences
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={() => setModalOpen(true)} className="bg-wp-green hover:bg-wp-green-dark">
                <Sparkles className="mr-2 h-4 w-4" />
                Générer avec l'IA
              </Button>
            </div>
          </div>
          
          {/* Section des collections avec onglet Favoris */}
          <div className="mb-8">
            <RecipeCollection 
              recipes={recipes}
              onViewRecipe={handleViewRecipe}
              onToggleFavorite={handleToggleFavorite}
              onCreateCollection={showComingSoon}
            />
          </div>
          
          <RecipeFilters
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            availableTags={allTags}
            hasActiveFilters={hasActiveFilters}
          />
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-wp-green" />
              <span className="ml-2 text-wp-gray-dark dark:text-wp-gray-light">Chargement des recettes...</span>
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-wp-gray-dark dark:text-wp-gray-light text-lg mb-4">Aucune recette ne correspond à vos critères</p>
              <Button onClick={handleClearFilters} variant="outline" className="border-wp-green text-wp-green">
                Effacer les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onViewRecipe={handleViewRecipe}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
          
          {recipes.length > 0 && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                onClick={showComingSoon}
                className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark"
              >
                Charger plus de recettes
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Recipe Detail Modal */}
      <RecipeDetail
        recipe={selectedRecipe}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* AI Generation Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Générer des recettes avec l'IA</DialogTitle>
          </DialogHeader>
          <GenerationOptions
            people={people}
            setPeople={setPeople}
            periodType={periodType}
            setPeriodType={setPeriodType}
            periodValue={periodValue}
            setPeriodValue={setPeriodValue}
          />
          <div className="space-y-4 mt-4">
            <div className="bg-wp-green-light/20 p-4 rounded-md">
              <h3 className="font-medium text-wp-green-dark dark:text-wp-green mb-2">Préférences supplémentaires</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="seasonal"
                    className="rounded border-wp-gray-dark text-wp-green focus:ring-wp-green mr-2"
                  />
                  <label htmlFor="seasonal" className="text-sm">Ingrédients de saison</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="quick"
                    className="rounded border-wp-gray-dark text-wp-green focus:ring-wp-green mr-2"
                  />
                  <label htmlFor="quick" className="text-sm">Recettes rapides</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="budget"
                    className="rounded border-wp-gray-dark text-wp-green focus:ring-wp-green mr-2"
                  />
                  <label htmlFor="budget" className="text-sm">Petit budget</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="molecular"
                    className="rounded border-wp-gray-dark text-wp-green focus:ring-wp-green mr-2"
                  />
                  <label htmlFor="molecular" className="text-sm">Gastronomie moléculaire</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="bg-wp-green hover:bg-wp-green-dark"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Génération...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Générer
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default RecipesPage;