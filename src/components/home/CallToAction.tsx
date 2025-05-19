
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16 bg-wp-green text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Prêt à transformer votre cuisine ?</h2>
          <p className="text-lg mb-8 text-white/90">
            Rejoignez des milliers d'utilisateurs qui optimisent leur expérience culinaire avec WellPantry.
            Commencez gratuitement dès aujourd'hui !
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-wp-green hover:bg-wp-green-light">
              <Link to="/register">Créer un compte</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-wp-green-dark">
              <Link to="/features">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
