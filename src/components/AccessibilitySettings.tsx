import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'react-toastify';
import { 
  EyeIcon, 
  SpeakerWaveIcon, 
  CursorArrowRaysIcon, 
  DevicePhoneMobileIcon 
} from '@heroicons/react/24/outline';

export default function AccessibilitySettings() {
  const [fontSize, setFontSize] = useState<string>('medium');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  const [screenReader, setScreenReader] = useState<boolean>(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    loadAccessibilitySettings();
  }, []);

  const loadAccessibilitySettings = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_preferences')
        .select('accessibility_settings')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching accessibility settings:', error);
        return;
      }

      if (data && data.accessibility_settings) {
        const settings = data.accessibility_settings;
        setFontSize(settings.fontSize || 'medium');
        setHighContrast(settings.highContrast || false);
        setReduceMotion(settings.reduceMotion || false);
        setScreenReader(settings.screenReader || false);
        setKeyboardNavigation(settings.keyboardNavigation !== false); // default to true
      }
    } catch (error) {
      console.error('Error loading accessibility settings:', error);
      toast.error('Erreur lors du chargement des paramètres d\'accessibilité');
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setIsSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Vous devez être connecté pour modifier vos préférences');
        return;
      }

      const accessibilitySettings = {
        fontSize,
        highContrast,
        reduceMotion,
        screenReader,
        keyboardNavigation
      };

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          accessibility_settings: accessibilitySettings
        });

      if (error) throw error;

      // Appliquer les paramètres immédiatement
      applyAccessibilitySettings(accessibilitySettings);
      
      toast.success('Paramètres d\'accessibilité mis à jour avec succès');
    } catch (error) {
      console.error('Error saving accessibility settings:', error);
      toast.error('Erreur lors de la sauvegarde des paramètres d\'accessibilité');
    } finally {
      setIsSaving(false);
    }
  };

  const applyAccessibilitySettings = (settings: any) => {
    // Appliquer la taille de police
    document.documentElement.setAttribute('data-font-size', settings.fontSize);
    
    // Appliquer le contraste élevé
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Appliquer la réduction de mouvement
    if (settings.reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
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
      <h2 className="text-lg font-medium text-gray-900 mb-6">Paramètres d'accessibilité</h2>
      
      <div className="space-y-6">
        {/* Taille de police */}
        <div>
          <div className="flex items-center">
            <EyeIcon className="h-5 w-5 text-indigo-600 mr-2" aria-hidden="true" />
            <h3 className="text-base font-medium text-gray-900">Taille de texte</h3>
          </div>
          <p className="mt-1 text-sm text-gray-500 mb-3">
            Ajustez la taille du texte pour une meilleure lisibilité
          </p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { id: 'small', label: 'Petit' },
              { id: 'medium', label: 'Moyen' },
              { id: 'large', label: 'Grand' },
              { id: 'x-large', label: 'Très grand' }
            ].map((size) => (
              <div
                key={size.id}
                onClick={() => setFontSize(size.id)}
                className={`${
                  fontSize === size.id
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                } cursor-pointer rounded-lg border p-3 text-center`}
                role="radio"
                aria-checked={fontSize === size.id}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setFontSize(size.id);
                    e.preventDefault();
                  }
                }}
              >
                <span className="text-sm font-medium">{size.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contraste élevé */}
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <EyeIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-900">Contraste élevé</h3>
              <p className="text-sm text-gray-500">
                Augmente le contraste des couleurs pour une meilleure lisibilité
              </p>
            </div>
          </div>
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`${
              highContrast ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            aria-pressed={highContrast}
            aria-labelledby="high-contrast-label"
          >
            <span className="sr-only">Activer le contraste élevé</span>
            <span
              id="high-contrast-label"
              className="sr-only"
            >
              {highContrast ? 'Contraste élevé activé' : 'Contraste élevé désactivé'}
            </span>
            <span
              className={`${
                highContrast ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </button>
        </div>

        {/* Réduire les animations */}
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <DevicePhoneMobileIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-900">Réduire les animations</h3>
              <p className="text-sm text-gray-500">
                Désactive ou réduit les animations et transitions
              </p>
            </div>
          </div>
          <button
            onClick={() => setReduceMotion(!reduceMotion)}
            className={`${
              reduceMotion ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            aria-pressed={reduceMotion}
            aria-labelledby="reduce-motion-label"
          >
            <span className="sr-only">Réduire les animations</span>
            <span
              id="reduce-motion-label"
              className="sr-only"
            >
              {reduceMotion ? 'Animations réduites' : 'Animations normales'}
            </span>
            <span
              className={`${
                reduceMotion ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </button>
        </div>

        {/* Compatibilité lecteur d'écran */}
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <SpeakerWaveIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-900">Compatibilité lecteur d'écran</h3>
              <p className="text-sm text-gray-500">
                Optimise l'interface pour les lecteurs d'écran
              </p>
            </div>
          </div>
          <button
            onClick={() => setScreenReader(!screenReader)}
            className={`${
              screenReader ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            aria-pressed={screenReader}
            aria-labelledby="screen-reader-label"
          >
            <span className="sr-only">Activer la compatibilité lecteur d'écran</span>
            <span
              id="screen-reader-label"
              className="sr-only"
            >
              {screenReader ? 'Compatibilité lecteur d\'écran activée' : 'Compatibilité lecteur d\'écran désactivée'}
            </span>
            <span
              className={`${
                screenReader ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </button>
        </div>

        {/* Navigation au clavier */}
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CursorArrowRaysIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-900">Navigation au clavier</h3>
              <p className="text-sm text-gray-500">
                Améliore la navigation au clavier avec des raccourcis et des indicateurs de focus
              </p>
            </div>
          </div>
          <button
            onClick={() => setKeyboardNavigation(!keyboardNavigation)}
            className={`${
              keyboardNavigation ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            aria-pressed={keyboardNavigation}
            aria-labelledby="keyboard-navigation-label"
          >
            <span className="sr-only">Activer la navigation au clavier</span>
            <span
              id="keyboard-navigation-label"
              className="sr-only"
            >
              {keyboardNavigation ? 'Navigation au clavier activée' : 'Navigation au clavier désactivée'}
            </span>
            <span
              className={`${
                keyboardNavigation ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </button>
        </div>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-end">
          <button
            onClick={saveSettings}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            aria-busy={isSaving}
          >
            {isSaving ? 'Enregistrement...' : 'Enregistrer les paramètres'}
          </button>
        </div>
      </div>
    </div>
  );
}