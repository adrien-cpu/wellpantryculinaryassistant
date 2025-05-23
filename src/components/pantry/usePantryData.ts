
import { useEffect, useMemo } from "react";
import { PantryItem } from "@/types/pantry";
import { initialPantryItems } from "@/data/initialPantryData";
import { usePantryState } from "@/hooks/usePantryState";
import { usePantryActions } from "@/hooks/usePantryActions";
import { filterPantryItems, getExpiringItems, getStorageCounts } from "@/utils/pantry/filterUtils";
import { generateSmartSuggestions, SmartSuggestion } from "@/utils/pantry/smartSuggestions";
import { getExpirationStatus } from "@/utils/pantry/dateUtils";
import { useToast } from "@/hooks/use-toast";

export const usePantryData = () => {
  const { toast } = useToast();
  const {
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
  } = usePantryState(initialPantryItems);

  const {
    showComingSoon,
    handleAddItem,
    handleEditItem,
    handleSaveItem,
    handleConsumeItem,
    handleDeleteItem,
    checkExpirations
  } = usePantryActions({
    pantryItems,
    setPantryItems,
    setEditingItem,
    setIsFormOpen,
    consumptionStats,
    setConsumptionStats
  });

  // Vérifier les expirations et mettre à jour les statuts
  useEffect(() => {
    const updatedItems = pantryItems.map(item => ({
      ...item,
      status: getExpirationStatus(item.expiryDate)
    }));
    
    // Mettre à jour seulement si il y a des changements
    const hasChanges = updatedItems.some((item, index) => 
      item.status !== pantryItems[index]?.status
    );
    
    if (hasChanges) {
      setPantryItems(updatedItems);
    }
  }, [pantryItems, setPantryItems]);

  // Filter and sort items with memoization for performance
  const filteredAndSortedItems = useMemo(() => {
    return filterPantryItems(
      pantryItems,
      selectedStorage,
      searchTerm,
      selectedCategory,
      selectedStatus,
      sortField,
      sortDirection
    );
  }, [pantryItems, selectedStorage, searchTerm, selectedCategory, selectedStatus, sortField, sortDirection]);

  // Get expiring items
  const expiringItems = useMemo(() => {
    return getExpiringItems(pantryItems);
  }, [pantryItems]);

  // Generate smart suggestions
  const smartSuggestions = useMemo(() => {
    return generateSmartSuggestions(pantryItems);
  }, [pantryItems]);

  // Get counts for storage locations and statuses
  const {
    fridgeCount,
    cabinetCount,
    wineCellarCount,
    expiringCount,
    expiredCount
  } = useMemo(() => getStorageCounts(pantryItems), [pantryItems]);

  // Handle smart suggestion actions
  const handleSuggestionAction = (suggestion: SmartSuggestion) => {
    switch (suggestion.type) {
      case 'urgent':
        toast({
          title: "Aliments urgents détectés",
          description: "Consultez les aliments marqués en rouge dans votre liste",
          duration: 4000,
        });
        break;
      case 'recipe':
        showComingSoon();
        break;
      case 'storage':
        toast({
          title: "Conseil de stockage",
          description: "Vérifiez l'organisation de vos espaces de stockage",
          duration: 3000,
        });
        break;
      default:
        showComingSoon();
    }
  };

  return {
    selectedStorage,
    isFormOpen,
    editingItem,
    pantryItems,
    filteredItems: filteredAndSortedItems,
    expiringItems,
    smartSuggestions,
    fridgeCount,
    cabinetCount,
    wineCellarCount,
    expiringCount,
    expiredCount,
    consumptionStats,
    searchTerm,
    selectedCategory,
    selectedStatus,
    sortField,
    sortDirection,
    showComingSoon,
    handleStorageChange,
    handleSearchChange,
    handleCategoryChange,
    handleStatusChange,
    handleClearFilters,
    handleSort,
    handleAddItem,
    handleEditItem,
    handleSaveItem,
    handleConsumeItem,
    handleDeleteItem,
    handleSuggestionAction,
    setIsFormOpen,
    checkExpirations
  };
};

export default usePantryData;
