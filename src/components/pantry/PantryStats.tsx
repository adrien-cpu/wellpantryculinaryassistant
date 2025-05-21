
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PantryStatsProps {
  itemsCount: number;
  fridgeCount: number;
  cabinetCount: number;
  wineCellarCount: number;
  expiringCount: number;
  onShowComingSoon: () => void;
}

const PantryStats: React.FC<PantryStatsProps> = ({
  itemsCount,
  fridgeCount,
  cabinetCount,
  wineCellarCount,
  expiringCount,
  onShowComingSoon,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques</CardTitle>
        <CardDescription>Aperçu de votre consommation</CardDescription>
      </CardHeader>
      <CardContent className="text-center py-8">
        <div className="flex justify-center space-x-8">
          <div>
            <div className="text-3xl font-bold text-wp-green-dark dark:text-wp-green">{itemsCount}</div>
            <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Articles</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-wp-green-dark dark:text-wp-green">{fridgeCount}</div>
            <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Réfrigérateur</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-wp-green-dark dark:text-wp-green">{cabinetCount}</div>
            <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Placard</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-wp-green-dark dark:text-wp-green">{wineCellarCount}</div>
            <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Cave à vin</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-wp-orange-dark">{expiringCount}</div>
            <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Expirations proches</div>
          </div>
        </div>
        
        <Button variant="link" onClick={onShowComingSoon} className="mt-6 text-wp-green-dark dark:text-wp-green">
          <span>Voir toutes les statistiques</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PantryStats;
