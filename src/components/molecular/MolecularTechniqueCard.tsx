import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BeakerIcon, BookOpen } from "lucide-react";

interface MolecularTechniqueProps {
  technique: {
    id: number;
    name: string;
    description: string;
    difficulty: string;
    equipment: string[];
    image: string;
  };
  onShowDetails: (id: number) => void;
}

const MolecularTechniqueCard: React.FC<MolecularTechniqueProps> = ({ technique, onShowDetails }) => {
  return (
    <Card className="overflow-hidden border-wp-green-light bg-white dark:bg-wp-gray-dark dark:border-wp-green-dark h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={technique.image} 
          alt={technique.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-wp-green-dark dark:text-wp-green">{technique.name}</CardTitle>
          <Badge className={
            technique.difficulty === "Facile" 
              ? "bg-wp-green" 
              : technique.difficulty === "Moyen"
              ? "bg-wp-orange"
              : "bg-red-500"
          }>
            {technique.difficulty}
          </Badge>
        </div>
        <CardDescription>{technique.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h4 className="text-sm font-medium mb-2">Équipement nécessaire:</h4>
        <div className="flex flex-wrap gap-1 mb-4">
          {technique.equipment.map((item, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onShowDetails(technique.id)} 
          className="w-full bg-wp-green hover:bg-wp-green-dark"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Voir les tutoriels
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MolecularTechniqueCard;