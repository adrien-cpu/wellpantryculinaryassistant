import React from "react";
import Layout from "@/components/layout/Layout";
import FeaturesTracking from "@/data/FeaturesTracking";

const FeaturesPage = () => {
  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-wp-green-dark dark:text-wp-green mb-2">Fonctionnalités</h1>
              <p className="text-wp-gray-dark dark:text-wp-gray-light">
                Découvrez toutes les fonctionnalités de WellPantry et leur état d'avancement
              </p>
            </div>
          </div>
          
          <FeaturesTracking />
        </div>
      </section>
    </Layout>
  );
};

export default FeaturesPage;