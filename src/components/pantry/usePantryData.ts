
import { useState, useEffect, useMemo } from "react";
import { PantryItem, StorageType } from "@/types/pantry";
import { useToast } from "@/hooks/use-toast";

// Fonction utilitaire pour convertir des dates au format JJ/MM/AAAA en objets Date
const parseExpiryDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
};

// Fonction de tri par date d'expiration
const sortByExpiryDate = (a: PantryItem, b: PantryItem): number => {
  const dateA = parseExpiryDate(a.expiryDate);
  const dateB = parseExpiryDate(b.expiryDate);
  return dateA.getTime() - dateB.getTime();
};

export const usePantryData = () => {
  const { toast } = useToast();
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

  // Initial pantry data with storage types
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    {
      name: "Pâtes complètes",
      category: "Féculents",
      quantity: "500g",
      expiryDate: "20/12/2025",
      status: "ok",
      storageType: "cabinet"
    },
    {
      name: "Lait d'amande",
      category: "Boissons",
      quantity: "1L",
      expiryDate: "05/06/2025",
      status: "ok",
      storageType: "fridge"
    },
    {
      name: "Tomates concassées",
      category: "Conserves",
      quantity: "400g",
      expiryDate: "12/10/2024",
      status: "ok",
      storageType: "cabinet"
    },
    {
      name: "Yaourt nature",
      category: "Produits laitiers",
      quantity: "4x125g",
      expiryDate: "02/06/2025",
      status: "expiring",
      storageType: "fridge"
    },
    {
      name: "Épinards frais",
      category: "Légumes",
      quantity: "200g",
      expiryDate: "29/05/2025",
      status: "expiring",
      storageType: "fridge"
    },
    {
      name: "Vin rouge Bordeaux 2018",
      category: "Boissons alcoolisées",
      quantity: "750ml",
      expiryDate: "01/01/2030",
      status: "ok",
      storageType: "wine-cellar"
    },
    {
      name: "Fromage Comté",
      category: "Produits laitiers",
      quantity: "200g",
      expiryDate: "10/06/2025",
      status: "expiring",
      storageType: "fridge"
    },
    {
      name: "Pommes Golden",
      category: "Fruits",
      quantity: "1kg",
      expiryDate: "15/06/2025",
      status: "ok",
      storageType: "fridge"
    },
    {
      name: "Farine de blé",
      category: "Épicerie",
      quantity: "1kg",
      expiryDate: "01/12/2025",
      status: "ok",
      storageType: "cabinet"
    },
    {
      name: "Champagne Brut",
      category: "Boissons alcoolisées",
      quantity: "750ml",
      expiryDate: "01/01/2027",
      status: "ok",
      storageType: "wine-cellar"
    },
  ]);

  // Simuler le chargement des statistiques de consommation
  useEffect(() => {
    setConsumptionStats({
      consumed: 32,
      added: 42,
      expired: 3,
    });
  }, []);

  const showComingSoon = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Cette fonctionnalité sera disponible prochainement.",
      duration: 3000,
    });
  };

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

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: PantryItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleSaveItem = (item: PantryItem) => {
    if (editingItem) {
      // Edit existing item
      setPantryItems(prevItems => {
        const updatedItems = prevItems.map(i => i === editingItem ? item : i);
        return [...updatedItems].sort(sortByExpiryDate);
      });
      toast({
        title: "Aliment modifié",
        description: `${item.name} a été mis à jour.`,
        duration: 3000,
      });
    } else {
      // Add new item
      setPantryItems(prevItems => {
        return [...prevItems, item].sort(sortByExpiryDate);
      });
      setConsumptionStats(prev => ({
        ...prev,
        added: prev.added + 1
      }));
      toast({
        title: "Aliment ajouté",
        description: `${item.name} a été ajouté au garde-manger.`,
        duration: 3000,
      });
    }
  };

  const handleConsumeItem = (item: PantryItem) => {
    toast({
      title: "Aliment consommé",
      description: `${item.name} a été marqué comme consommé.`,
      duration: 3000,
    });
    setPantryItems(prevItems => {
      const updatedItems = prevItems.filter(i => i !== item);
      return updatedItems;
    });
    setConsumptionStats(prev => ({
      ...prev,
      consumed: prev.consumed + 1
    }));
  };

  const handleDeleteItem = (item: PantryItem) => {
    toast({
      title: "Aliment supprimé",
      description: `${item.name} a été retiré du garde-manger.`,
      duration: 3000,
    });
    setPantryItems(prevItems => {
      const updatedItems = prevItems.filter(i => i !== item);
      return updatedItems;
    });
  };

  // Vérifier les dates d'expiration et mettre à jour les statuts
  const checkExpirations = () => {
    const today = new Date();
    const updatedItems = pantryItems.map(item => {
      const expiryDate = parseExpiryDate(item.expiryDate);
      
      // Calculer la différence en jours
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Mettre à jour le statut en fonction de la proximité de la date d'expiration
      let status: "ok" | "expiring" | "expired" = "ok";
      if (diffDays <= 0) {
        status = "expired";
      } else if (diffDays <= 7) {
        status = "expiring";
      }
      
      return { ...item, status };
    });
    
    setPantryItems(updatedItems.sort(sortByExpiryDate));
  };

  // Vérifier les expirations au chargement et trier par date d'expiration
  useEffect(() => {
    checkExpirations();
  }, []);

  // Filter and sort items with memoization for performance
  const filteredAndSortedItems = useMemo(() => {
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
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Special handling for date sorting
      if (sortField === "expiryDate") {
        aValue = parseExpiryDate(a.expiryDate).getTime();
        bValue = parseExpiryDate(b.expiryDate).getTime();
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
  }, [pantryItems, selectedStorage, searchTerm, selectedCategory, selectedStatus, sortField, sortDirection]);

  // Count items in each storage location
  const fridgeCount = pantryItems.filter(item => item.storageType === "fridge").length;
  const cabinetCount = pantryItems.filter(item => item.storageType === "cabinet").length;
  const wineCellarCount = pantryItems.filter(item => item.storageType === "wine-cellar").length;

  // Count items by status
  const expiringCount = pantryItems.filter(item => item.status === "expiring").length;
  const expiredCount = pantryItems.filter(item => item.status === "expired").length;

  // Get expiring items and sort them by expiry date
  const expiringItems = [...pantryItems.filter(
    item => item.status === "expiring" || item.status === "expired"
  )].sort(sortByExpiryDate);

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
