import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BeakerIcon, Clock, FlaskConical, Utensils } from "lucide-react";

interface MolecularExperimentDetailsProps {
  open: boolean;
  onClose: () => void;
  experiment: {
    id: number;
    title: string;
    description: string;
    technique: string;
    difficulty: string;
    image: string;
  } | null;
}

const MolecularExperimentDetails: React.FC<MolecularExperimentDetailsProps> = ({
  open,
  onClose,
  experiment
}) => {
  if (!experiment) return null;

  // Données simulées pour la recette
  const recipe = {
    prepTime: "30 minutes",
    cookTime: "15 minutes",
    servings: 4,
    ingredients: [
      { name: "Jus de mangue", quantity: "250ml" },
      { name: "Alginate de sodium", quantity: "5g" },
      { name: "Chlorure de calcium", quantity: "5g" },
      { name: "Eau distillée", quantity: "2L" },
      { name: "Sucre", quantity: "30g" },
      { name: "Jus de citron", quantity: "10ml" }
    ],
    steps: [
      "Mélangez le jus de mangue avec le sucre et le jus de citron.",
      "Dans un bol séparé, mélangez 5g d'alginate de sodium avec 1L d'eau distillée à l'aide d'un mixeur plongeant. Laissez reposer 24h au réfrigérateur.",
      "Dans un autre bol, mélangez 5g de chlorure de calcium avec 1L d'eau distillée.",
      "Ajoutez le mélange de jus de mangue à la solution d'alginate et mélangez délicatement.",
      "À l'aide d'une pipette ou d'une seringue, déposez goutte à goutte le mélange dans la solution de chlorure de calcium.",
      "Laissez les sphères se former pendant 2 minutes, puis récupérez-les avec une cuillère à égoutter.",
      "Rincez délicatement les sphères dans de l'eau froide pour éliminer le goût de calcium.",
      "Servez immédiatement ou conservez dans du jus de mangue frais jusqu'au service."
    ],
    tips: [
      "Pour des sphères plus grandes, utilisez une cuillère à mesurer au lieu d'une pipette.",
      "Vous pouvez remplacer la mangue par n'importe quel jus de fruit filtré.",
      "Les sphères sont meilleures consommées dans les 24 heures."
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-wp-green" />
            <DialogTitle className="text-xl">{experiment.title}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="rounded-lg overflow-hidden mb-4">
              <img 
                src={experiment.image} 
                alt={experiment.title} 
                className="w-full h-64 object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Description</h3>
                <p className="text-wp-gray-dark dark:text-wp-gray-light">{experiment.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <BeakerIcon className="h-5 w-5 text-wp-green mr-2" />
                  <span className="text-wp-gray-dark dark:text-wp-gray-light">{experiment.technique}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-wp-orange mr-2" />
                  <span className="text-wp-gray-dark dark:text-wp-gray-light">Préparation: {recipe.prepTime}</span>
                </div>
                <div className="flex items-center">
                  <Utensils className="h-5 w-5 text-wp-orange mr-2" />
                  <span className="text-wp-gray-dark dark:text-wp-gray-light">{recipe.servings} portions</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Ingrédients</h3>
                <ul className="space-y-1">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex justify-between text-wp-gray-dark dark:text-wp-gray-light">
                      <span>{ingredient.name}</span>
                      <span className="font-medium">{ingredient.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Instructions</h3>
              <ol className="space-y-3 list-decimal list-inside">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="text-wp-gray-dark dark:text-wp-gray-light pl-2">
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Conseils</h3>
              <ul className="space-y-2">
                {recipe.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-wp-gray-dark dark:text-wp-gray-light">
                    <FlaskConical className="h-4 w-4 text-wp-orange mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-wp-green-light/20 dark:bg-wp-green-dark/20 p-4 rounded-lg border border-wp-green-light dark:border-wp-green-dark">
              <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Présentation suggérée</h3>
              <p className="text-wp-gray-dark dark:text-wp-gray-light">
                Servez les perles de mangue sur une cuillère à dégustation avec un peu de crème fouettée à la vanille 
                et quelques zestes de citron vert. Pour un effet visuel saisissant, placez les perles sur un miroir 
                ou une assiette noire.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Fermer</Button>
          <Button className="bg-wp-green hover:bg-wp-green-dark">
            Sauvegarder dans mes favoris
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MolecularExperimentDetails;