import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BeakerIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface ChemicalPairing {
  compound1: string;
  compound2: string;
  compatibilityScore: number; // 0-100
  description: string;
  flavorProfile: string[];
  scientificExplanation: string;
  culinaryApplications: string[];
}

interface ChemicalCompatibilityChartProps {
  selectedIngredient?: string;
}

export default function ChemicalCompatibilityChart({ selectedIngredient }: ChemicalCompatibilityChartProps) {
  // Données d'exemple pour les associations chimiques
  const [chemicalPairings, setChemicalPairings] = useState<ChemicalPairing[]>([
    {
      compound1: "Vanilline",
      compound2: "Cinnamaldéhyde",
      compatibilityScore: 85,
      description: "Association harmonieuse entre la vanille et la cannelle",
      flavorProfile: ["Sucré", "Chaud", "Boisé"],
      scientificExplanation: "Les aldéhydes aromatiques de ces deux composés créent une synergie olfactive en se liant aux mêmes récepteurs.",
      culinaryApplications: ["Pâtisserie", "Boissons chaudes", "Desserts"]
    },
    {
      compound1: "Limonène",
      compound2: "Acide citrique",
      compatibilityScore: 90,
      description: "Combinaison d'agrumes intensifiée",
      flavorProfile: ["Acidulé", "Frais", "Vif"],
      scientificExplanation: "Le limonène (terpène) amplifie la perception de l'acidité, créant une expérience gustative plus intense.",
      culinaryApplications: ["Sauces", "Marinades", "Cocktails"]
    },
    {
      compound1: "Allicine",
      compound2: "Capsaïcine",
      compatibilityScore: 75,
      description: "Combinaison piquante ail-piment",
      flavorProfile: ["Piquant", "Aromatique", "Complexe"],
      scientificExplanation: "Les composés soufrés de l'ail potentialisent l'effet de la capsaïcine sur les récepteurs TRPV1.",
      culinaryApplications: ["Sauces épicées", "Plats asiatiques", "Marinades"]
    },
    {
      compound1: "Acide glutamique",
      compound2: "Inosinate",
      compatibilityScore: 95,
      description: "Synergie umami parfaite",
      flavorProfile: ["Umami", "Savoureux", "Profond"],
      scientificExplanation: "L'association de ces composés multiplie l'intensité de la saveur umami par 8 par rapport à chaque composé isolé.",
      culinaryApplications: ["Bouillons", "Sauces", "Plats mijotés"]
    },
    {
      compound1: "Myristicine",
      compound2: "Eugénol",
      compatibilityScore: 80,
      description: "Harmonie épicée muscade-clou de girofle",
      flavorProfile: ["Épicé", "Chaud", "Complexe"],
      scientificExplanation: "Ces phénylpropanoïdes partagent des structures moléculaires similaires qui créent une complémentarité aromatique.",
      culinaryApplications: ["Pâtisserie", "Plats d'hiver", "Boissons chaudes"]
    }
  ]);

  // Ajouter plus de pairings pour une meilleure expérience utilisateur
  useEffect(() => {
    const additionalPairings: ChemicalPairing[] = [
      {
        compound1: "Menthol",
        compound2: "Eucalyptol",
        compatibilityScore: 88,
        description: "Duo rafraîchissant menthe-eucalyptus",
        flavorProfile: ["Frais", "Mentholé", "Aromatique"],
        scientificExplanation: "Ces deux composés activent les récepteurs TRPM8 responsables de la sensation de fraîcheur.",
        culinaryApplications: ["Desserts glacés", "Boissons fraîches", "Sorbets"]
      },
      {
        compound1: "Diacétyle",
        compound2: "Acide butyrique",
        compatibilityScore: 82,
        description: "Profil beurré-fromager",
        flavorProfile: ["Crémeux", "Beurré", "Fromager"],
        scientificExplanation: "Le diacétyle apporte des notes de beurre qui complètent les notes fromagères de l'acide butyrique.",
        culinaryApplications: ["Sauces crémeuses", "Fromages", "Pâtisseries"]
      },
      {
        compound1: "Géraniol",
        compound2: "Linalol",
        compatibilityScore: 87,
        description: "Harmonie florale rose-lavande",
        flavorProfile: ["Floral", "Délicat", "Aromatique"],
        scientificExplanation: "Ces monoterpènes créent un bouquet floral complexe qui stimule les récepteurs olfactifs de manière complémentaire.",
        culinaryApplications: ["Desserts délicats", "Infusions", "Pâtisseries fines"]
      }
    ];
    
    setChemicalPairings([...chemicalPairings, ...additionalPairings]);
  }, []);

  // Filtrer les pairings si un ingrédient est sélectionné
  const filteredPairings = selectedIngredient 
    ? chemicalPairings.filter(pairing => 
        pairing.compound1.toLowerCase().includes(selectedIngredient.toLowerCase()) || 
        pairing.compound2.toLowerCase().includes(selectedIngredient.toLowerCase()))
    : chemicalPairings;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center">
          <BeakerIcon className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Compatibilités chimiques des aliments</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Découvrez les associations parfaites basées sur la chimie alimentaire
        </p>
      </div>

      <div className="p-6">
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                La science derrière les saveurs : les composés chimiques des aliments interagissent pour créer des expériences gustatives uniques. 
                Ces associations sont basées sur des principes scientifiques et des recherches en gastronomie moléculaire.
                {selectedIngredient && (
                  <span className="block mt-1 font-medium">
                    Affichage des compatibilités pour : {selectedIngredient}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredPairings.length === 0 ? (
            <div className="text-center py-8">
              <BeakerIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucune compatibilité trouvée pour cet ingrédient.</p>
              <p className="text-gray-400 text-sm mt-2">Essayez un autre terme de recherche ou consultez notre base de données complète.</p>
            </div>
          ) : (
            filteredPairings.map((pairing, index) => (
              <motion.div
                key={`${pairing.compound1}-${pairing.compound2}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-md font-medium text-gray-900">
                      {pairing.compound1} + {pairing.compound2}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700 mr-2">Compatibilité:</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            pairing.compatibilityScore > 80 ? 'bg-green-500' : 
                            pairing.compatibilityScore > 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${pairing.compatibilityScore}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">{pairing.compatibilityScore}%</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{pairing.description}</p>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Profil aromatique</h4>
                      <div className="flex flex-wrap gap-2">
                        {pairing.flavorProfile.map(flavor => (
                          <span 
                            key={flavor} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {flavor}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Applications culinaires</h4>
                      <div className="flex flex-wrap gap-2">
                        {pairing.culinaryApplications.map(app => (
                          <span 
                            key={app} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Explication scientifique</h4>
                    <p className="text-sm text-gray-600">{pairing.scientificExplanation}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}