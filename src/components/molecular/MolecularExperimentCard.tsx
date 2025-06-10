import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BeakerIcon } from "lucide-react";

interface MolecularExperimentProps {
  experiment: {
    id: number;
    title: string;
    description: string;
    technique: string;
    difficulty: string;
    image: string;
  };
  onShowRecipe: (id: number) => void;
}

const MolecularExperimentCard: React.FC<MolecularExperimentProps> = ({ experiment, onShowRecipe }) => {
  return (
    <Card className="overflow-hidden border-wp-green-light bg-white dark:bg-wp-gray-dark dark:border-wp-green-dark h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={experiment.image} 
          alt={experiment.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-wp-green-dark dark:text-wp-green">{experiment.title}</CardTitle>
          <Badge className={
            experiment.difficulty === "Facile" 
              ? "bg-wp-green" 
              : experiment.difficulty === "Moyen"
              ? "bg-wp-orange"
              : "bg-red-500"
          }>
            {experiment.difficulty}
          </Badge>
        </div>
        <CardDescription>{experiment.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center mb-4">
          <BeakerIcon className="h-4 w-4 text-wp-green mr-2" />
          <span className="text-sm">{experiment.technique}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onShowRecipe(experiment.id)} 
          className="w-full bg-wp-green hover:bg-wp-green-dark"
        >
          Voir la recette
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MolecularExperimentCard;