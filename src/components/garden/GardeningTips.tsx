
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const GardeningTips: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conseils de jardinage</CardTitle>
        <CardDescription>Astuces pour entretenir votre potager d'intérieur</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-wp-green-light rounded-md dark:bg-wp-green-dark/30">
            <h3 className="font-medium text-wp-green-dark dark:text-wp-green mb-2">Arrosage optimal</h3>
            <p className="text-wp-gray-dark dark:text-wp-gray-light">
              La plupart des herbes aromatiques préfèrent un arrosage modéré. Attendez que la couche supérieure du sol soit sèche avant d'arroser à nouveau.
            </p>
          </div>
          
          <div className="p-4 bg-wp-green-light rounded-md dark:bg-wp-green-dark/30">
            <h3 className="font-medium text-wp-green-dark dark:text-wp-green mb-2">Lumière adéquate</h3>
            <p className="text-wp-gray-dark dark:text-wp-gray-light">
              Placez vos plantes près d'une fenêtre orientée sud ou ouest pour un ensoleillement optimal. En hiver, envisagez d'utiliser une lampe de culture.
            </p>
          </div>
          
          <div className="p-4 bg-wp-green-light rounded-md dark:bg-wp-green-dark/30">
            <h3 className="font-medium text-wp-green-dark dark:text-wp-green mb-2">Récolte régulière</h3>
            <p className="text-wp-gray-dark dark:text-wp-gray-light">
              Récoltez régulièrement vos herbes pour stimuler leur croissance. Ne prélevez jamais plus d'un tiers de la plante à la fois.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GardeningTips;
