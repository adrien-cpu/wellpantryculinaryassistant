import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import GardenHeader from "@/components/garden/GardenHeader";
import GardenCard from "@/components/garden/GardenCard";
import GardeningTips from "@/components/garden/GardeningTips";
import WateringReminders from "@/components/garden/WateringReminders";
import { gardenPlants } from "@/components/garden/GardenData";
import type { Plant } from "@/components/garden/GardenData";

const GardenPage = () => {
  const [plants, setPlants] = useState(gardenPlants);

  const handleRemovePlant = (id: number) => {
    setPlants(plants => plants.filter(plant => plant.id !== id));
  };

  const handleAddPlant = (plant: Plant) => {
    setPlants(plants => [...plants, plant]);
  };

  const handleUpdatePlant = (updatedPlant: Plant) => {
    setPlants(plants => plants.map(p => p.id === updatedPlant.id ? updatedPlant : p));
  };

  const handleEditPlant = (plantName: string) => {
    // ...ta logique...
  };

  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <GardenHeader onAddPlant={handleAddPlant} />

          {/* Section Actions du jour */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Actions du jour</h2>
            <ul className="list-disc pl-5">
              {plants
                .filter(plant => plant.nextWatering === "Aujourd'hui" || plant.nextWatering === "Urgent !")
                .map(plant => (
                  <li key={plant.id}>
                    Arroser <span className="font-semibold">{plant.name}</span>
                  </li>
                ))}
              {/* Tu peux ajouter ici d'autres actions (couper, récolter, fertiliser, etc.) */}
            </ul>
          </div>

          <div className="mb-8">
            <WateringReminders plants={plants} onEditPlant={handleEditPlant} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map((plant) => (
              <GardenCard
                key={plant.id}
                plant={plant}
                onRemove={handleRemovePlant}
                onUpdatePlant={handleUpdatePlant}
              />
            ))}
          </div>
          
          <div className="mt-12">
            <GardeningTips />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GardenPage;
