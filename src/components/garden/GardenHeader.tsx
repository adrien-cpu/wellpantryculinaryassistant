
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const GardenHeader: React.FC = () => {
  const { toast } = useToast();

  const showComingSoon = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Cette fonctionnalité sera disponible prochainement.",
      duration: 3000,
    });
  };

  return (
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
  );
};

export default GardenHeader;
