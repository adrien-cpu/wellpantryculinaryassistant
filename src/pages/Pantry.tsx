
import React from "react";
import Layout from "@/components/layout/Layout";
import PantryItemForm from "@/components/pantry/PantryItemForm";
import PantryHeader from "@/components/pantry/PantryHeader";
import PantryMainContent from "@/components/pantry/PantryMainContent";
import PantryAlerts from "@/components/pantry/PantryAlerts";
import PantryStats from "@/components/pantry/PantryStats";
import SmartSuggestionsCard from "@/components/pantry/SmartSuggestionsCard";
import usePantryData from "@/components/pantry/usePantryData";

const PantryPage = () => {
  const {
    selectedStorage,
    isFormOpen,
    editingItem,
    pantryItems,
    filteredItems,
    expiringItems,
    smartSuggestions,
    fridgeCount,
    cabinetCount,
    wineCellarCount,
    expiringCount,
    searchTerm,
    selectedCategory,
    selectedStatus,
    sortField,
    sortDirection,
    showComingSoon,
    handleStorageChange,
    handleSearchChange,
    handleCategoryChange,
    handleStatusChange,
    handleClearFilters,
    handleSort,
    handleAddItem,
    handleEditItem,
    handleSaveItem,
    handleConsumeItem,
    handleDeleteItem,
    handleSuggestionAction,
    setIsFormOpen
  } = usePantryData();

  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <PantryHeader 
            onShowComingSoon={showComingSoon} 
            onAddItem={handleAddItem}
          />
          
          <div className="grid grid-cols-1 gap-6">
            {/* Suggestions intelligentes */}
            <SmartSuggestionsCard 
              suggestions={smartSuggestions}
              onActionClick={handleSuggestionAction}
            />
            
            {/* Alerte déplacée en haut */}
            {expiringItems.length > 0 && (
              <div className="mt-4 mb-2">
                <PantryAlerts 
                  expiringItems={expiringItems}
                  onShowComingSoon={showComingSoon}
                />
              </div>
            )}
            
            <PantryMainContent 
              selectedStorage={selectedStorage}
              filteredItems={filteredItems}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              selectedStatus={selectedStatus}
              sortField={sortField}
              sortDirection={sortDirection}
              onStorageChange={handleStorageChange}
              onSearchChange={handleSearchChange}
              onCategoryChange={handleCategoryChange}
              onStatusChange={handleStatusChange}
              onClearFilters={handleClearFilters}
              onSort={handleSort}
              onEditItem={handleEditItem}
              onConsumeItem={handleConsumeItem}
              onDeleteItem={handleDeleteItem}
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
