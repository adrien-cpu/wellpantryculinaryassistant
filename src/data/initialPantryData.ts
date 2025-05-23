
import { PantryItem } from "@/types/pantry";

export const initialPantryItems: PantryItem[] = [
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
];
