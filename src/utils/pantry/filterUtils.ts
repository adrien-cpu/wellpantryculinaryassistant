
import { PantryItem, StorageType } from "@/types/pantry";
import { parseExpiryDate, getExpirationStatus } from "./dateUtils";
import { getExpirationUrgency } from "./smartSuggestions";

export const filterPantryItems = (
  pantryItems: PantryItem[],
  selectedStorage: StorageType,
  searchTerm: string,
  selectedCategory: string,
  selectedStatus: string,
  sortField: keyof PantryItem,
  sortDirection: "asc" | "desc"
): PantryItem[] => {
  let items = [...pantryItems];

  // Filter by storage type
  if (selectedStorage !== "all") {
    items = items.filter(item => item.storageType === selectedStorage);
  }

  // Filter by search term
  if (searchTerm) {
    items = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by category
  if (selectedCategory !== "Tous") {
    items = items.filter(item => item.category === selectedCategory);
  }

  // Filter by status
  if (selectedStatus !== "all") {
    items = items.filter(item => item.status === selectedStatus);
  }

  // Sort items
  items.sort((a, b) => {
    let aValue: string | number = a[sortField];
    let bValue: string | number = b[sortField];

    // Special handling for date sorting with urgency
    if (sortField === "expiryDate") {
      // Option pour trier par urgence d'expiration
      aValue = getExpirationUrgency(a.expiryDate);
      bValue = getExpirationUrgency(b.expiryDate);
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return items;
};

export const getExpiringItems = (pantryItems: PantryItem[]) => {
  return pantryItems.filter(item => item.status === "expiring" || item.status === "expired");
};

export const getStorageCounts = (pantryItems: PantryItem[]) => {
  const fridgeCount = pantryItems.filter(item => item.storageType === "fridge").length;
  const cabinetCount = pantryItems.filter(item => item.storageType === "cabinet").length;
  const wineCellarCount = pantryItems.filter(item => item.storageType === "wine-cellar").length;
  const expiringCount = pantryItems.filter(item => item.status === "expiring").length;
  const expiredCount = pantryItems.filter(item => item.status === "expired").length;
  
  return {
    fridgeCount,
    cabinetCount,
    wineCellarCount,
    expiringCount,
    expiredCount
  };
};

// Nouvelle fonction pour obtenir des catégories uniques
export const getUniqueCategories = (pantryItems: PantryItem[]): string[] => {
  const categories = [...new Set(pantryItems.map(item => item.category))];
  return ["Tous", ...categories.sort()];
};
