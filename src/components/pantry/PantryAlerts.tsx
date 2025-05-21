
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PantryItem } from "@/types/pantry";

interface PantryAlertsProps {
  expiringItems: PantryItem[];
  onShowComingSoon: () => void;
}

const PantryAlerts: React.FC<PantryAlertsProps> = ({ expiringItems, onShowComingSoon }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertes d'expiration</CardTitle>
        <CardDescription>Aliments qui vont bientôt expirer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expiringItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-wp-orange-light rounded-md">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-wp-gray-dark">Expire le {item.expiryDate}</p>
              </div>
              <Button variant="ghost" onClick={onShowComingSoon} className="h-8 text-wp-orange-dark hover:text-wp-orange-dark/80 hover:bg-wp-orange-light/80">
                <span>Idées recettes</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M9 18l6-6-6-6"></path>
                </svg>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PantryAlerts;
