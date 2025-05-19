
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-wp-green-light to-white dark:from-wp-green-dark dark:to-wp-gray-dark py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wp-green-dark dark:text-white mb-6 animate-fade-in">
            Votre Assistant Culinaire Intelligent
          </h1>
          <p className="text-lg md:text-xl text-wp-gray-dark dark:text-wp-gray-light mb-8 animate-slide-up">
            WellPantry révolutionne votre expérience culinaire en vous aidant à gérer votre garde-manger, 
            planifier vos repas et découvrir de nouvelles recettes adaptées à vos préférences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button asChild size="lg" className="bg-wp-green hover:bg-wp-green-dark text-white">
              <Link to="/register">Commencer gratuitement</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark">
              <Link to="/features">Découvrir les fonctionnalités</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-wp-gray-dark"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-wp-orange opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-wp-green opacity-20 blur-xl"></div>
    </section>
  );
};

export default Hero;
