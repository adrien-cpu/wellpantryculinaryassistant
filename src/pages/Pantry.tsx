
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import StorageSelector from "@/components/pantry/StorageSelector";
import PantryItemsTable from "@/components/pantry/PantryItemsTable";
import PantryItemForm from "@/components/pantry/PantryItemForm";
import { StorageType, PantryItem } from "@/types/pantry";

const PantryPage = () => {
  const { toast } = useToast();
  const [selectedStorage, setSelectedStorage] = useState<StorageType>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PantryItem | undefined>(undefined);

  // Initial pantry data with storage types
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    {
      name: "Pâtes complètes",
      category: "Féculents",
      quantity: "500g",
      expiryDate: "20/12/2025",
      status: "ok",
      storageType: "cabinet"
    },
    {
      name: "Lait d'amande",
      category: "Boissons",
      quantity: "1L",
      expiryDate: "05/06/2025",
      status: "ok",
      storageType: "fridge"
    },
    {
      name: "Tomates concassées",
      category: "Conserves",
      quantity: "400g",
      expiryDate: "12/10/2024",
      status: "ok",
      storageType: "cabinet"
    },
    {
      name: "Yaourt nature",
      category: "Produits laitiers",
      quantity: "4x125g",
      expiryDate: "02/06/2025",
      status: "expiring",
      storageType: "fridge"
    },
    {
      name: "Épinards frais",
      category: "Légumes",
      quantity: "200g",
      expiryDate: "29/05/2025",
      status: "expiring",
      storageType: "fridge"
    },
    {
      name: "Vin rouge Bordeaux 2018",
      category: "Boissons alcoolisées",
      quantity: "750ml",
      expiryDate: "01/01/2030",
      status: "ok",
      storageType: "wine-cellar"
    },
  ]);

  const showComingSoon = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Cette fonctionnalité sera disponible prochainement.",
      duration: 3000,
    });
  };

  const handleStorageChange = (storage: StorageType) => {
    setSelectedStorage(storage);
  };

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: PantryItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleSaveItem = (item: PantryItem) => {
    if (editingItem) {
      // Edit existing item
      setPantryItems(pantryItems.map(i => 
        i === editingItem ? item : i
      ));
      toast({
        title: "Aliment modifié",
        description: `${item.name} a été mis à jour.`,
        duration: 3000,
      });
    } else {
      // Add new item
      setPantryItems([...pantryItems, item]);
      toast({
        title: "Aliment ajouté",
        description: `${item.name} a été ajouté au garde-manger.`,
        duration: 3000,
      });
    }
  };

  const handleConsumeItem = (item: PantryItem) => {
    toast({
      title: "Aliment consommé",
      description: `${item.name} a été marqué comme consommé.`,
      duration: 3000,
    });
    setPantryItems(pantryItems.filter(i => i !== item));
  };

  const handleDeleteItem = (item: PantryItem) => {
    toast({
      title: "Aliment supprimé",
      description: `${item.name} a été retiré du garde-manger.`,
      duration: 3000,
    });
    setPantryItems(pantryItems.filter(i => i !== item));
  };

  // Filter items based on selected storage
  const filteredItems = selectedStorage === "all" 
    ? pantryItems
    : pantryItems.filter(item => item.storageType === selectedStorage);

  // Count items in each storage location
  const fridgeCount = pantryItems.filter(item => item.storageType === "fridge").length;
  const cabinetCount = pantryItems.filter(item => item.storageType === "cabinet").length;
  const wineCellarCount = pantryItems.filter(item => item.storageType === "wine-cellar").length;

  // Count expiring items
  const expiringCount = pantryItems.filter(item => item.status === "expiring").length;

  // Get expiring items
  const expiringItems = pantryItems.filter(item => item.status === "expiring");

  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-wp-green-dark dark:text-wp-green mb-2">Garde-manger intelligent</h1>
              <p className="text-wp-gray-dark dark:text-wp-gray-light">
                Gérez efficacement vos aliments et réduisez le gaspillage alimentaire
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Button onClick={showComingSoon} className="bg-wp-green hover:bg-wp-green-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                  <path d="m9 16 2 2 4-4"></path>
                </svg>
                Scanner un code-barres
              </Button>
              <Button variant="outline" onClick={showComingSoon} className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                  <circle cx="12" cy="13" r="3"></circle>
                </svg>
                Reconnaissance d'image
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes aliments</CardTitle>
                <CardDescription>Visualisez et gérez tous vos aliments en un seul endroit</CardDescription>
              </CardHeader>
              <CardContent>
                <StorageSelector 
                  selectedStorage={selectedStorage}
                  onStorageChange={handleStorageChange}
                />

                <PantryItemsTable 
                  items={filteredItems}
                  onEdit={handleEditItem}
                  onConsume={handleConsumeItem}
                  onDelete={handleDeleteItem}
                />
                
                <div className="mt-6">
                  <Button onClick={handleAddItem} variant="outline" className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M12 5v14"></path>
                      <path d="M5 12h14"></path>
                    </svg>
                    Ajouter un aliment
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alertes d'expiration</CardTitle>
                  <CardDescription>Aliments qui vont bientôt expirer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expiringItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-wp-orange-light rounded-md">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-wp-gray-dark">Expire le {item.expiryDate}</p>
                        </div>
                        <Button variant="ghost" onClick={showComingSoon} className="h-8 text-wp-orange-dark hover:text-wp-orange-dark/80 hover:bg-wp-orange-light/80">
                          <span>Idées recettes</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                            <path d="M9 18l6-6-6-6"></path>
                          </svg>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                  <CardDescription>Aperçu de votre consommation</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <div className="flex justify-center space-x-8">
                    <div>
                      <div className="text-3xl font-bold text-wp-green-dark dark:text-wp-green">{pantryItems.length}</div>
                      <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Articles</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-wp-green-dark dark:text-wp-green">{fridgeCount}</div>
                      <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Réfrigérateur</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-wp-green-dark dark:text-wp-green">{cabinetCount}</div>
                      <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Placard</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-wp-green-dark dark:text-wp-green">{wineCellarCount}</div>
                      <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Cave à vin</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-wp-orange-dark">{expiringCount}</div>
                      <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Expirations proches</div>
                    </div>
                  </div>
                  
                  <Button variant="link" onClick={showComingSoon} className="mt-6 text-wp-green-dark dark:text-wp-green">
                    <span>Voir toutes les statistiques</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Button>
                </CardContent>
              </Card>
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
