import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddPlantForm from "./AddPlantForm";
import type { Plant } from "./GardenData";

interface GardenHeaderProps {
  onAddPlant: (plant: Plant) => void;
}

const GardenHeader: React.FC<GardenHeaderProps> = ({ onAddPlant }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">Mon potager</h1>
      <Button onClick={() => setShowAddModal(true)}>Ajouter une plante</Button>
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="w-auto max-w-fit p-6">
          <DialogHeader>
            <DialogTitle>Ajouter une plante</DialogTitle>
          </DialogHeader>
          <AddPlantForm
            onAdd={plant => {
              onAddPlant(plant);
              setShowAddModal(false);
            }}
            onCancel={() => setShowAddModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GardenHeader;
