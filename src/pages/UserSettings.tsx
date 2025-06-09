import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  ShieldCheckIcon, 
  BellAlertIcon, 
  PaintBrushIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import UserDataSharingSettings from '../components/UserDataSharingSettings';
import AccessibilitySettings from '../components/AccessibilitySettings';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import Layout from "@/components/layout/Layout";
import { useLocation } from "react-router-dom";

export default function Settings() {
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState('privacy');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab") || location.hash.replace("#", "") || "profil";

  useEffect(() => {
    const initializeUserPreferences = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        // Try to get existing preferences
        const { data: existingPrefs, error: fetchError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (fetchError) throw fetchError;

        // If no preferences exist, create default preferences
        if (!existingPrefs) {
          const { error: insertError } = await supabase
            .from('user_preferences')
            .insert([
              {
                user_id: user.id,
                data_sharing_enabled: true,
                notification_preferences: {
                  social: true,
                  system: true,
                  ai_insights: true
                },
                ui_preferences: {
                  theme: 'light',
                  language: 'fr'
                },
                accessibility_settings: {
                  fontSize: 'medium',
                  highContrast: false,
                  reduceMotion: false,
                  screenReader: false,
                  keyboardNavigation: true
                }
              }
            ]);

          if (insertError) throw insertError;
        }
      } catch (err) {
        console.error('Error initializing user preferences:', err);
        setError('Une erreur est survenue lors de l\'initialisation des préférences');
      } finally {
        setLoading(false);
      }
    };

    initializeUserPreferences();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      // La redirection sera gérée par le AuthProvider
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <Layout>
<section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-wp-green-dark mb-2">
            Paramètres
          </h1>
          <p className="mt-1 text-sm text-white">
            Gérez vos préférences et personnalisez votre expérience
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Menu de navigation */}
        <div className="md:col-span-1">
          <nav className="space-y-1" aria-label="Paramètres">
            {[
              { name: 'Profil', icon: UserIcon, id: 'profile', href: '#profile' },
              { name: 'Confidentialité', icon: ShieldCheckIcon, id: 'privacy', href: '#privacy' },
              { name: 'Notifications', icon: BellAlertIcon, id: 'notifications', href: '#notifications' },
              { name: 'Apparence', icon: PaintBrushIcon, id: 'appearance', href: '#appearance' },
              { name: 'Accessibilité', icon: AdjustmentsHorizontalIcon, id: 'accessibility', href: '#accessibility' },
              { name: 'Appareils', icon: DevicePhoneMobileIcon, id: 'devices', href: '#devices' },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                }}
                className={`${
                  activeTab === item.id
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-200 hover:bg-gray-50 hover:text-gray-900'
                } flex items-center px-3 py-2 text-sm font-medium border-l-4`}
                aria-current={activeTab === item.id ? 'page' : undefined}
              >
                <item.icon
                  className={`${
                    activeTab === item.id ? 'text-indigo-500' : 'text-gray-400'
                  } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
              </a>
            ))}
          </nav>

          <div className="mt-8">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Se déconnecter
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="md:col-span-3 space-y-6">
          {/* Section de confidentialité */}
          {activeTab === 'privacy' && (
            <motion.section
              id="privacy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-medium text-indigo-400 mb-4">Confidentialité et partage de données</h2>
              <UserDataSharingSettings />
            </motion.section>
          )}

          {/* Section d'accessibilité */}
          {activeTab === 'accessibility' && (
            <motion.section
              id="accessibility"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-medium text-indigo-400 mb-4">Accessibilité</h2>
              <AccessibilitySettings />
            </motion.section>
          )}

          {/* Section de notifications */}
          {activeTab === 'notifications' && (
            <motion.section
              id="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-medium text-indigo-400 mb-4">Notifications</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-sm text-gray-500 mb-4">
                  Configurez les notifications que vous souhaitez recevoir
                </p>
                
                <div className="space-y-4">
                  {[
                    { id: 'expiration', label: 'Alertes d\'expiration', description: 'Notifications pour les aliments qui vont bientôt expirer' },
                    { id: 'suggestions', label: 'Suggestions de recettes', description: 'Recettes personnalisées basées sur votre garde-manger' },
                    { id: 'watering', label: 'Rappels d\'arrosage', description: 'Rappels pour arroser vos plantes' },
                    { id: 'social', label: 'Interactions sociales', description: 'Commentaires et réponses à vos publications' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{item.label}</h3>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                      <button
                        className="bg-indigo-600 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        aria-pressed="true"
                        aria-labelledby={`${item.id}-label`}
                      >
                        <span className="sr-only">Activer {item.label}</span>
                        <span
                          id={`${item.id}-label`}
                          className="sr-only"
                        >
                          {item.label} activé
                        </span>
                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* Section d'apparence */}
          {activeTab === 'appearance' && (
            <motion.section
              id="appearance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg font-medium text-indigo-400 mb-4">Apparence</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-6">
                  {/* Thème */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Thème</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {['Clair', 'Sombre', 'Système'].map((theme) => (
                        <div
                          key={theme}
                          className={`border rounded-lg p-3 text-center cursor-pointer ${
                            theme === 'Clair' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                          }`}
                          role="radio"
                          aria-checked={theme === 'Clair'}
                          tabIndex={0}
                        >
                          <span className="text-sm font-medium text-black">{theme}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Couleur d'accent */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Couleur d'accent</h3>
                    <div className="flex space-x-3">
                      {[
                        { name: 'Indigo', color: 'bg-indigo-500' },
                        { name: 'Emeraude', color: 'bg-emerald-500' },
                        { name: 'Ambre', color: 'bg-amber-500' },
                        { name: 'Rose', color: 'bg-rose-500' },
                        { name: 'Violet', color: 'bg-purple-500' }
                      ].map((color) => (
                        <button
                          key={color.name}
                          className={`w-8 h-8 rounded-full ${color.color} ${
                            color.name === 'Indigo' ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                          }`}
                          title={color.name}
                          aria-label={`Couleur ${color.name}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Taille de police */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Taille de police</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">A</span>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        defaultValue="3"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        aria-label="Taille de police"
                      />
                      <span className="text-lg">A</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Section de profil */}
          {activeTab === 'profile' && (
            <motion.section
              id="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-medium text-indigo-400 mb-4">Informations du profil</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Adresse e-mail
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        disabled
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50"
                        value={user?.email || ''}
                        aria-label="Adresse e-mail"
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
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue="Jean Dupont"
                        aria-label="Nom complet"
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
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            aria-label="Mot de passe actuel"
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
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            aria-label="Nouveau mot de passe"
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
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            aria-label="Confirmer le mot de passe"
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
              </div>
            </motion.section>
          )}

          {/* Section des appareils */}
          {activeTab === 'devices' && (
            <motion.section
              id="devices"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-medium text-indigo-400 mb-4">Appareils connectés</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-sm text-gray-500 mb-4">
                  Gérez les appareils connectés à votre compte
                </p>
                
                <div className="space-y-4">
                  {[
                    { device: 'iPhone 13', location: 'Paris, France', lastActive: 'Aujourd\'hui à 14:32' },
                    { device: 'MacBook Pro', location: 'Paris, France', lastActive: 'Aujourd\'hui à 10:15' },
                    { device: 'iPad Air', location: 'Lyon, France', lastActive: 'Hier à 18:45' }
                  ].map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{device.device}</h3>
                        <p className="text-xs text-gray-500">{device.location} • {device.lastActive}</p>
                      </div>
                      <button
                        className="text-sm text-red-600 hover:text-red-800"
                        aria-label={`Déconnecter ${device.device}`}
                      >
                        Déconnecter
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <button
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                    aria-label="Déconnecter tous les appareils"
                  >
                    Déconnecter tous les appareils
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </div>
    </section>
    </Layout>
  );
}