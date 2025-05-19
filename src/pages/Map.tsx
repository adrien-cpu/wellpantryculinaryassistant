
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MapPage = () => {
  const { toast } = useToast();

  const showComingSoon = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "La carte interactive et les fonctionnalités associées seront disponibles prochainement.",
      duration: 3000,
    });
  };

  const locations = [
    {
      id: 1,
      name: "Marché bio des Batignolles",
      type: "Marché fermier",
      address: "34 Boulevard des Batignolles, 75008 Paris",
      rating: 4.7,
      distance: "1.2 km",
      tags: ["Bio", "Local", "Fruits", "Légumes"],
      schedule: "Samedi 8h-14h"
    },
    {
      id: 2,
      name: "La Ruche Qui Dit Oui",
      type: "Distribution locale",
      address: "12 Rue de la République, 75001 Paris",
      rating: 4.5,
      distance: "0.8 km",
      tags: ["Circuit court", "Produits fermiers"],
      schedule: "Jeudi 17h-19h"
    },
    {
      id: 3,
      name: "AMAP des Lilas",
      type: "AMAP",
      address: "5 Rue des Grands Champs, 75020 Paris",
      rating: 4.8,
      distance: "2.5 km",
      tags: ["Bio", "Saisons", "Engagement"],
      schedule: "Mardi 18h-20h"
    },
  ];

  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-wp-green-dark dark:text-wp-green mb-2">Carte communautaire</h1>
              <p className="text-wp-gray-dark dark:text-wp-gray-light">
                Découvrez les ressources alimentaires locales près de chez vous
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Button onClick={showComingSoon} className="bg-wp-green hover:bg-wp-green-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M12 5v14"></path>
                  <path d="M5 12h14"></path>
                </svg>
                Ajouter un lieu
              </Button>
              <Button variant="outline" onClick={showComingSoon} className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                </svg>
                Localisation actuelle
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-[500px] bg-wp-gray dark:bg-wp-gray-dark border-wp-green-light dark:border-wp-green-dark">
                <div className="w-full h-full flex items-center justify-center bg-wp-gray-light dark:bg-wp-gray-dark relative">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-wp-green opacity-50">
                      <circle cx="12" cy="10" r="3"></circle>
                      <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
                    </svg>
                    <h3 className="text-xl font-medium text-wp-green-dark dark:text-wp-green mb-2">Carte interactive</h3>
                    <p className="text-wp-gray-dark dark:text-wp-gray-light max-w-md mx-auto">
                      La carte interactive sera disponible prochainement. 
                      Vous pourrez découvrir et ajouter des ressources alimentaires locales.
                    </p>
                    <Button className="mt-4 bg-wp-green hover:bg-wp-green-dark" onClick={showComingSoon}>
                      Activer la carte
                    </Button>
                  </div>
                  
                  {/* Overlay designed placeholders for map markers */}
                  <div className="absolute left-1/4 top-1/3 w-10 h-10 opacity-20">
                    <div className="w-6 h-6 rounded-full bg-wp-green animate-ping"></div>
                  </div>
                  <div className="absolute right-1/3 top-1/2 w-10 h-10 opacity-20">
                    <div className="w-6 h-6 rounded-full bg-wp-orange animate-ping"></div>
                  </div>
                  <div className="absolute left-1/2 bottom-1/4 w-10 h-10 opacity-20">
                    <div className="w-6 h-6 rounded-full bg-wp-green animate-ping"></div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card className="border-wp-green-light dark:border-wp-green-dark">
                <CardHeader className="pb-2">
                  <CardTitle className="text-wp-green-dark dark:text-wp-green">Ressources locales</CardTitle>
                  <CardDescription>Découvrez ce qui se trouve près de chez vous</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex overflow-x-auto pb-2 space-x-2 mb-4">
                    <Badge className="whitespace-nowrap bg-wp-green hover:bg-wp-green-dark cursor-pointer" onClick={showComingSoon}>
                      Tous
                    </Badge>
                    <Badge variant="outline" className="whitespace-nowrap border-wp-gray-dark hover:bg-wp-green hover:text-white hover:border-wp-green cursor-pointer" onClick={showComingSoon}>
                      Marchés fermiers
                    </Badge>
                    <Badge variant="outline" className="whitespace-nowrap border-wp-gray-dark hover:bg-wp-green hover:text-white hover:border-wp-green cursor-pointer" onClick={showComingSoon}>
                      AMAP
                    </Badge>
                    <Badge variant="outline" className="whitespace-nowrap border-wp-gray-dark hover:bg-wp-green hover:text-white hover:border-wp-green cursor-pointer" onClick={showComingSoon}>
                      Producteurs
                    </Badge>
                    <Badge variant="outline" className="whitespace-nowrap border-wp-gray-dark hover:bg-wp-green hover:text-white hover:border-wp-green cursor-pointer" onClick={showComingSoon}>
                      Jardins partagés
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {locations.map((location) => (
                      <div key={location.id} className="p-3 border rounded-md hover:border-wp-green transition-colors cursor-pointer">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-semibold text-wp-green-dark dark:text-wp-green">{location.name}</h3>
                          <Badge variant="secondary" className="bg-wp-green-light text-wp-green-dark dark:bg-wp-green-dark/20 dark:text-wp-green">
                            {location.distance}
                          </Badge>
                        </div>
                        <p className="text-sm text-wp-gray-dark dark:text-wp-gray-light mb-2">{location.type} • {location.address}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {location.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs py-0 px-1">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center text-wp-orange text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="mr-1">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <span>{location.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="link" className="w-full mt-2 text-wp-green-dark dark:text-wp-green" onClick={showComingSoon}>
                    Voir plus de ressources
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-wp-green-light dark:border-wp-green-dark">
                <CardHeader className="pb-2">
                  <CardTitle className="text-wp-green-dark dark:text-wp-green">Événements à venir</CardTitle>
                  <CardDescription>Activités gastronomiques près de chez vous</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md hover:border-wp-green transition-colors cursor-pointer" onClick={showComingSoon}>
                      <p className="text-wp-orange font-medium">25 mai • 10h-18h</p>
                      <h4 className="font-medium text-wp-green-dark dark:text-wp-green">Journée de l'agriculture locale</h4>
                      <p className="text-sm text-wp-gray-dark dark:text-wp-gray-light">Parc des expositions • 1,5 km</p>
                    </div>
                    <div className="p-3 border rounded-md hover:border-wp-green transition-colors cursor-pointer" onClick={showComingSoon}>
                      <p className="text-wp-orange font-medium">2 juin • 14h-16h</p>
                      <h4 className="font-medium text-wp-green-dark dark:text-wp-green">Atelier de cuisine zéro déchet</h4>
                      <p className="text-sm text-wp-gray-dark dark:text-wp-gray-light">Maison du quartier • 0,8 km</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MapPage;
