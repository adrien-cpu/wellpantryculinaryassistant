import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FeatureCategory {
  name: string;
  features: Feature[];
  description: string;
}

interface Feature {
  name: string;
  description: string;
  implemented: boolean;
  details?: string[];
}

export const featuresData: FeatureCategory[] = [
  {
    name: "Garde-manger intelligent",
    description: "Gérez efficacement vos aliments et réduisez le gaspillage alimentaire grâce à des fonctionnalités avancées de suivi et d'organisation.",
    features: [
      {
        name: "Scan de codes-barres",
        description: "Ajoutez rapidement des produits en scannant leur code-barres",
        implemented: true,
        details: [
          "Utilisation de la caméra pour scanner les codes-barres",
          "Reconnaissance automatique des produits via une base de données",
          "Ajout rapide au garde-manger avec préremplissage des informations"
        ]
      },
      {
        name: "Reconnaissance d'images",
        description: "Identifiez les aliments par photo",
        implemented: true,
        details: [
          "Utilisation de TensorFlow.js pour la reconnaissance d'images",
          "Identification des aliments à partir de photos prises par l'utilisateur",
          "Suggestions automatiques basées sur les résultats de reconnaissance"
        ]
      },
      {
        name: "Alertes d'expiration",
        description: "Recevez des notifications pour les produits qui vont bientôt expirer",
        implemented: true,
        details: [
          "Suivi automatique des dates d'expiration",
          "Notifications pour les produits expirant dans les 7 jours",
          "Suggestions de recettes pour utiliser les produits avant expiration"
        ]
      },
      {
        name: "Statistiques de consommation",
        description: "Visualisez vos habitudes alimentaires",
        implemented: true,
        details: [
          "Graphiques de consommation par catégorie d'aliments",
          "Suivi des tendances mensuelles d'achat et de consommation",
          "Analyse du gaspillage alimentaire et suggestions d'amélioration"
        ]
      },
      {
        name: "Organisation par catégories",
        description: "Classez vos produits par types pour un accès facile",
        implemented: true,
        details: [
          "Catégorisation automatique des aliments",
          "Filtrage par catégorie, date d'expiration et emplacement",
          "Organisation visuelle intuitive du garde-manger"
        ]
      },
      {
        name: "Suggestions intelligentes",
        description: "Recevez des recommandations basées sur votre garde-manger",
        implemented: true,
        details: [
          "Suggestions basées sur les aliments qui expirent bientôt",
          "Recommandations d'optimisation du stockage",
          "Conseils pour réduire le gaspillage alimentaire"
        ]
      },
      {
        name: "Synchronisation avec listes de courses",
        description: "Intégration avec la planification des repas et les listes de courses",
        implemented: true,
        details: [
          "Génération automatique de listes de courses basées sur les recettes planifiées",
          "Mise à jour du garde-manger après l'achat des ingrédients",
          "Suivi des articles fréquemment achetés"
        ]
      }
    ]
  },
  {
    name: "Planification des repas",
    description: "Organisez vos repas avec un suivi nutritionnel complet et générez automatiquement vos listes de courses.",
    features: [
      {
        name: "Calendrier des repas",
        description: "Planifiez vos repas pour la semaine",
        implemented: true,
        details: [
          "Interface de calendrier intuitive avec vue jour/semaine/mois",
          "Organisation des repas par petit-déjeuner, déjeuner et dîner",
          "Possibilité de glisser-déposer les recettes dans le calendrier"
        ]
      },
      {
        name: "Génération de menus",
        description: "Obtenez des suggestions basées sur vos préférences",
        implemented: true,
        details: [
          "Génération automatique de menus équilibrés",
          "Personnalisation selon les préférences alimentaires et restrictions",
          "Intégration avec l'IA pour des suggestions créatives"
        ]
      },
      {
        name: "Liste de courses automatique",
        description: "Générez une liste à partir de vos menus planifiés",
        implemented: true,
        details: [
          "Création automatique de listes de courses basées sur les repas planifiés",
          "Regroupement des ingrédients par catégorie",
          "Ajustement des quantités en fonction du nombre de personnes"
        ]
      },
      {
        name: "Équilibre nutritionnel",
        description: "Vérifiez l'équilibre nutritionnel de votre planning",
        implemented: true,
        details: [
          "Calcul automatique des valeurs nutritionnelles pour chaque repas",
          "Visualisation de l'équilibre des macronutriments",
          "Suivi des objectifs nutritionnels personnalisés"
        ]
      },
      {
        name: "Adaptation aux restrictions alimentaires",
        description: "Planification adaptée à vos besoins spécifiques",
        implemented: true,
        details: [
          "Prise en compte des allergies et intolérances",
          "Filtrage des recettes selon les régimes alimentaires",
          "Suggestions adaptées aux préférences personnelles"
        ]
      },
      {
        name: "Planification budgétaire",
        description: "Estimez le coût de vos repas",
        implemented: true,
        details: [
          "Estimation du coût des ingrédients",
          "Suggestions pour optimiser le budget",
          "Suivi des dépenses alimentaires"
        ]
      }
    ]
  },
  {
    name: "Recettes",
    description: "Explorez une vaste bibliothèque de recettes et trouvez l'inspiration culinaire adaptée à vos goûts et besoins.",
    features: [
      {
        name: "Bibliothèque de recettes",
        description: "Explorez une vaste collection de recettes",
        implemented: true,
        details: [
          "Base de données riche et variée de recettes",
          "Organisation par catégories, cuisines et types de plats",
          "Mise à jour régulière avec de nouvelles recettes"
        ]
      },
      {
        name: "Recherche avancée",
        description: "Filtrez par ingrédients, temps de préparation, régime alimentaire",
        implemented: true,
        details: [
          "Filtrage multicritères (temps, difficulté, régime, etc.)",
          "Recherche par ingrédients disponibles",
          "Exclusion d'ingrédients spécifiques (allergènes)"
        ]
      },
      {
        name: "Génération par IA",
        description: "Créez des recettes personnalisées avec l'IA",
        implemented: true,
        details: [
          "Génération de recettes basées sur les ingrédients disponibles",
          "Adaptation aux préférences et restrictions alimentaires",
          "Suggestions créatives pour varier les repas"
        ]
      },
      {
        name: "Évaluation et commentaires",
        description: "Partagez votre expérience avec la communauté",
        implemented: true,
        details: [
          "Système de notation des recettes",
          "Commentaires et retours d'expérience",
          "Photos des réalisations par les utilisateurs"
        ]
      },
      {
        name: "Mode pas-à-pas",
        description: "Suivez les instructions de cuisine étape par étape",
        implemented: true,
        details: [
          "Interface intuitive pour suivre chaque étape",
          "Minuteurs intégrés pour chaque étape",
          "Possibilité de marquer les étapes comme complétées"
        ]
      },
      {
        name: "Collections et favoris",
        description: "Organisez vos recettes préférées",
        implemented: true,
        details: [
          "Ajout de recettes aux favoris",
          "Création de collections personnalisées",
          "Partage de collections avec d'autres utilisateurs"
        ]
      },
      {
        name: "Adaptation des portions",
        description: "Ajustez automatiquement les quantités",
        implemented: true,
        details: [
          "Calcul automatique des quantités selon le nombre de personnes",
          "Conversion entre différentes unités de mesure",
          "Préservation des proportions pour garantir le résultat"
        ]
      }
    ]
  },
  {
    name: "Potager d'intérieur",
    description: "Gérez votre potager d'intérieur avec des rappels d'arrosage et des conseils personnalisés pour chaque plante.",
    features: [
      {
        name: "Suivi des plantes",
        description: "Gérez vos plantes aromatiques et potagères",
        implemented: true,
        details: [
          "Fiches détaillées pour chaque plante",
          "Suivi de la croissance et du développement",
          "Historique des actions (plantation, récolte, etc.)"
        ]
      },
      {
        name: "Rappels d'arrosage",
        description: "Ne manquez jamais un arrosage",
        implemented: true,
        details: [
          "Notifications personnalisées pour chaque plante",
          "Calendrier d'arrosage adapté aux besoins spécifiques",
          "Suivi de l'historique d'arrosage"
        ]
      },
      {
        name: "Conseils de jardinage",
        description: "Recevez des conseils adaptés à chaque plante",
        implemented: true,
        details: [
          "Conseils personnalisés basés sur le type de plante",
          "Recommandations saisonnières",
          "Astuces pour optimiser la croissance"
        ]
      },
      {
        name: "Calendrier de culture",
        description: "Suivez les cycles de plantation, croissance et récolte",
        implemented: true,
        details: [
          "Planification des semis et plantations",
          "Prévisions de récolte",
          "Rotation des cultures"
        ]
      },
      {
        name: "Journal de jardinage",
        description: "Documentez l'évolution de vos plantes avec photos",
        implemented: true,
        details: [
          "Suivi photographique de la croissance",
          "Notes et observations",
          "Historique des interventions"
        ]
      },
      {
        name: "Identification des problèmes",
        description: "Diagnostiquez et traitez les maladies et parasites",
        implemented: true,
        details: [
          "Reconnaissance visuelle des problèmes courants",
          "Suggestions de traitements naturels",
          "Prévention des maladies courantes"
        ]
      }
    ]
  },
  {
    name: "Carte communautaire",
    description: "Découvrez les ressources alimentaires locales près de chez vous et partagez vos découvertes avec la communauté.",
    features: [
      {
        name: "Points d'intérêt",
        description: "Découvrez les ressources alimentaires locales",
        implemented: true,
        details: [
          "Cartographie des marchés, producteurs locaux, AMAP",
          "Informations détaillées sur chaque point d'intérêt",
          "Filtrage par type de ressource"
        ]
      },
      {
        name: "Contribution",
        description: "Ajoutez vos propres découvertes",
        implemented: true,
        details: [
          "Ajout de nouveaux points d'intérêt",
          "Mise à jour des informations existantes",
          "Validation communautaire des contributions"
        ]
      },
      {
        name: "Évaluations",
        description: "Partagez votre expérience des lieux visités",
        implemented: true,
        details: [
          "Système de notation des lieux",
          "Commentaires et avis détaillés",
          "Photos des lieux et produits"
        ]
      },
      {
        name: "Itinéraires",
        description: "Créez des parcours gourmands dans votre ville",
        implemented: true,
        details: [
          "Création d'itinéraires personnalisés",
          "Optimisation des trajets",
          "Partage d'itinéraires avec la communauté"
        ]
      },
      {
        name: "Événements locaux",
        description: "Découvrez les événements gastronomiques près de chez vous",
        implemented: true,
        details: [
          "Calendrier des marchés et foires",
          "Ateliers et cours de cuisine",
          "Événements saisonniers"
        ]
      }
    ]
  },
  {
    name: "Gastronomie moléculaire",
    description: "Explorez la science derrière les saveurs et transformez votre cuisine avec des techniques innovantes.",
    features: [
      {
        name: "Analyse des associations",
        description: "Découvrez les meilleures combinaisons d'ingrédients",
        implemented: true,
        details: [
          "Cartographie des affinités chimiques entre aliments",
          "Suggestions d'associations inattendues mais harmonieuses",
          "Explication des principes scientifiques sous-jacents"
        ]
      },
      {
        name: "Techniques culinaires",
        description: "Apprenez des techniques avancées",
        implemented: true,
        details: [
          "Tutoriels détaillés sur les techniques moléculaires",
          "Instructions pas à pas avec vidéos",
          "Liste des équipements nécessaires"
        ]
      },
      {
        name: "Profils aromatiques",
        description: "Comprenez la chimie derrière les saveurs",
        implemented: true,
        details: [
          "Base de données des composés aromatiques",
          "Analyse des profils de saveur",
          "Visualisation des interactions moléculaires"
        ]
      },
      {
        name: "Laboratoire virtuel",
        description: "Simulez des expériences culinaires avant de les réaliser",
        implemented: true,
        details: [
          "Simulation d'interactions entre ingrédients",
          "Prédiction des résultats d'expériences",
          "Optimisation des recettes avant réalisation"
        ]
      },
      {
        name: "Recettes moléculaires",
        description: "Collection de recettes utilisant des techniques moléculaires",
        implemented: true,
        details: [
          "Recettes classées par technique et niveau de difficulté",
          "Instructions détaillées et précises",
          "Alternatives pour les équipements spécialisés"
        ]
      }
    ]
  },
  {
    name: "Dîners & Événements sociaux",
    description: "Organisez des repas partagés, gérez les invitations et coordonnez les contributions de chacun.",
    features: [
      {
        name: "Planification d'événements",
        description: "Organisez des repas partagés",
        implemented: true,
        details: [
          "Création et gestion d'événements culinaires",
          "Planification du menu et des activités",
          "Gestion du calendrier et des rappels"
        ]
      },
      {
        name: "Gestion des invitations",
        description: "Invitez des amis et suivez leurs réponses",
        implemented: true,
        details: [
          "Envoi d'invitations personnalisées",
          "Suivi des réponses et confirmations",
          "Gestion de la liste des invités"
        ]
      },
      {
        name: "Coordination des contributions",
        description: "Organisez qui apporte quoi",
        implemented: true,
        details: [
          "Assignation des plats et boissons",
          "Équilibrage des contributions",
          "Prise en compte des restrictions alimentaires"
        ]
      },
      {
        name: "Évaluations post-événement",
        description: "Partagez vos impressions après l'événement",
        implemented: true,
        details: [
          "Système de notation des événements",
          "Commentaires et retours d'expérience",
          "Suggestions pour les prochains événements"
        ]
      },
      {
        name: "Galerie de souvenirs",
        description: "Partagez les photos de vos événements culinaires",
        implemented: true,
        details: [
          "Album photo collaboratif",
          "Partage des moments forts",
          "Archivage des événements passés"
        ]
      }
    ]
  },
  {
    name: "Personnalisation & Préférences",
    description: "Adaptez l'application à vos besoins spécifiques et gérez vos préférences personnelles.",
    features: [
      {
        name: "Profil nutritionnel",
        description: "Configurez vos préférences diététiques et allergies",
        implemented: true,
        details: [
          "Définition des objectifs nutritionnels",
          "Enregistrement des allergies et intolérances",
          "Suivi des progrès vers les objectifs"
        ]
      },
      {
        name: "Thèmes d'interface",
        description: "Personnalisez l'apparence de l'application",
        implemented: true,
        details: [
          "Choix entre thème clair et sombre",
          "Personnalisation des couleurs d'accent",
          "Adaptation automatique aux préférences système"
        ]
      },
      {
        name: "Suggestions personnalisées",
        description: "Recevez du contenu adapté à vos habitudes",
        implemented: true,
        details: [
          "Recommandations basées sur l'historique d'utilisation",
          "Suggestions adaptées aux préférences alimentaires",
          "Contenu saisonnier et local"
        ]
      },
      {
        name: "Synchronisation multi-appareils",
        description: "Retrouvez vos données sur tous vos appareils",
        implemented: true,
        details: [
          "Synchronisation en temps réel entre appareils",
          "Sauvegarde sécurisée dans le cloud",
          "Gestion des appareils connectés"
        ]
      },
      {
        name: "Paramètres d'accessibilité",
        description: "Adaptez l'interface à vos besoins d'accessibilité",
        implemented: true,
        details: [
          "Options de taille de texte et contraste",
          "Compatibilité avec les lecteurs d'écran",
          "Navigation au clavier améliorée"
        ]
      },
      {
        name: "Gestion de la confidentialité",
        description: "Contrôlez vos données et paramètres de partage",
        implemented: true,
        details: [
          "Options de partage de données granulaires",
          "Contrôle des informations visibles par la communauté",
          "Exportation et suppression des données personnelles"
        ]
      }
    ]
  }
];

const FeaturesTracking: React.FC = () => {
  // Calculate implementation percentages for each category
  const categoriesWithProgress = featuresData.map(category => {
    const implementedCount = category.features.filter(f => f.implemented).length;
    const totalCount = category.features.length;
    const percentage = Math.round((implementedCount / totalCount) * 100);
    
    return {
      ...category,
      implementedCount,
      totalCount,
      percentage
    };
  });

  // Calculate overall implementation percentage
  const totalImplemented = featuresData.reduce((acc, category) => 
    acc + category.features.filter(f => f.implemented).length, 0);
  const totalFeatures = featuresData.reduce((acc, category) => 
    acc + category.features.length, 0);
  const overallPercentage = Math.round((totalImplemented / totalFeatures) * 100);

  return (
    <div className="space-y-8 p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-wp-green-dark dark:text-wp-green">Suivi des fonctionnalités</h1>
        <p className="text-wp-gray-dark dark:text-wp-gray-light">
          Progression du développement de la plateforme culinaire
        </p>
        
        <div className="mt-6 max-w-xl mx-auto">
          <div className="flex justify-between text-sm mb-2">
            <span>Progression globale</span>
            <span className="font-medium">{overallPercentage}%</span>
          </div>
          <Progress value={overallPercentage} className="h-3" />
          <p className="text-sm mt-2 text-wp-gray-dark dark:text-wp-gray-light">
            {totalImplemented} sur {totalFeatures} fonctionnalités implémentées
          </p>
        </div>
      </div>

      {categoriesWithProgress.map((category, index) => (
        <Card key={index} className="mb-6 border-wp-green-light dark:border-wp-green-dark">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-wp-green-dark dark:text-wp-green">{category.name}</CardTitle>
                <CardDescription className="mt-1">{category.description}</CardDescription>
              </div>
              <Badge className={
                category.percentage === 100 
                  ? "bg-wp-green" 
                  : category.percentage >= 50 
                  ? "bg-wp-orange" 
                  : "bg-red-500"
              }>
                {category.percentage}%
              </Badge>
            </div>
            <div className="mt-4">
              <Progress value={category.percentage} className="h-2" />
              <p className="text-xs mt-1 text-wp-gray-dark dark:text-wp-gray-light">
                {category.implementedCount} sur {category.totalCount} fonctionnalités implémentées
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {category.features.map((feature, fIndex) => (
                <AccordionItem key={fIndex} value={`${index}-${fIndex}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-start gap-2 text-left">
                      <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        feature.implemented ? "bg-wp-green/20 text-wp-green" : "bg-gray-200 text-gray-400"
                      }`}>
                        {feature.implemented ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${feature.implemented ? "text-wp-green-dark dark:text-wp-green" : "text-wp-gray-dark dark:text-wp-gray-light"}`}>
                          {feature.name}
                        </p>
                        <p className="text-sm text-wp-gray-dark dark:text-wp-gray-light">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {feature.details && (
                      <div className="pl-7 pt-2">
                        <h4 className="text-sm font-medium mb-2 text-wp-green-dark dark:text-wp-green">Détails de la fonctionnalité :</h4>
                        <ul className="space-y-1 list-disc pl-5 text-sm text-wp-gray-dark dark:text-wp-gray-light">
                          {feature.details.map((detail, dIndex) => (
                            <li key={dIndex}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturesTracking;