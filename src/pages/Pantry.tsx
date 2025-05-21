
import React from "react";
import Layout from "@/components/layout/Layout";
import PantryItemForm from "@/components/pantry/PantryItemForm";
import PantryHeader from "@/components/pantry/PantryHeader";
import PantryMainContent from "@/components/pantry/PantryMainContent";
import PantryAlerts from "@/components/pantry/PantryAlerts";
import PantryStats from "@/components/pantry/PantryStats";
import usePantryData from "@/components/pantry/usePantryData";

const PantryPage = () => {
  const {
    selectedStorage,
    isFormOpen,
    editingItem,
    pantryItems,
    filteredItems,
    expiringItems,
    fridgeCount,
    cabinetCount,
    wineCellarCount,
    expiringCount,
    showComingSoon,
    handleStorageChange,
    handleAddItem,
    handleEditItem,
    handleSaveItem,
    handleConsumeItem,
    handleDeleteItem,
    setIsFormOpen
  } = usePantryData();

  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <PantryHeader onShowComingSoon={showComingSoon} />
          
          <div className="grid grid-cols-1 gap-6">
            <PantryMainContent 
              selectedStorage={selectedStorage}
              filteredItems={filteredItems}
              onStorageChange={handleStorageChange}
              onAddItem={handleAddItem}
              onEditItem={handleEditItem}
              onConsumeItem={handleConsumeItem}
              onDeleteItem={handleDeleteItem}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PantryAlerts 
                expiringItems={expiringItems}
                onShowComingSoon={showComingSoon}
              />
              
              <PantryStats
                itemsCount={pantryItems.length}
                fridgeCount={fridgeCount}
                cabinetCount={cabinetCount}
                wineCellarCount={wineCellarCount}
                expiringCount={expiringCount}
                onShowComingSoon={showComingSoon}
              />
            </div>
          </div>
        </div>
      </section>
      
      <PantryItemForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveItem}
        initialData={editingItem}
      />
    </Layout>
  );
};

export default PantryPage;
