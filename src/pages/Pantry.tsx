
import React from "react";
import Layout from "@/components/layout/Layout";
import PantryItemForm from "@/components/pantry/PantryItemForm";
import PantryHeader from "@/components/pantry/PantryHeader";
import PantryMainContent from "@/components/pantry/PantryMainContent";
import PantryAlerts from "@/components/pantry/PantryAlerts";
import PantryStats from "@/components/pantry/PantryStats";
import SmartSuggestionsCard from "@/components/pantry/SmartSuggestionsCard";
import usePantryData from "@/components/pantry/usePantryData";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import ImageRecognizer from "@/components/pantry/ImageRecognizer";
import BarcodeScanner from "@/components/pantry/BarcodeScanner";
import { PantryItem } from "@/types/pantry"; // Assuming PantryItem type is defined here

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

  const [isScanning, setIsScanning] = React.useState(false);
  const [isRecognizingImage, setIsRecognizingImage] = React.useState(false);
  const [initialFormData, setInitialFormData] = React.useState<Partial<PantryItem> | null>(null);

  const handleBarcodeDetected = (productData: any) => {
    if (productData) {
      // Set the product data as the initial data for the form
      // Map productData to a Partial<PantryItem>
      const initialData: Partial<PantryItem> = {
        name: productData.name || 'Scanned Item', // Assuming productData has a name property
        // Add other mappings here if available from productData
      };
      setInitialFormData(initialData);
      setIsFormOpen(true); // Open the form
    }
    setIsScanning(false); // Close the scanner after detection (found or not)
  };

  const handleImageRecognized = (foodItem: { name: string; category?: string }) => {
    // Map foodItem to a Partial<PantryItem>
    const initialData: Partial<PantryItem> = {
      name: foodItem.name,
      category: foodItem.category,
      // Add other default values or mappings if needed
    };
    setInitialFormData(initialData);
    setIsFormOpen(true); // Open the form
 setIsRecognizingImage(false); // Close the image recognition component
  };

  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <PantryHeader 
            onShowComingSoon={showComingSoon} 
            onAddItem={() => handleAddItem()}
 onToggleImageRecognition={() => setIsRecognizingImage(!isRecognizingImage)}
            onToggleScan={() => setIsScanning(!isScanning)}
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
        open={isFormOpen || !!initialFormData} // Keep form open if initial data is set
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveItem}
 initialData={initialFormData}
      />

      <Drawer open={isScanning} onOpenChange={setIsScanning}>
        <DrawerContent>
          <DrawerHeader className="p-4"> {/* Add padding */}
            <DrawerTitle>Scan Barcode</DrawerTitle>
          </DrawerHeader>
          {/* Add px-4 for horizontal padding to the scanner content */}
          <div className="p-4"> 
            <BarcodeScanner onBarcodeDetected={handleBarcodeDetected} />
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer open={isRecognizingImage} onOpenChange={setIsRecognizingImage}>
        <DrawerContent>
          {/* Add padding to the header */}
          <DrawerHeader className="p-4"> 
            <DrawerTitle>Image Recognition</DrawerTitle>
          </DrawerHeader>
          {/* Add p-4 for padding to the recognizer content */}
          <div className="p-4">
            <ImageRecognizer onImageRecognized={handleImageRecognized}/>
          </div>
        </DrawerContent>
      </Drawer>

    </Layout>
  );
};

export default PantryPage;
