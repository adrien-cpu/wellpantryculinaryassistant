
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface PantrySearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  onClearFilters: () => void;
}

const PantrySearchAndFilters: React.FC<PantrySearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  onClearFilters,
}) => {
  const categories = [
    "Tous",
    "Féculents",
    "Boissons",
    "Conserves",
    "Produits laitiers",
    "Légumes",
    "Fruits",
    "Épicerie",
    "Boissons alcoolisées"
  ];

  const statusOptions = [
    { value: "all", label: "Tous les statuts" },
    { value: "ok", label: "En bon état" },
    { value: "expiring", label: "Expire bientôt" },
    { value: "expired", label: "Expiré" }
  ];

  const hasActiveFilters = searchTerm || selectedCategory !== "Tous" || selectedStatus !== "all";

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wp-gray-dark h-4 w-4" />
          <Input
            placeholder="Rechercher un aliment..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 border-wp-green focus:border-wp-green-dark"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full sm:w-48 border-wp-green">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-48 border-wp-green">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="border-wp-gray-dark text-wp-gray-dark hover:bg-wp-gray-light"
          >
            <X className="h-4 w-4 mr-2" />
            Effacer
          </Button>
        )}
      </div>
    </div>
  );
};

export default PantrySearchAndFilters;
