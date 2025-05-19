
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    quote: "WellPantry a complètement changé ma façon de cuisiner. Je gaspille beaucoup moins et je découvre des recettes que je n'aurais jamais essayées auparavant.",
    author: "Sophie L.",
    title: "Utilisatrice depuis 6 mois",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
  },
  {
    quote: "Grâce à la planification des repas, j'économise du temps et de l'argent chaque semaine. Les alertes d'expiration m'ont sauvé plus d'une fois !",
    author: "Thomas M.",
    title: "Chef amateur",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
  },
  {
    quote: "Mon potager d'intérieur n'a jamais été aussi florissant. Les rappels d'arrosage et les conseils personnalisés sont vraiment utiles.",
    author: "Camille D.",
    title: "Jardinière urbaine",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Camille",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white dark:bg-wp-gray-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Ce que disent nos utilisateurs</h2>
          <p className="text-wp-gray-dark dark:text-wp-gray-light max-w-2xl mx-auto">
            Découvrez comment WellPantry transforme la vie quotidienne de nos utilisateurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover border-wp-green-light bg-white dark:bg-wp-gray-dark dark:border-wp-green-dark">
              <CardHeader className="pb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-wp-green-light mb-4">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-wp-gray-dark dark:text-wp-gray-light italic">
                  "{testimonial.quote}"
                </p>
              </CardContent>
              <CardFooter className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-wp-green-dark dark:text-wp-green font-medium">{testimonial.author}</p>
                  <p className="text-sm text-wp-gray-dark dark:text-wp-gray-light">{testimonial.title}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
