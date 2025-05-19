
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const MealPlanningPage = () => {
  const { toast } = useToast();

  const showComingSoon = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Cette fonctionnalité sera disponible prochainement.",
      duration: 3000,
    });
  };

  const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  
  const meals = {
    "Lundi": {
      breakfast: "Smoothie aux fruits rouges et granola",
      lunch: "Salade composée avec quinoa et légumes grillés",
      dinner: "Risotto aux champignons"
    },
    "Mardi": {
      breakfast: "Porridge aux pommes et cannelle",
      lunch: "Wrap au poulet et avocat",
      dinner: "Lasagnes aux légumes"
    },
    "Mercredi": {
      breakfast: "Œufs brouillés et tartine d'avocat",
      lunch: "Buddha bowl au tofu et légumes croquants",
      dinner: "Curry de légumes et riz basmati"
    },
    "Jeudi": {
      breakfast: "Yaourt grec, fruits frais et miel",
      lunch: "Salade niçoise",
      dinner: "Pâtes complètes sauce pesto et légumes rôtis"
    },
    "Vendredi": {
      breakfast: "Pancakes aux myrtilles",
      lunch: "Quiche aux épinards et chèvre",
      dinner: "Tacos végétariens aux haricots noirs"
    },
    "Samedi": {
      breakfast: "Pain perdu aux fruits",
      lunch: "Soupe miso et sushi végétariens",
      dinner: "Pizza maison aux légumes grillés"
    },
    "Dimanche": {
      breakfast: "Brunch : œufs bénédictine",
      lunch: "Salade de pâtes méditerranéenne",
      dinner: "Ratatouille et poisson grillé"
    }
  };

  const shoppingList = [
    { name: "Légumes", items: ["Courgettes (3)", "Aubergine (1)", "Poivrons (2)", "Champignons (250g)", "Épinards (200g)"] },
    { name: "Fruits", items: ["Pommes (6)", "Bananes (4)", "Myrtilles (125g)", "Fraises (250g)"] },
    { name: "Protéines", items: ["Œufs (12)", "Tofu (400g)", "Filet de poisson (300g)", "Poulet (500g)"] },
    { name: "Épicerie", items: ["Riz basmati (500g)", "Pâtes complètes (500g)", "Quinoa (250g)", "Sauce pesto (1 pot)"] },
  ];

  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-wp-green-dark dark:text-wp-green mb-2">Planification des repas</h1>
              <p className="text-wp-gray-dark dark:text-wp-gray-light">
                Organisez vos repas et générez automatiquement vos listes de courses
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              <Button onClick={showComingSoon} className="bg-wp-green hover:bg-wp-green-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                Générer un menu
              </Button>
              <Button variant="outline" onClick={showComingSoon} className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <line x1="12" y1="20" x2="12" y2="10"></line>
                  <line x1="18" y1="20" x2="18" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="16"></line>
                </svg>
                Analyser les habitudes
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="planning" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="planning">Planning des repas</TabsTrigger>
              <TabsTrigger value="shopping">Liste de courses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="planning">
              <Card>
                <CardHeader>
                  <CardTitle>Planning hebdomadaire</CardTitle>
                  <CardDescription>Semaine du 19 au 25 mai 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {weekDays.map((day) => (
                      <div key={day} className="border-b border-wp-gray pb-4 last:border-b-0 last:pb-0">
                        <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">{day}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-3 bg-wp-gray-light dark:bg-wp-gray-dark rounded-md">
                            <div className="text-sm text-wp-brown-dark dark:text-wp-orange-light font-medium mb-1">Petit-déjeuner</div>
                            <p className="text-wp-gray-dark dark:text-wp-gray-light">{meals[day].breakfast}</p>
                            <Button variant="ghost" size="sm" onClick={showComingSoon} className="mt-2 h-7 text-wp-green-dark dark:text-wp-green hover:text-wp-green hover:bg-transparent p-0">
                              <span className="text-xs">Modifier</span>
                            </Button>
                          </div>
                          <div className="p-3 bg-wp-gray-light dark:bg-wp-gray-dark rounded-md">
                            <div className="text-sm text-wp-brown-dark dark:text-wp-orange-light font-medium mb-1">Déjeuner</div>
                            <p className="text-wp-gray-dark dark:text-wp-gray-light">{meals[day].lunch}</p>
                            <Button variant="ghost" size="sm" onClick={showComingSoon} className="mt-2 h-7 text-wp-green-dark dark:text-wp-green hover:text-wp-green hover:bg-transparent p-0">
                              <span className="text-xs">Modifier</span>
                            </Button>
                          </div>
                          <div className="p-3 bg-wp-gray-light dark:bg-wp-gray-dark rounded-md">
                            <div className="text-sm text-wp-brown-dark dark:text-wp-orange-light font-medium mb-1">Dîner</div>
                            <p className="text-wp-gray-dark dark:text-wp-gray-light">{meals[day].dinner}</p>
                            <Button variant="ghost" size="sm" onClick={showComingSoon} className="mt-2 h-7 text-wp-green-dark dark:text-wp-green hover:text-wp-green hover:bg-transparent p-0">
                              <span className="text-xs">Modifier</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shopping">
              <Card>
                <CardHeader>
                  <CardTitle>Liste de courses</CardTitle>
                  <CardDescription>Générée automatiquement à partir de votre planning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {shoppingList.map((category, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-3">{category.name}</h3>
                        <ul className="space-y-2">
                          {category.items.map((item, i) => (
                            <li key={i} className="flex items-center">
                              <input 
                                type="checkbox" 
                                id={`item-${index}-${i}`} 
                                className="rounded border-wp-gray-dark text-wp-green focus:ring-wp-green mr-3"
                              />
                              <label htmlFor={`item-${index}-${i}`} className="text-wp-gray-dark dark:text-wp-gray-light">{item}</label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Button onClick={showComingSoon} variant="outline" className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M12 5v14"></path>
                        <path d="M5 12h14"></path>
                      </svg>
                      Ajouter un article
                    </Button>
                    <Button onClick={showComingSoon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Télécharger la liste
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default MealPlanningPage;
