import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'react-toastify';
import { 
  ShieldCheckIcon, 
  LightBulbIcon, 
  UserGroupIcon, 
  InformationCircleIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext';

export default function UserDataSharingSettings() {
  const { user } = useAuth();
  const [dataSharingEnabled, setDataSharingEnabled] = useState(true);
  const [aiInsightsEnabled, setAiInsightsEnabled] = useState(true);
  const [communityContributionsEnabled, setCommunityContributionsEnabled] = useState(true);
  const [anonymousAnalyticsEnabled, setAnonymousAnalyticsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadUserPreferences();
  }, [user]);

  const loadUserPreferences = async () => {
    try {
      setIsLoading(true);
      if (!user) return;

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user preferences:', error);
        return;
      }

      if (data) {
        setDataSharingEnabled(data.data_sharing_enabled);
        
        // Charger les préférences détaillées si elles existent
        if (data.notification_preferences) {
          const notifPrefs = data.notification_preferences;
          setAiInsightsEnabled(notifPrefs.ai_insights);
        }
        
        // Charger les préférences de contribution communautaire
        if (data.community_preferences) {
          const communityPrefs = data.community_preferences;
          setCommunityContributionsEnabled(communityPrefs.share_contributions);
          setAnonymousAnalyticsEnabled(communityPrefs.anonymous_analytics);
        }
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
      toast.error('Erreur lors du chargement des préférences');
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = async () => {
    try {
      setIsSaving(true);
      if (!user) {
        toast.error('Vous devez être connecté pour modifier vos préférences');
        return;
      }

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          data_sharing_enabled: dataSharingEnabled,
          notification_preferences: {
            social: true,
            system: true,
            ai_insights: aiInsightsEnabled
          },
          community_preferences: {
            share_contributions: communityContributionsEnabled,
            anonymous_analytics: anonymousAnalyticsEnabled
          }
        });

      if (error) throw error;

      toast.success('Préférences mises à jour avec succès');
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Erreur lors de la sauvegarde des préférences');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Paramètres de confidentialité et partage</h2>
      
      <div className="space-y-6">
        {/* Paramètre principal de partage de données */}
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <ShieldCheckIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-900">Partage de données</h3>
              <p className="text-sm text-gray-500">
                Autoriser l'application à utiliser vos contributions pour améliorer l'expérience de tous
              </p>
            </div>
          </div>
          <button
            onClick={() => setDataSharingEnabled(!dataSharingEnabled)}
            className={`${
              dataSharingEnabled ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            aria-pressed={dataSharingEnabled}
            aria-labelledby="data-sharing-label"
          >
            <span className="sr-only">Activer le partage de données</span>
            <span
              id="data-sharing-label"
              className="sr-only"
            >
              {dataSharingEnabled ? 'Partage de données activé' : 'Partage de données désactivé'}
            </span>
            <span
              className={`${
                dataSharingEnabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </button>
        </div>

        {/* Paramètres détaillés (visibles uniquement si le partage principal est activé) */}
        {dataSharingEnabled && (
          <div className="ml-9 space-y-4 border-l-2 border-indigo-100 pl-4">
            {/* Insights IA */}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <LightBulbIcon className="h-5 w-5 text-amber-500" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Insights d'IA</h3>
                  <p className="text-xs text-gray-500">
                    Permettre à l'IA d'analyser vos commentaires pour en extraire des améliorations
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAiInsightsEnabled(!aiInsightsEnabled)}
                className={`${
                  aiInsightsEnabled ? 'bg-amber-500' : 'bg-gray-200'
                } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2`}
                aria-pressed={aiInsightsEnabled}
                aria-labelledby="ai-insights-label"
              >
                <span className="sr-only">Activer les insights d'IA</span>
                <span
                  id="ai-insights-label"
                  className="sr-only"
                >
                  {aiInsightsEnabled ? 'Insights d\'IA activés' : 'Insights d\'IA désactivés'}
                </span>
                <span
                  className={`${
                    aiInsightsEnabled ? 'translate-x-5' : 'translate-x-1'
                  } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                />
              </button>
            </div>

            {/* Contributions communautaires */}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Contributions communautaires</h3>
                  <p className="text-xs text-gray-500">
                    Partager vos améliorations de recettes avec la communauté
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCommunityContributionsEnabled(!communityContributionsEnabled)}
                className={`${
                  communityContributionsEnabled ? 'bg-green-500' : 'bg-gray-200'
                } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                aria-pressed={communityContributionsEnabled}
                aria-labelledby="community-contributions-label"
              >
                <span className="sr-only">Activer les contributions communautaires</span>
                <span
                  id="community-contributions-label"
                  className="sr-only"
                >
                  {communityContributionsEnabled ? 'Contributions communautaires activées' : 'Contributions communautaires désactivées'}
                </span>
                <span
                  className={`${
                    communityContributionsEnabled ? 'translate-x-5' : 'translate-x-1'
                  } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                />
              </button>
            </div>

            {/* Analytiques anonymes */}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <InformationCircleIcon className="h-5 w-5 text-blue-500" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Analytiques anonymes</h3>
                  <p className="text-xs text-gray-500">
                    Partager des statistiques d'utilisation anonymisées pour améliorer l'application
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAnonymousAnalyticsEnabled(!anonymousAnalyticsEnabled)}
                className={`${
                  anonymousAnalyticsEnabled ? 'bg-blue-500' : 'bg-gray-200'
                } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                aria-pressed={anonymousAnalyticsEnabled}
                aria-labelledby="anonymous-analytics-label"
              >
                <span className="sr-only">Activer les analytiques anonymes</span>
                <span
                  id="anonymous-analytics-label"
                  className="sr-only"
                >
                  {anonymousAnalyticsEnabled ? 'Analytiques anonymes activées' : 'Analytiques anonymes désactivées'}
                </span>
                <span
                  className={`${
                    anonymousAnalyticsEnabled ? 'translate-x-5' : 'translate-x-1'
                  } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Note d'information */}
        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700" role="alert">
          <p className="flex items-start">
            <InformationCircleIcon className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" aria-hidden="true" />
            <span>
              Vos données sont toujours traitées de manière sécurisée. Vous pouvez modifier ces paramètres à tout moment.
              <a href="/privacy" className="ml-1 font-medium text-blue-700 underline">
                En savoir plus sur notre politique de confidentialité
              </a>
            </span>
          </p>
        </div>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-end">
          <button
            onClick={savePreferences}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            aria-busy={isSaving}
          >
            {isSaving ? 'Enregistrement...' : 'Enregistrer les préférences'}
          </button>
        </div>
      </div>
    </div>
  );
}