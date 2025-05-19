
import React from "react";
import Layout from "@/components/layout/Layout";
import GardenHeader from "@/components/garden/GardenHeader";
import GardenCard from "@/components/garden/GardenCard";
import GardeningTips from "@/components/garden/GardeningTips";
import { gardenPlants } from "@/components/garden/GardenData";

const GardenPage = () => {
  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <GardenHeader />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gardenPlants.map((plant) => (
              <GardenCard key={plant.id} plant={plant} />
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
