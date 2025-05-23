
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PantryItem } from "@/types/pantry";
import RecipeSuggestionsDialog from "./RecipeSuggestionsDialog";

interface PantryAlertsProps {
  expiringItems: PantryItem[];
  onShowComingSoon: () => void;
}

const PantryAlerts: React.FC<PantryAlertsProps> = ({ expiringItems, onShowComingSoon }) => {
  const [selectedItem, setSelectedItem] = useState<PantryItem | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleShowRecipeSuggestions = (item: PantryItem) => {
    setSelectedItem(item);
    setShowSuggestions(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Alertes d'expiration</CardTitle>
          <CardDescription>Aliments qui vont bientôt expirer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expiringItems.length === 0 ? (
              <p className="text-wp-gray-dark italic text-center py-2">Aucun aliment en voie d'expiration</p>
            ) : (
              expiringItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-wp-orange-light rounded-md">
                  <div>
                    <p className="font-medium text-wp-brown-dark dark:text-wp-brown">
                      {item.name} - Expire le {item.expiryDate}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleShowRecipeSuggestions(item)}
                    className="h-8 text-wp-orange-dark hover:text-wp-orange-dark/80 hover:bg-wp-orange-light/80"
                  >
                    <span>Idées recettes</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <RecipeSuggestionsDialog
        open={showSuggestions}
        onClose={() => setShowSuggestions(false)}
        item={selectedItem}
      />
    </>
  );
};

export default PantryAlerts;
