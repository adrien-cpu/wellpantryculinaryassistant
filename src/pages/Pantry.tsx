
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PantryPage = () => {
  const { toast } = useToast();

  const showComingSoon = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Cette fonctionnalité sera disponible prochainement.",
      duration: 3000,
    });
  };

  const pantryItems = [
    {
      name: "Pâtes complètes",
      category: "Féculents",
      quantity: "500g",
      expiryDate: "20/12/2025",
      status: "ok",
    },
    {
      name: "Lait d'amande",
      category: "Boissons",
      quantity: "1L",
      expiryDate: "05/06/2025",
      status: "ok",
    },
    {
      name: "Tomates concassées",
      category: "Conserves",
      quantity: "400g",
      expiryDate: "12/10/2024",
      status: "ok",
    },
    {
      name: "Yaourt nature",
      category: "Produits laitiers",
      quantity: "4x125g",
      expiryDate: "02/06/2025",
      status: "expiring",
    },
    {
      name: "Épinards frais",
      category: "Légumes",
      quantity: "200g",
      expiryDate: "29/05/2025",
      status: "expiring",
    },
  ];

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
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-wp-gray">
                        <th className="py-2 px-4 text-left text-wp-green-dark dark:text-wp-green">Nom</th>
                        <th className="py-2 px-4 text-left text-wp-green-dark dark:text-wp-green">Catégorie</th>
                        <th className="py-2 px-4 text-left text-wp-green-dark dark:text-wp-green">Quantité</th>
                        <th className="py-2 px-4 text-left text-wp-green-dark dark:text-wp-green">Date d'expiration</th>
                        <th className="py-2 px-4 text-left text-wp-green-dark dark:text-wp-green">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pantryItems.map((item, index) => (
                        <tr key={index} className="border-b border-wp-gray hover:bg-wp-gray-light/50 dark:hover:bg-wp-gray-dark/50">
                          <td className="py-3 px-4">{item.name}</td>
                          <td className="py-3 px-4">{item.category}</td>
                          <td className="py-3 px-4">{item.quantity}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center ${item.status === 'expiring' ? 'text-wp-orange-dark' : 'text-wp-gray-dark dark:text-wp-gray-light'}`}>
                              {item.expiryDate}
                              {item.status === 'expiring' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 text-wp-orange-dark">
                                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                  <line x1="12" y1="9" x2="12" y2="13"></line>
                                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                              )}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" onClick={showComingSoon} className="h-8 w-8 p-0">
                                <span className="sr-only">Modifier</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 20h9"></path>
                                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                              </Button>
                              <Button variant="ghost" size="sm" onClick={showComingSoon} className="h-8 w-8 p-0 text-wp-orange-dark">
                                <span className="sr-only">Consommer</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 5v14"></path>
                                  <path d="M5 12h14"></path>
                                </svg>
                              </Button>
                              <Button variant="ghost" size="sm" onClick={showComingSoon} className="h-8 w-8 p-0 text-destructive">
                                <span className="sr-only">Supprimer</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M3 6h18"></path>
                                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                </svg>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6">
                  <Button onClick={showComingSoon} variant="outline" className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark">
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
                    <div className="flex justify-between items-center p-3 bg-wp-orange-light rounded-md">
                      <div>
                        <p className="font-medium">Épinards frais</p>
                        <p className="text-sm text-wp-gray-dark">Expire le 29/05/2025</p>
                      </div>
                      <Button variant="ghost" onClick={showComingSoon} className="h-8 text-wp-orange-dark hover:text-wp-orange-dark/80 hover:bg-wp-orange-light/80">
                        <span>Idées recettes</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                          <path d="M9 18l6-6-6-6"></path>
                        </svg>
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-wp-orange-light rounded-md">
                      <div>
                        <p className="font-medium">Yaourt nature</p>
                        <p className="text-sm text-wp-gray-dark">Expire le 02/06/2025</p>
                      </div>
                      <Button variant="ghost" onClick={showComingSoon} className="h-8 text-wp-orange-dark hover:text-wp-orange-dark/80 hover:bg-wp-orange-light/80">
                        <span>Idées recettes</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                          <path d="M9 18l6-6-6-6"></path>
                        </svg>
                      </Button>
                    </div>
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
                      <div className="text-3xl font-bold text-wp-green-dark dark:text-wp-green">5</div>
                      <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Articles</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-wp-green-dark dark:text-wp-green">4</div>
                      <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Catégories</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-wp-orange-dark">2</div>
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
    </Layout>
  );
};

export default PantryPage;
