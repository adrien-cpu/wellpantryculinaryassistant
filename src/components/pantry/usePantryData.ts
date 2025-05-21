
import { useState } from "react";
import { PantryItem, StorageType } from "@/types/pantry";
import { useToast } from "@/hooks/use-toast";

export const usePantryData = () => {
  const { toast } = useToast();
  const [selectedStorage, setSelectedStorage] = useState<StorageType>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PantryItem | undefined>(undefined);

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
  ]);

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
  };

  const handleDeleteItem = (item: PantryItem) => {
    toast({
      title: "Aliment supprimé",
      description: `${item.name} a été retiré du garde-manger.`,
      duration: 3000,
    });
    setPantryItems(pantryItems.filter(i => i !== item));
  };

  // Filter items based on selected storage
  const filteredItems = selectedStorage === "all" 
    ? pantryItems
    : pantryItems.filter(item => item.storageType === selectedStorage);

  // Count items in each storage location
  const fridgeCount = pantryItems.filter(item => item.storageType === "fridge").length;
  const cabinetCount = pantryItems.filter(item => item.storageType === "cabinet").length;
  const wineCellarCount = pantryItems.filter(item => item.storageType === "wine-cellar").length;

  // Count expiring items
  const expiringCount = pantryItems.filter(item => item.status === "expiring").length;

  // Get expiring items
  const expiringItems = pantryItems.filter(item => item.status === "expiring");

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
    showComingSoon,
    handleStorageChange,
    handleAddItem,
    handleEditItem,
    handleSaveItem,
    handleConsumeItem,
    handleDeleteItem,
    setIsFormOpen
  };
};

export default usePantryData;
