import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Meal {
  name: string;
  description?: string;
}

interface DayMeals {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

export const useMealPlanning = () => {
  const { toast } = useToast();
  
  const [meals, setMeals] = useState<Record<string, DayMeals>>({
    "Lundi": {
      breakfast: { 
        name: "Smoothie aux fruits rouges et granola",
        description: "Smoothie énergétique avec myrtilles, framboises et granola maison"
      },
      lunch: { 
        name: "Salade composée avec quinoa et légumes grillés",
        description: "Salade nutritive avec quinoa, courgettes grillées, tomates cerises et vinaigrette à l'huile d'olive"
      },
      dinner: { 
        name: "Risotto aux champignons",
        description: "Risotto crémeux aux champignons de Paris et porcini, parmesan et herbes fraîches"
      }
    },
    "Mardi": {
      breakfast: { 
        name: "Porridge aux pommes et cannelle",
        description: "Porridge d'avoine avec pommes caramélisées et cannelle"
      },
      lunch: { 
        name: "Wrap au poulet et avocat",
        description: "Wrap complet avec poulet grillé, avocat, crudités et sauce yaourt"
      },
      dinner: { 
        name: "Lasagnes aux légumes",
        description: "Lasagnes végétariennes avec aubergines, courgettes et béchamel légère"
      }
    },
    "Mercredi": {
      breakfast: { 
        name: "Œufs brouillés et tartine d'avocat",
        description: "Œufs brouillés aux herbes avec tartine d'avocat et tomates cerises"
      },
      lunch: { 
        name: "Buddha bowl au tofu et légumes croquants",
        description: "Bowl équilibré avec tofu mariné, légumes de saison et sauce tahini"
      },
      dinner: { 
        name: "Curry de légumes et riz basmati",
        description: "Curry doux aux légumes de saison avec riz basmati parfumé"
      }
    },
    "Jeudi": {
      breakfast: { 
        name: "Yaourt grec, fruits frais et miel",
        description: "Yaourt grec avec fruits de saison et miel de lavande"
      },
      lunch: { 
        name: "Salade niçoise",
        description: "Salade traditionnelle avec thon, œufs, anchois et légumes croquants"
      },
      dinner: { 
        name: "Pâtes complètes sauce pesto et légumes rôtis",
        description: "Pâtes complètes avec pesto maison et légumes méditerranéens rôtis"
      }
    },
    "Vendredi": {
      breakfast: { 
        name: "Pancakes aux myrtilles",
        description: "Pancakes moelleux aux myrtilles fraîches et sirop d'érable"
      },
      lunch: { 
        name: "Quiche aux épinards et chèvre",
        description: "Quiche légère aux épinards frais et fromage de chèvre"
      },
      dinner: { 
        name: "Tacos végétariens aux haricots noirs",
        description: "Tacos avec haricots noirs, avocat, tomates et coriandre fraîche"
      }
    },
    "Samedi": {
      breakfast: { 
        name: "Pain perdu aux fruits",
        description: "Pain perdu traditionnel avec fruits de saison et cannelle"
      },
      lunch: { 
        name: "Soupe miso et sushi végétariens",
        description: "Soupe miso traditionnelle avec sushi aux légumes frais"
      },
      dinner: { 
        name: "Pizza maison aux légumes grillés",
        description: "Pizza sur pâte complète avec légumes grillés et mozzarella"
      }
    },
    "Dimanche": {
      breakfast: { 
        name: "Brunch : œufs bénédictine",
        description: "Œufs pochés sur muffins anglais avec sauce hollandaise légère"
      },
      lunch: { 
        name: "Salade de pâtes méditerranéenne",
        description: "Salade de pâtes avec tomates, olives, feta et basilic"
      },
      dinner: { 
        name: "Ratatouille et poisson grillé",
        description: "Ratatouille provençale avec poisson blanc grillé aux herbes"
      }
    }
  });

  const updateMeal = (day: string, mealType: 'breakfast' | 'lunch' | 'dinner', updatedMeal: Meal) => {
    setMeals(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: updatedMeal
      }
    }));
  };

  const replaceAllMeals = (newMeals: Record<string, DayMeals>) => {
    setMeals(newMeals);
    toast({
      title: "Menu mis à jour",
      description: "Votre planning de repas a été généré avec succès",
      duration: 3000,
    });
  };

  return {
    meals,
    updateMeal,
    replaceAllMeals
  };
};
