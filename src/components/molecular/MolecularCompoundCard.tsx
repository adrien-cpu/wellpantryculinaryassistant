import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlaskConical } from "lucide-react";

interface MolecularCompoundProps {
  compound: {
    id: number;
    name: string;
    formula: string;
    category: string;
    foods: string[];
    flavorProfile: string[];
  };
  onSelectIngredient: (name: string) => void;
}

const MolecularCompoundCard: React.FC<MolecularCompoundProps> = ({ compound, onSelectIngredient }) => {
  return (
    <Card className="border-wp-green-light bg-white dark:bg-wp-gray-dark dark:border-wp-green-dark h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-wp-green-dark dark:text-wp-green flex items-center">
              <FlaskConical className="h-4 w-4 mr-2" />
              {compound.name}
            </CardTitle>
            <CardDescription className="font-mono">{compound.formula}</CardDescription>
          </div>
          <Badge>{compound.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Présent dans:</h4>
            <div className="flex flex-wrap gap-1">
              {compound.foods.map((food, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {food}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Profil aromatique:</h4>
            <div className="flex flex-wrap gap-1">
              {compound.flavorProfile.map((flavor, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-wp-green-light text-wp-green-dark">
                  {flavor}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onSelectIngredient(compound.name)}
          variant="outline" 
          className="w-full border-wp-green text-wp-green hover:bg-wp-green-light"
        >
          Voir les compatibilités
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MolecularCompoundCard;