import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import GenerationOptions from "@/components/meal-planning/GenerationOptions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const RecipesPage = () => {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);

  const showComingSoon = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Cette fonctionnalité sera disponible prochainement.",
      duration: 3000,
    });
  };

  const recipes = [
    {
      id: 1,
      title: "Risotto aux champignons",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJpc290dG98ZW58MHx8MHx8fDA%3D",
      duration: "30 min",
      difficulty: "Facile",
      rating: 4.8,
      tags: ["Végétarien", "Italien"]
    },
    {
      id: 2,
      title: "Buddha bowl au tofu",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1ZGRoYSUyMGJvd2x8ZW58MHx8MHx8fDA%3D",
      duration: "25 min",
      difficulty: "Facile",
      rating: 4.6,
      tags: ["Végétalien", "Sain"]
    },
    {
      id: 3,
      title: "Lasagnes aux légumes",
      image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFzYWduYXxlbnwwfHwwfHx8MA%3D%3D",
      duration: "60 min",
      difficulty: "Moyen",
      rating: 4.7,
      tags: ["Végétarien", "Italien"]
    },
    {
      id: 4,
      title: "Curry de légumes",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VycnklMjB2ZWdldGFibGV8ZW58MHx8MHx8fDA%3D",
      duration: "40 min",
      difficulty: "Facile",
      rating: 4.5,
      tags: ["Végétalien", "Indien"]
    },
    {
      id: 5,
      title: "Tacos végétariens",
      image: "https://images.unsplash.com/photo-1611699363906-056f01dd1ed8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHZlZ2FuJTIwdGFjb3N8ZW58MHx8MHx8fDA%3D",
      duration: "25 min",
      difficulty: "Facile",
      rating: 4.9,
      tags: ["Végétarien", "Mexicain"]
    },
    {
      id: 6,
      title: "Ratatouille",
      image: "https://images.unsplash.com/photo-1572453800999-e8b4c0868abb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmF0YXRvdWlsbGV8ZW58MHx8MHx8fDA%3D",
      duration: "45 min",
      difficulty: "Moyen",
      rating: 4.7,
      tags: ["Végétalien", "Français"]
    }
  ];

  const tags = ["Tous", "Végétarien", "Végétalien", "Italien", "Indien", "Français", "Mexicain", "Sain", "Rapide"];

  const [people, setPeople] = useState(2);
  const [periodType, setPeriodType] = useState<"jours" | "semaines" | "mois">("jours");
  const [periodValue, setPeriodValue] = useState(1);

  const handleGenerate = () => {
    setModalOpen(false); // ferme la modale après génération
  };

  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-wp-green-dark dark:text-wp-green mb-2">Bibliothèque de recettes</h1>
              <p className="text-wp-gray-dark dark:text-wp-gray-light">
                Découvrez des milliers de recettes et filtrez selon vos préférences
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={() => setModalOpen(true)} className="bg-wp-green hover:bg-wp-green-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                Générer avec l'IA
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow max-w-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-wp-gray-dark dark:text-wp-gray-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <Input
                  placeholder="Rechercher des recettes..."
                  className="pl-10 border-wp-gray bg-white dark:bg-wp-gray-dark"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    className={
                      index === 0
                        ? "bg-wp-green hover:bg-wp-green-dark cursor-pointer"
                        : "border-wp-gray-dark text-wp-gray-dark hover:bg-wp-green hover:text-white hover:border-wp-green dark:border-wp-gray-light dark:text-wp-gray-light cursor-pointer"
                    }
                    onClick={showComingSoon}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <Card key={recipe.id} className="card-hover overflow-hidden border-wp-green-light bg-white dark:bg-wp-gray-dark dark:border-wp-green-dark">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-0">
                  <CardTitle className="text-wp-green-dark dark:text-wp-green">{recipe.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-wp-gray-dark dark:text-wp-gray-light text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {recipe.duration}
                      </div>
                      <div className="flex items-center text-wp-gray-dark dark:text-wp-gray-light text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        {recipe.difficulty}
                      </div>
                      <div className="flex items-center text-wp-orange text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="mr-1">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        {recipe.rating}
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recipe.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-wp-green-light bg-wp-green-light/50 text-wp-green-dark dark:bg-wp-green-dark/20 dark:border-wp-green-dark dark:text-wp-green-light">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    className="w-full bg-wp-green hover:bg-wp-green-dark" 
                    onClick={showComingSoon}
                  >
                    Voir la recette
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={showComingSoon}
              className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark"
            >
              Charger plus de recettes
            </Button>
          </div>
        </div>
      </section>

      {/* MODALE */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Générer des recettes avec l'IA</DialogTitle>
          </DialogHeader>
          <GenerationOptions
            people={people}
            setPeople={setPeople}
            periodType={periodType}
            setPeriodType={setPeriodType}
            periodValue={periodValue}
            setPeriodValue={setPeriodValue}
          />
          <DialogFooter>
            <Button onClick={handleGenerate} className="bg-wp-green hover:bg-wp-green-dark">
              Générer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default RecipesPage;
