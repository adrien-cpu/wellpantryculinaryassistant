
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PantryItem, StorageType } from "@/types/pantry";
import StorageSelector from "./StorageSelector";
import PantryItemsTable from "./PantryItemsTable";

interface PantryMainContentProps {
  selectedStorage: StorageType;
  filteredItems: PantryItem[];
  onStorageChange: (storage: StorageType) => void;
  onAddItem: () => void;
  onEditItem: (item: PantryItem) => void;
  onConsumeItem: (item: PantryItem) => void;
  onDeleteItem: (item: PantryItem) => void;
}

const PantryMainContent: React.FC<PantryMainContentProps> = ({
  selectedStorage,
  filteredItems,
  onStorageChange,
  onAddItem,
  onEditItem,
  onConsumeItem,
  onDeleteItem,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mes aliments</CardTitle>
        <CardDescription>Visualisez et gérez tous vos aliments en un seul endroit</CardDescription>
      </CardHeader>
      <CardContent>
        <StorageSelector 
          selectedStorage={selectedStorage}
          onStorageChange={onStorageChange}
        />

        <PantryItemsTable 
          items={filteredItems}
          onEdit={onEditItem}
          onConsume={onConsumeItem}
          onDelete={onDeleteItem}
        />
        
        <div className="mt-6">
          <Button onClick={onAddItem} variant="outline" className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M12 5v14"></path>
              <path d="M5 12h14"></path>
            </svg>
            Ajouter un aliment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PantryMainContent;
