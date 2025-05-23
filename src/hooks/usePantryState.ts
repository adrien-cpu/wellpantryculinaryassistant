
import { useState } from "react";
import { PantryItem, StorageType } from "@/types/pantry";
import { useToast } from "@/hooks/use-toast";
import { sortByExpiryDate } from "@/utils/pantry/dateUtils";

export const usePantryState = (initialItems: PantryItem[]) => {
  const { toast } = useToast();
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(initialItems);
  const [selectedStorage, setSelectedStorage] = useState<StorageType>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PantryItem | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortField, setSortField] = useState<keyof PantryItem>("expiryDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [consumptionStats, setConsumptionStats] = useState({
    consumed: 0,
    added: 0,
    expired: 0,
  });

  // Simulate initial consumption stats
  useState(() => {
    setConsumptionStats({
      consumed: 32,
      added: 42,
      expired: 3,
    });
  });

  const handleStorageChange = (storage: StorageType) => {
    setSelectedStorage(storage);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Tous");
    setSelectedStatus("all");
  };

  const handleSort = (field: keyof PantryItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return {
    pantryItems,
    setPantryItems,
    selectedStorage,
    isFormOpen,
    setIsFormOpen,
    editingItem,
    setEditingItem,
    searchTerm,
    selectedCategory,
    selectedStatus,
    sortField,
    sortDirection,
    consumptionStats,
    setConsumptionStats,
    handleStorageChange,
    handleSearchChange,
    handleCategoryChange,
    handleStatusChange,
    handleClearFilters,
    handleSort
  };
};
