
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const GardenPage = () => {
  const { toast } = useToast();

  const showComingSoon = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Cette fonctionnalité sera disponible prochainement.",
      duration: 3000,
    });
  };

  const plants = [
    {
      id: 1,
      name: "Basilic",
      image: "https://images.unsplash.com/photo-1592086326871-f7cf2f1801e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFzaWx8ZW58MHx8MHx8fDA%3D",
      wateringStatus: 80,
      lastWatered: "Hier",
      nextWatering: "Demain",
      growthStage: "Mature",
      tips: "Placez en plein soleil, arrosez régulièrement sans mouiller les feuilles.",
      type: "Herbe aromatique",
    },
    {
      id: 2,
      name: "Menthe",
      image: "https://images.unsplash.com/photo-1586032788002-c4e4e6edda2b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWludCUyMHBsYW50fGVufDB8fDB8fHww",
      wateringStatus: 40,
      lastWatered: "Il y a 3 jours",
      nextWatering: "Aujourd'hui",
      growthStage: "Mature",
      tips: "Préfère l'ombre partielle, attention à son expansion rapide.",
      type: "Herbe aromatique",
    },
    {
      id: 3,
      name: "Ciboulette",
      image: "https://images.unsplash.com/photo-1558622769-311935921b3d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpdmVzfGVufDB8fDB8fHww",
      wateringStatus: 65,
      lastWatered: "Il y a 2 jours",
      nextWatering: "Dans 2 jours",
      growthStage: "Jeune plant",
      tips: "Arrosez régulièrement, récoltez en coupant à 2 cm du sol.",
      type: "Herbe aromatique",
    },
    {
      id: 4,
      name: "Tomates cerises",
      image: "https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlcnJ5JTIwdG9tYXRvJTIwcGxhbnR8ZW58MHx8MHx8fDA%3D",
      wateringStatus: 30,
      lastWatered: "Il y a 4 jours",
      nextWatering: "Urgent !",
      growthStage: "Floraison",
      tips: "Besoin de beaucoup de soleil et de soutien pour les tiges.",
      type: "Légume",
    },
    {
      id: 5,
      name: "Persil",
      image: "https://images.unsplash.com/photo-1599491343332-92425a76dd22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFyc2xleXxlbnwwfHwwfHx8MA%3D%3D",
      wateringStatus: 70,
      lastWatered: "Il y a 1 jour",
      nextWatering: "Dans 3 jours",
      growthStage: "Mature",
      tips: "Évitez l'exposition directe au soleil en été.",
      type: "Herbe aromatique",
    },
    {
      id: 6,
      name: "Thym",
      image: "https://images.unsplash.com/photo-1553438755-476e4c5ac845?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGh5bWV8ZW58MHx8MHx8fDA%3D",
      wateringStatus: 60,
      lastWatered: "Il y a 2 jours",
      nextWatering: "Dans 2 jours",
      growthStage: "Mature",
      tips: "Plante méditerranéenne qui préfère un sol sec et drainé.",
      type: "Herbe aromatique",
    },
  ];

  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-wp-green-dark dark:text-wp-green mb-2">Mon potager d'intérieur</h1>
              <p className="text-wp-gray-dark dark:text-wp-gray-light">
                Gérez vos plantes aromatiques et potagères avec des rappels personnalisés
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Button onClick={showComingSoon} className="bg-wp-green hover:bg-wp-green-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M12 5v14"></path>
                  <path d="M5 12h14"></path>
                </svg>
                Ajouter une plante
              </Button>
              <Button variant="outline" onClick={showComingSoon} className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                  <path d="m9 16 2 2 4-4"></path>
                </svg>
                Planning d'arrosage
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map((plant) => (
              <Card key={plant.id} className="card-hover overflow-hidden border-wp-green-light bg-white dark:bg-wp-gray-dark dark:border-wp-green-dark">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-wp-green-dark dark:text-wp-green">{plant.name}</CardTitle>
                      <CardDescription>{plant.type}</CardDescription>
                    </div>
                    <Badge className={
                      plant.wateringStatus > 60
                        ? "bg-wp-green"
                        : plant.wateringStatus > 30
                        ? "bg-wp-orange"
                        : "bg-destructive"
                    }>
                      {plant.wateringStatus > 60
                        ? "Bien hydratée"
                        : plant.wateringStatus > 30
                        ? "À surveiller"
                        : "À arroser urgement"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-wp-gray-dark dark:text-wp-gray-light">Niveau d'eau</span>
                        <span className="text-wp-gray-dark dark:text-wp-gray-light">{plant.wateringStatus}%</span>
                      </div>
                      <Progress value={plant.wateringStatus} className="h-2" 
                        indicatorClassName={
                          plant.wateringStatus > 60
                            ? "bg-wp-green"
                            : plant.wateringStatus > 30
                            ? "bg-wp-orange"
                            : "bg-destructive"
                        }
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-wp-gray-dark dark:text-wp-gray-light">Dernier arrosage</p>
                        <p className="font-medium">{plant.lastWatered}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-wp-gray-dark dark:text-wp-gray-light">Prochain arrosage</p>
                        <p className={`font-medium ${plant.wateringStatus <= 30 ? "text-destructive" : ""}`}>
                          {plant.nextWatering}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-wp-gray-dark dark:text-wp-gray-light text-sm">Stade de croissance</p>
                      <p className="font-medium">{plant.growthStage}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" onClick={showComingSoon} className="text-wp-green">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Conseils
                  </Button>
                  <Button variant="outline" size="sm" onClick={showComingSoon} className="border-wp-green text-wp-green">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M12 22c4.97 0 9-2.69 9-6s-4.03-6-9-6-9 2.69-9 6 4.03 6 9 6z"></path>
                      <path d="M12 16v6"></path>
                      <path d="M9 10a3 3 0 1 0 6 0 3 3 0 0 0-6 0"></path>
                      <path d="M12 13v3"></path>
                    </svg>
                    Arroser
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Conseils de jardinage</CardTitle>
                <CardDescription>Astuces pour entretenir votre potager d'intérieur</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-wp-green-light rounded-md dark:bg-wp-green-dark/30">
                    <h3 className="font-medium text-wp-green-dark dark:text-wp-green mb-2">Arrosage optimal</h3>
                    <p className="text-wp-gray-dark dark:text-wp-gray-light">
                      La plupart des herbes aromatiques préfèrent un arrosage modéré. Attendez que la couche supérieure du sol soit sèche avant d'arroser à nouveau.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-wp-green-light rounded-md dark:bg-wp-green-dark/30">
                    <h3 className="font-medium text-wp-green-dark dark:text-wp-green mb-2">Lumière adéquate</h3>
                    <p className="text-wp-gray-dark dark:text-wp-gray-light">
                      Placez vos plantes près d'une fenêtre orientée sud ou ouest pour un ensoleillement optimal. En hiver, envisagez d'utiliser une lampe de culture.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-wp-green-light rounded-md dark:bg-wp-green-dark/30">
                    <h3 className="font-medium text-wp-green-dark dark:text-wp-green mb-2">Récolte régulière</h3>
                    <p className="text-wp-gray-dark dark:text-wp-gray-light">
                      Récoltez régulièrement vos herbes pour stimuler leur croissance. Ne prélevez jamais plus d'un tiers de la plante à la fois.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GardenPage;
