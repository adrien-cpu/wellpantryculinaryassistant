
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Garde-manger intelligent",
    description: "Scannez, organisez et suivez tous vos aliments. Recevez des alertes d'expiration et réduisez le gaspillage.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="m16 6 4 14"></path>
        <path d="M12 6v14"></path>
        <path d="M8 8v12"></path>
        <path d="M4 4v16"></path>
      </svg>
    ),
  },
  {
    title: "Planification des repas",
    description: "Planifiez vos repas et générez automatiquement des listes de courses en fonction de votre planning.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
        <line x1="16" x2="16" y1="2" y2="6"></line>
        <line x1="8" x2="8" y1="2" y2="6"></line>
        <line x1="3" x2="21" y1="10" y2="10"></line>
        <path d="m9 16 2 2 4-4"></path>
      </svg>
    ),
  },
  {
    title: "Bibliothèque de recettes",
    description: "Explorez des milliers de recettes et filtrez selon vos préférences, régimes alimentaires et ingrédients disponibles.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
      </svg>
    ),
  },
  {
    title: "Potager d'intérieur",
    description: "Gérez votre potager d'intérieur avec des rappels d'arrosage et des conseils personnalisés pour chaque plante.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M2 22a8 8 0 0 1 8-8h12c0-4.4-3.6-8-8-8h-4c-2.2 0-4.2.8-5.8 2C2.8 9.6 2 11.6 2 14v8Z"></path>
        <path d="M4 14a2 2 0 0 1 2-2h8"></path>
        <path d="M8 12V6c0-2.2 1.8-4 4-4h8c0 1.1-.9 2-2 2"></path>
      </svg>
    ),
  },
  {
    title: "Carte communautaire",
    description: "Découvrez les ressources alimentaires locales, les marchés fermiers et les événements gastronomiques près de chez vous.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="10" r="2"></circle>
        <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z"></path>
      </svg>
    ),
  },
  {
    title: "Dîners & Événements",
    description: "Organisez des repas partagés, invitez des amis et coordonnez les contributions de chacun.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-wp-gray-light dark:bg-wp-gray-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Fonctionnalités principales</h2>
          <p className="text-wp-gray-dark dark:text-wp-gray-light max-w-2xl mx-auto">
            Découvrez comment WellPantry transforme votre expérience culinaire quotidienne grâce à ses fonctionnalités innovantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-hover border-wp-green-light bg-white dark:bg-wp-gray-dark dark:border-wp-green-dark">
              <CardHeader>
                <div className="icon-container mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-wp-green-dark dark:text-wp-green">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-wp-gray-dark dark:text-wp-gray-light">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
