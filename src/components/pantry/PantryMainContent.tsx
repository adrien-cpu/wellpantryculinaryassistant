
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PantryItem, StorageType } from "@/types/pantry";
import StorageSelector from "./StorageSelector";
import PantryItemsTable from "./PantryItemsTable";

interface PantryMainContentProps {
  selectedStorage: StorageType;
  filteredItems: PantryItem[];
  onStorageChange: (storage: StorageType) => void;
  onEditItem: (item: PantryItem) => void;
  onConsumeItem: (item: PantryItem) => void;
  onDeleteItem: (item: PantryItem) => void;
}

const PantryMainContent: React.FC<PantryMainContentProps> = ({
  selectedStorage,
  filteredItems,
  onStorageChange,
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
      </CardContent>
    </Card>
  );
};

export default PantryMainContent;
