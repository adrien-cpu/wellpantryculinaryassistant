import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCategory {
  name: string;
  features: Feature[];
}

interface Feature {
  name: string;
  description: string;
  implemented: boolean;
}

export const featuresData: FeatureCategory[] = [
  {
    name: "Garde-manger intelligent",
    features: [
      {
        name: "Scan de codes-barres",
        description: "Ajoutez rapidement des produits en scannant leur code-barres",
        implemented: true
      },
      {
        name: "Reconnaissance d'images",
        description: "Identifiez les aliments par photo",
        implemented: true
      },
      {
        name: "Alertes d'expiration",
        description: "Recevez des notifications pour les produits qui vont bientôt expirer",
        implemented: true
      },
      {
        name: "Statistiques de consommation",
        description: "Visualisez vos habitudes alimentaires",
        implemented: true
      },
      {
        name: "Organisation par catégories",
        description: "Classez vos produits par types pour un accès facile",
        implemented: true
      }
    ]
  },
  {
    name: "Planification des repas",
    features: [
      {
        name: "Calendrier des repas",
        description: "Planifiez vos repas pour la semaine",
        implemented: true
      },
      {
        name: "Génération de menus",
        description: "Obtenez des suggestions basées sur vos préférences",
        implemented: true
      },
      {
        name: "Liste de courses automatique",
        description: "Générez une liste à partir de vos menus planifiés",
        implemented: true
      },
      {
        name: "Équilibre nutritionnel",
        description: "Vérifiez l'équilibre nutritionnel de votre planning",
        implemented: true
      }
    ]
  },
  {
    name: "Recettes",
    features: [
      {
        name: "Bibliothèque de recettes",
        description: "Explorez une vaste collection de recettes",
        implemented: true
      },
      {
        name: "Recherche avancée",
        description: "Filtrez par ingrédients, temps de préparation, régime alimentaire",
        implemented: true
      },
      {
        name: "Génération par IA",
        description: "Créez des recettes personnalisées avec l'IA",
        implemented: true
      },
      {
        name: "Évaluation et commentaires",
        description: "Partagez votre expérience avec la communauté",
        implemented: true
      },
      {
        name: "Mode pas-à-pas",
        description: "Suivez les instructions de cuisine étape par étape",
        implemented: true
      }
    ]
  },
  {
    name: "Potager d'intérieur",
    features: [
      {
        name: "Suivi des plantes",
        description: "Gérez vos plantes aromatiques et potagères",
        implemented: true
      },
      {
        name: "Rappels d'arrosage",
        description: "Ne manquez jamais un arrosage",
        implemented: true
      },
      {
        name: "Conseils de jardinage",
        description: "Recevez des conseils adaptés à chaque plante",
        implemented: true
      },
      {
        name: "Calendrier de culture",
        description: "Suivez les cycles de plantation, croissance et récolte",
        implemented: true
      },
      {
        name: "Journal de jardinage",
        description: "Documentez l'évolution de vos plantes avec photos",
        implemented: true
      }
    ]
  },
  {
    name: "Carte communautaire",
    features: [
      {
        name: "Points d'intérêt",
        description: "Découvrez les ressources alimentaires locales",
        implemented: true
      },
      {
        name: "Contribution",
        description: "Ajoutez vos propres découvertes",
        implemented: true
      },
      {
        name: "Évaluations",
        description: "Partagez votre expérience des lieux visités",
        implemented: true
      },
      {
        name: "Itinéraires",
        description: "Créez des parcours gourmands dans votre ville",
        implemented: true
      }
    ]
  },
  {
    name: "Gastronomie moléculaire",
    features: [
      {
        name: "Analyse des associations",
        description: "Découvrez les meilleures combinaisons d'ingrédients",
        implemented: true
      },
      {
        name: "Techniques culinaires",
        description: "Apprenez des techniques avancées",
        implemented: true
      },
      {
        name: "Profils aromatiques",
        description: "Comprenez la chimie derrière les saveurs",
        implemented: true
      },
      {
        name: "Laboratoire virtuel",
        description: "Simulez des expériences culinaires avant de les réaliser",
        implemented: true
      }
    ]
  },
  {
    name: "Dîners & Événements sociaux",
    features: [
      {
        name: "Planification d'événements",
        description: "Organisez des repas partagés",
        implemented: true
      },
      {
        name: "Gestion des invitations",
        description: "Invitez des amis et suivez leurs réponses",
        implemented: true
      },
      {
        name: "Coordination des contributions",
        description: "Organisez qui apporte quoi",
        implemented: true
      },
      {
        name: "Évaluations post-événement",
        description: "Partagez vos impressions après l'événement",
        implemented: true
      },
      {
        name: "Galerie de souvenirs",
        description: "Partagez les photos de vos événements culinaires",
        implemented: true
      }
    ]
  },
  {
    name: "Personnalisation & Préférences",
    features: [
      {
        name: "Profil nutritionnel",
        description: "Configurez vos préférences diététiques et allergies",
        implemented: true
      },
      {
        name: "Thèmes d'interface",
        description: "Personnalisez l'apparence de l'application",
        implemented: true
      },
      {
        name: "Suggestions personnalisées",
        description: "Recevez du contenu adapté à vos habitudes",
        implemented: true
      },
      {
        name: "Synchronisation multi-appareils",
        description: "Retrouvez vos données sur tous vos appareils",
        implemented: true
      }
    ]
  }
];

const FeaturesTracking: React.FC = () => {
  return (
    <div className="space-y-8 p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Suivi des fonctionnalités</h1>
        <p className="text-muted-foreground">
          Progression du développement de la plateforme culinaire
        </p>
      </div>

      {featuresData.map((category, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
            <CardDescription>
              {category.features.filter(f => f.implemented).length}/{category.features.length} fonctionnalités implémentées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {category.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-start">
                  <span className="mr-2 mt-0.5 text-wp-green">
                    {feature.implemented ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      </svg>
                    )}
                  </span>
                  <div>
                    <p className="font-medium">{feature.name}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturesTracking;