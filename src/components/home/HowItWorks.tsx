
import React from "react";

const steps = [
  {
    number: "01",
    title: "Ajoutez vos aliments",
    description: "Scannez les codes-barres ou prenez des photos pour ajouter facilement vos aliments au garde-manger.",
  },
  {
    number: "02",
    title: "Recevez des suggestions",
    description: "Notre IA analyse votre garde-manger et vos préférences pour vous suggérer des recettes adaptées.",
  },
  {
    number: "03",
    title: "Planifiez vos repas",
    description: "Organisez votre semaine avec notre planificateur intuitif et générez des listes de courses.",
  },
  {
    number: "04",
    title: "Réduisez le gaspillage",
    description: "Recevez des alertes avant que vos aliments n'expirent et des idées pour les utiliser.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Comment ça marche</h2>
          <p className="text-wp-gray-dark dark:text-wp-gray-light max-w-2xl mx-auto">
            Voici comment WellPantry révolutionne votre expérience culinaire en quelques étapes simples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-wp-green-light flex items-center justify-center mb-4">
                <span className="text-wp-green-dark font-bold text-xl">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold text-wp-green-dark dark:text-wp-green mb-2">{step.title}</h3>
              <p className="text-wp-gray-dark dark:text-wp-gray-light">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wp-green-light">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
