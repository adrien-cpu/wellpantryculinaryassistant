
import { PantryItem } from "@/types/pantry";
import { useToast } from "@/hooks/use-toast";
import { sortByExpiryDate, getExpirationStatus } from "@/utils/pantry/dateUtils";

interface UsePantryActionsProps {
  pantryItems: PantryItem[];
  setPantryItems: (items: PantryItem[]) => void;
  setEditingItem: (item: PantryItem | undefined) => void;
  setIsFormOpen: (isOpen: boolean) => void;
  consumptionStats: {
    consumed: number;
    added: number;
    expired: number;
  };
  setConsumptionStats: (stats: {
    consumed: number;
    added: number;
    expired: number;
  }) => void;
}

export const usePantryActions = ({
  pantryItems,
  setPantryItems,
  setEditingItem,
  setIsFormOpen,
  consumptionStats,
  setConsumptionStats
}: UsePantryActionsProps) => {
  const { toast } = useToast();

  const showComingSoon = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Cette fonctionnalité sera disponible prochainement.",
      duration: 3000,
    });
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
    if (pantryItems.find(i => i === item)) {
      // Edit existing item
      setPantryItems(prevItems => {
        const updatedItems = prevItems.map(i => i === item ? { ...item } : i);
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
    const updatedItems = pantryItems.map(item => {
      const status = getExpirationStatus(item.expiryDate);
      return { ...item, status };
    });
    
    setPantryItems(updatedItems.sort(sortByExpiryDate));
  };

  return {
    showComingSoon,
    handleAddItem,
    handleEditItem,
    handleSaveItem,
    handleConsumeItem,
    handleDeleteItem,
    checkExpirations
  };
};
