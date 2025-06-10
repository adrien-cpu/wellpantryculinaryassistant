import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BeakerIcon, CheckCircle2, Clock, FlaskConical } from "lucide-react";

interface MolecularTechniqueDetailsProps {
  open: boolean;
  onClose: () => void;
  technique: {
    id: number;
    name: string;
    description: string;
    difficulty: string;
    equipment: string[];
    image: string;
  } | null;
}

const MolecularTechniqueDetails: React.FC<MolecularTechniqueDetailsProps> = ({
  open,
  onClose,
  technique
}) => {
  if (!technique) return null;

  // Données simulées pour le tutoriel
  const tutorial = {
    steps: [
      "Préparez la solution d'alginate de sodium en mélangeant 5g d'alginate dans 1L d'eau.",
      "Mélangez vigoureusement jusqu'à dissolution complète et laissez reposer 24h au réfrigérateur.",
      "Préparez la solution de chlorure de calcium en mélangeant 5g dans 1L d'eau.",
      "Mélangez le liquide à sphérifier avec quelques gouttes de citron pour l'acidifier légèrement.",
      "À l'aide d'une pipette ou d'une seringue, déposez goutte à goutte le liquide dans la solution de chlorure de calcium.",
      "Laissez les sphères se former pendant 2 minutes, puis récupérez-les avec une cuillère à égoutter.",
      "Rincez délicatement les sphères dans de l'eau froide pour éliminer le goût de calcium."
    ],
    tips: [
      "Utilisez toujours de l'eau distillée pour de meilleurs résultats.",
      "Les liquides trop acides (pH < 3.6) ne fonctionneront pas bien avec l'alginate.",
      "Pour des sphères plus solides, laissez-les plus longtemps dans le bain de calcium.",
      "Les sphères peuvent être conservées dans leur liquide d'origine jusqu'au service."
    ],
    applications: [
      "Caviar de fruits pour desserts",
      "Sphères de vinaigrette pour salades",
      "Perles de sauce pour viandes et poissons",
      "Cocktails moléculaires"
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <BeakerIcon className="h-6 w-6 text-wp-green" />
            <DialogTitle className="text-xl">{technique.name}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="rounded-lg overflow-hidden mb-4">
              <img 
                src={technique.image} 
                alt={technique.name} 
                className="w-full h-64 object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Description</h3>
                <p className="text-wp-gray-dark dark:text-wp-gray-light">{technique.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Équipement nécessaire</h3>
                <div className="flex flex-wrap gap-2">
                  {technique.equipment.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Applications culinaires</h3>
                <ul className="space-y-1">
                  {tutorial.applications.map((app, index) => (
                    <li key={index} className="flex items-start gap-2 text-wp-gray-dark dark:text-wp-gray-light">
                      <CheckCircle2 className="h-4 w-4 text-wp-green mt-0.5" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Tutoriel pas à pas
              </h3>
              <ol className="space-y-3 list-decimal list-inside">
                {tutorial.steps.map((step, index) => (
                  <li key={index} className="text-wp-gray-dark dark:text-wp-gray-light pl-2">
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Conseils d'expert</h3>
              <ul className="space-y-2">
                {tutorial.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-wp-gray-dark dark:text-wp-gray-light">
                    <FlaskConical className="h-4 w-4 text-wp-orange mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-wp-green-light/20 dark:bg-wp-green-dark/20 p-4 rounded-lg border border-wp-green-light dark:border-wp-green-dark">
              <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Science derrière la technique</h3>
              <p className="text-wp-gray-dark dark:text-wp-gray-light">
                La sphérification repose sur la réaction entre l'alginate de sodium et le chlorure de calcium. 
                L'alginate est un polymère extrait d'algues brunes qui, en présence d'ions calcium, forme un gel 
                semi-perméable. Cette réaction se produit uniquement à la surface du liquide, créant ainsi une 
                membrane fine qui encapsule le liquide à l'intérieur.
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

export default MolecularTechniqueDetails;