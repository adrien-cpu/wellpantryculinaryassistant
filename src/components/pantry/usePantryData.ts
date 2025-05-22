
import { useState, useEffect } from "react";
import { PantryItem, StorageType } from "@/types/pantry";
import { useToast } from "@/hooks/use-toast";

export const usePantryData = () => {
  const { toast } = useToast();
  const [selectedStorage, setSelectedStorage] = useState<StorageType>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PantryItem | undefined>(undefined);
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
      setPantryItems(pantryItems.map(i => 
        i === editingItem ? item : i
      ));
      toast({
        title: "Aliment modifié",
        description: `${item.name} a été mis à jour.`,
        duration: 3000,
      });
    } else {
      // Add new item
      setPantryItems([...pantryItems, item]);
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
    setPantryItems(pantryItems.filter(i => i !== item));
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
    setPantryItems(pantryItems.filter(i => i !== item));
  };

  // Vérifier les dates d'expiration et mettre à jour les statuts
  const checkExpirations = () => {
    const today = new Date();
    const updatedItems = pantryItems.map(item => {
      const expiryParts = item.expiryDate.split('/');
      const expiryDate = new Date(
        parseInt(expiryParts[2]), 
        parseInt(expiryParts[1]) - 1, 
        parseInt(expiryParts[0])
      );
      
      // Calculer la différence en jours
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Mettre à jour le statut en fonction de la proximité de la date d'expiration
      let status = "ok";
      if (diffDays <= 0) {
        status = "expired";
      } else if (diffDays <= 7) {
        status = "expiring";
      }
      
      return { ...item, status: status as "ok" | "expiring" | "expired" };
    });
    
    setPantryItems(updatedItems);
  };

  // Vérifier les expirations au chargement
  useEffect(() => {
    checkExpirations();
  }, []);

  // Filter items based on selected storage
  const filteredItems = selectedStorage === "all" 
    ? pantryItems
    : pantryItems.filter(item => item.storageType === selectedStorage);

  // Count items in each storage location
  const fridgeCount = pantryItems.filter(item => item.storageType === "fridge").length;
  const cabinetCount = pantryItems.filter(item => item.storageType === "cabinet").length;
  const wineCellarCount = pantryItems.filter(item => item.storageType === "wine-cellar").length;

  // Count items by status
  const expiringCount = pantryItems.filter(item => item.status === "expiring").length;
  const expiredCount = pantryItems.filter(item => item.status === "expired").length;

  // Get expiring items
  const expiringItems = pantryItems.filter(item => item.status === "expiring" || item.status === "expired");

  return {
    selectedStorage,
    isFormOpen,
    editingItem,
    pantryItems,
    filteredItems,
    expiringItems,
    fridgeCount,
    cabinetCount,
    wineCellarCount,
    expiringCount,
    expiredCount,
    consumptionStats,
    showComingSoon,
    handleStorageChange,
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
