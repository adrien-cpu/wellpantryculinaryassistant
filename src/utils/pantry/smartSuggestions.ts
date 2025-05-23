
import { PantryItem } from "@/types/pantry";
import { getExpirationStatus, parseExpiryDate } from "./dateUtils";

export interface SmartSuggestion {
  type: 'urgent' | 'recipe' | 'shopping' | 'storage';
  title: string;
  description: string;
  items: PantryItem[];
  priority: number;
}

export const generateSmartSuggestions = (pantryItems: PantryItem[]): SmartSuggestion[] => {
  const suggestions: SmartSuggestion[] = [];
  
  // Aliments expirant dans les 24h
  const urgentItems = pantryItems.filter(item => {
    const diffTime = parseExpiryDate(item.expiryDate).getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1 && diffDays >= 0;
  });

  if (urgentItems.length > 0) {
    suggestions.push({
      type: 'urgent',
      title: 'Action urgente requise !',
      description: `${urgentItems.length} aliment(s) expire(nt) dans les 24h`,
      items: urgentItems,
      priority: 1
    });
  }

  // Suggestion de recettes basées sur les aliments qui expirent
  const expiringItems = pantryItems.filter(item => item.status === 'expiring');
  if (expiringItems.length >= 2) {
    suggestions.push({
      type: 'recipe',
      title: 'Inspirations culinaires',
      description: `Créez des recettes avec vos ${expiringItems.length} ingrédients qui expirent bientôt`,
      items: expiringItems,
      priority: 2
    });
  }

  // Suggestions d'optimisation du stockage
  const fridgeItems = pantryItems.filter(item => item.storageType === 'fridge');
  if (fridgeItems.length > 15) {
    suggestions.push({
      type: 'storage',
      title: 'Optimisation du réfrigérateur',
      description: 'Votre réfrigérateur est bien rempli, pensez à vérifier l\'organisation',
      items: fridgeItems.slice(0, 5),
      priority: 3
    });
  }

  return suggestions.sort((a, b) => a.priority - b.priority);
};

export const getExpirationUrgency = (expiryDate: string): number => {
  const diffTime = parseExpiryDate(expiryDate).getTime() - new Date().getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 0) return 0; // Expiré
  if (diffDays <= 1) return 1; // Très urgent
  if (diffDays <= 3) return 2; // Urgent
  if (diffDays <= 7) return 3; // Attention
  return 4; // OK
};
