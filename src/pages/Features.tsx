
import React from "react";
import Layout from "@/components/layout/Layout";
import FeaturesTracking from "@/data/FeaturesTracking";

const FeaturesPage = () => {
  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <FeaturesTracking />
        </div>
      </section>
    </Layout>
  );
};

export default FeaturesPage;
