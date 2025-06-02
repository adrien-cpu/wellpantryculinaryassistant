import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  ChartPieIcon, 
  BeakerIcon, 
  ScaleIcon
} from '@heroicons/react/24/outline';
import UserNutritionProfile from '../components/UserNutritionProfile';
import NutritionGoalsWidget from '../components/NutritionGoalsWidget';
import ChemicalCompatibilityChart from '../components/ChemicalCompatibilityChart';
import Layout from "@/components/layout/Layout";

export default function Profile() {
  const [activeTab, setActiveTab] = useState('nutrition');
  const [email, setEmail] = useState("utilisateur@example.com");
  const [fullName, setFullName] = useState("Jean Dupont");

  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="space-y-8 max-w-5xl mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-bold text-wp-green-dark dark:text-wp-green mb-2">
                Profil personnel
              </h1>
              <p className="mt-1 text-sm text-white/90">
                Gérez vos informations nutritionnelles et vos objectifs de santé
              </p>
            </div>
          </div>

          {/* Onglets */}
          <div className="border-b border-gray-200 ">
            <nav className="-mb-px flex space-x-8 ">
              {[
                { id: 'nutrition', name: 'Profil nutritionnel', icon: ChartPieIcon },
                { id: 'goals', name: 'Objectifs', icon: ScaleIcon },
                { id: 'chemistry', name: 'Chimie alimentaire', icon: BeakerIcon },
                { id: 'account', name: 'Compte', icon: UserIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-white hover:border-gray-400 hover:text-gray-400'
                  } group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium`}
                >
                  <tab.icon
                    className={`${
                      activeTab === tab.id ? 'text-indigo-100' : 'text-gray-400 group-hover:text-gray-400'
                    } -ml-0.5 mr-2 h-5 w-5`}
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Contenu des onglets */}
          <div>
            {activeTab === 'nutrition' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <UserNutritionProfile createIfNotExists />
              </motion.div>
            )}

            {activeTab === 'goals' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <NutritionGoalsWidget />
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Recommandations personnalisées</h2>
                    <div className="space-y-4">
                      <div className="bg-green-50 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-green-800">Basées sur vos objectifs</h3>
                        <ul className="mt-2 text-sm text-green-700 space-y-1">
                          <li className="flex items-start">
                            <span className="h-5 w-5 flex items-center justify-center rounded-full bg-green-200 text-green-600 mr-2">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            Augmentez votre consommation de protéines maigres
                          </li>
                          <li className="flex items-start">
                            <span className="h-5 w-5 flex items-center justify-center rounded-full bg-green-200 text-green-600 mr-2">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            Privilégiez les glucides complexes pour une énergie durable
                          </li>
                          <li className="flex items-start">
                            <span className="h-5 w-5 flex items-center justify-center rounded-full bg-green-200 text-green-600 mr-2">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            Intégrez des acides gras essentiels (oméga-3) dans votre alimentation
                          </li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-blue-800">Basées sur vos préférences</h3>
                        <ul className="mt-2 text-sm text-blue-700 space-y-1">
                          <li className="flex items-start">
                            <span className="h-5 w-5 flex items-center justify-center rounded-full bg-blue-200 text-blue-600 mr-2">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            Essayez des alternatives végétales riches en protéines
                          </li>
                          <li className="flex items-start">
                            <span className="h-5 w-5 flex items-center justify-center rounded-full bg-blue-200 text-blue-600 mr-2">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            Explorez les épices et herbes pour remplacer le sel
                          </li>
                          <li className="flex items-start">
                            <span className="h-5 w-5 flex items-center justify-center rounded-full bg-blue-200 text-blue-600 mr-2">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            Découvrez des recettes méditerranéennes adaptées à vos goûts
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'chemistry' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ChemicalCompatibilityChart />
              </motion.div>
            )}

            {activeTab === 'account' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-lg font-medium text-gray-900 mb-4">Informations du compte</h2>
                <div className="space-y-6 text-sm text-gray-700">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Adresse e-mail
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-md bg-white border-2 border-indigo-300 shadow text-base focus:border-indigo-500 focus:ring-indigo-500"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nom complet
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md bg-white border-2 border-indigo-300 shadow text-base focus:border-indigo-500 focus:ring-indigo-500"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        autoComplete="name"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Mettre à jour le profil
                    </button>
                  </div>
                  <div className="pt-6 border-t">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Changer de mot de passe</h3>
                    <div className="space-y-4">
                      <div>
    <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
      Mot de passe actuel
    </label>
    <div className="mt-1">
      <input
        type="password"
        name="current_password"
        id="current_password"
        className="block w-full rounded-md bg-white border-2 border-indigo-300 shadow text-base focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  </div>
  <div>
    <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
      Nouveau mot de passe
    </label>
    <div className="mt-1">
      <input
        type="password"
        name="new_password"
        id="new_password"
        className="block w-full rounded-md bg-white border-2 border-indigo-300 shadow text-base focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  </div>
  <div>
    <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
      Confirmer le mot de passe
    </label>
    <div className="mt-1">
      <input
        type="password"
        name="confirm_password"
        id="confirm_password"
        className="block w-full rounded-md bg-white border-2 border-indigo-300 shadow text-base focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  </div>
  <div>
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Changer le mot de passe
    </button>
  </div>
</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}