
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PantryItem } from "@/types/pantry";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChefHat, Clock, Star } from "lucide-react";

interface RecipeSuggestionsDialogProps {
  open: boolean;
  onClose: () => void;
  item: PantryItem | null;
}

interface RecipeSuggestion {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  time: string;
  rating: number;
  ingredients: string[];
}

const RecipeSuggestionsDialog: React.FC<RecipeSuggestionsDialogProps> = ({ open, onClose, item }) => {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<RecipeSuggestion[]>([]);
  const { toast } = useToast();

  // Simuler le chargement des suggestions de recettes
  useEffect(() => {
    if (open && item) {
      setLoading(true);
      
      // Simulation d'une API qui retournerait des recettes basées sur l'ingrédient
      setTimeout(() => {
        const mockSuggestions: RecipeSuggestion[] = [
          {
            id: 1,
            title: `${item.name} à la provençale`,
            description: `Une recette simple et délicieuse utilisant ${item.name} et des herbes de Provence.`,
            difficulty: "Facile",
            time: "30 min",
            rating: 4.5,
            ingredients: [item.name, "Tomates", "Oignon", "Ail", "Herbes de Provence", "Huile d'olive"]
          },
          {
            id: 2,
            title: `Salade de ${item.name}`,
            description: `Une salade fraîche et légère avec ${item.name} comme ingrédient principal.`,
            difficulty: "Facile",
            time: "15 min",
            rating: 4.2,
            ingredients: [item.name, "Laitue", "Concombre", "Vinaigrette", "Noix", "Fromage de chèvre"]
          },
          {
            id: 3,
            title: `${item.name} en sauce`,
            description: `Un plat savoureux avec une sauce crémeuse qui met en valeur ${item.name}.`,
            difficulty: "Moyen",
            time: "45 min",
            rating: 4.7,
            ingredients: [item.name, "Crème fraîche", "Échalotes", "Vin blanc", "Bouillon", "Persil"]
          }
        ];
        
        setSuggestions(mockSuggestions);
        setLoading(false);
      }, 1000);
    }
  }, [open, item]);

  const handleViewRecipe = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Le détail complet des recettes sera disponible prochainement.",
      duration: 3000,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Recettes avec {item?.name}</DialogTitle>
          <DialogDescription>
            Voici des suggestions de recettes pour utiliser cet ingrédient avant qu'il n'expire
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wp-green"></div>
            </div>
          ) : (
            suggestions.map((suggestion) => (
              <Card key={suggestion.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-semibold text-wp-green-dark">{suggestion.title}</h3>
                    <p className="text-sm text-wp-gray-dark">{suggestion.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center text-sm text-wp-gray-dark">
                        <ChefHat className="w-4 h-4 mr-1" />
                        <span>{suggestion.difficulty}</span>
                      </div>
                      <div className="flex items-center text-sm text-wp-gray-dark">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{suggestion.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-wp-orange">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        <span>{suggestion.rating}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <h4 className="text-sm font-medium">Ingrédients :</h4>
                      <p className="text-sm text-wp-gray-dark">{suggestion.ingredients.join(", ")}</p>
                    </div>
                    
                    <Button 
                      onClick={handleViewRecipe} 
                      className="mt-2 w-full bg-wp-green hover:bg-wp-green-dark"
                    >
                      Voir la recette complète
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeSuggestionsDialog;
