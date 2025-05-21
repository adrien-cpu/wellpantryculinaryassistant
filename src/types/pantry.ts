
export type StorageType = "fridge" | "cabinet" | "wine-cellar" | "all";

export interface PantryItem {
  name: string;
  category: string;
  quantity: string;
  expiryDate: string;
  status: "ok" | "expiring" | "expired";
  storageType: Exclude<StorageType, "all">;
}
