
import React from "react";
import { Button } from "@/components/ui/button";
import { Archive, Refrigerator, Wine } from "lucide-react";

type StorageType = "fridge" | "cabinet" | "wine-cellar" | "all";

interface StorageSelectorProps {
  selectedStorage: StorageType;
  onStorageChange: (storage: StorageType) => void;
}

const StorageSelector: React.FC<StorageSelectorProps> = ({
  selectedStorage,
  onStorageChange,
}) => {
  const storageOptions = [
    {
      id: "all",
      name: "Tous",
      icon: <Archive className="mr-2 h-5 w-5" />,
    },
    {
      id: "fridge",
      name: "Réfrigérateur",
      icon: <Refrigerator className="mr-2 h-5 w-5" />,
    },
    {
      id: "cabinet",
      name: "Placard",
      icon: <Archive className="mr-2 h-5 w-5" />,
    },
    {
      id: "wine-cellar",
      name: "Cave à vin",
      icon: <Wine className="mr-2 h-5 w-5" />,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {storageOptions.map((option) => (
        <Button
          key={option.id}
          variant={selectedStorage === option.id ? "default" : "outline"}
          className={
            selectedStorage === option.id
              ? "bg-wp-green hover:bg-wp-green-dark"
              : "border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark"
          }
          onClick={() => onStorageChange(option.id as StorageType)}
        >
          {option.icon}
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default StorageSelector;
