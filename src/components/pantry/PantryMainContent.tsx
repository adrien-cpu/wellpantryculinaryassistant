
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PantryItem, StorageType } from "@/types/pantry";
import StorageSelector from "./StorageSelector";
import PantryItemsTable from "./PantryItemsTable";
import PantrySearchAndFilters from "./PantrySearchAndFilters";

interface PantryMainContentProps {
  selectedStorage: StorageType;
  filteredItems: PantryItem[];
  searchTerm: string;
  selectedCategory: string;
  selectedStatus: string;
  sortField: keyof PantryItem;
  sortDirection: "asc" | "desc";
  onStorageChange: (storage: StorageType) => void;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClearFilters: () => void;
  onSort: (field: keyof PantryItem) => void;
  onEditItem: (item: PantryItem) => void;
  onConsumeItem: (item: PantryItem) => void;
  onDeleteItem: (item: PantryItem) => void;
}

const PantryMainContent: React.FC<PantryMainContentProps> = ({
  selectedStorage,
  filteredItems,
  searchTerm,
  selectedCategory,
  selectedStatus,
  sortField,
  sortDirection,
  onStorageChange,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onClearFilters,
  onSort,
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

        <PantrySearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          selectedStatus={selectedStatus}
          onStatusChange={onStatusChange}
          onClearFilters={onClearFilters}
        />

        <PantryItemsTable 
          items={filteredItems}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
          onEdit={onEditItem}
          onConsume={onConsumeItem}
          onDelete={onDeleteItem}
        />
      </CardContent>
    </Card>
  );
};

export default PantryMainContent;
