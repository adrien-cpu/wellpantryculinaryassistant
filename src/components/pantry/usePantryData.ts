
import { useEffect, useMemo } from "react";
import { PantryItem } from "@/types/pantry";
import { initialPantryItems } from "@/data/initialPantryData";
import { usePantryState } from "@/hooks/usePantryState";
import { usePantryActions } from "@/hooks/usePantryActions";
import { filterPantryItems, getExpiringItems, getStorageCounts } from "@/utils/pantry/filterUtils";
import { sortByExpiryDate } from "@/utils/pantry/dateUtils";

export const usePantryData = () => {
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

  // Vérifier les expirations au chargement et trier par date d'expiration
  useEffect(() => {
    checkExpirations();
  }, []);

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

  // Get expiring items and sort them by expiry date
  const expiringItems = useMemo(() => {
    return [...getExpiringItems(pantryItems)].sort(sortByExpiryDate);
  }, [pantryItems]);

  // Get counts for storage locations and statuses
  const {
    fridgeCount,
    cabinetCount,
    wineCellarCount,
    expiringCount,
    expiredCount
  } = useMemo(() => getStorageCounts(pantryItems), [pantryItems]);

  return {
    selectedStorage,
    isFormOpen,
    editingItem,
    pantryItems,
    filteredItems: filteredAndSortedItems,
    expiringItems,
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
    setIsFormOpen,
    checkExpirations
  };
};

export default usePantryData;
