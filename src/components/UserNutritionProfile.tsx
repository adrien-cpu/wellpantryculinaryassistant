import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { 
  ScaleIcon, 
  HeartIcon, 
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusSmallIcon
} from '@heroicons/react/24/outline';

interface NutritionProfile {
  height?: number; // en cm
  weight?: number; // en kg
  target_weight?: number; // en kg
  gender?: 'male' | 'female' | 'other';
  age?: number;
  activity_level?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  weight_goal?: 'lose' | 'maintain' | 'gain';
  dietary_preferences?: string[];
  allergies?: string[];
  health_conditions?: string[];
  daily_calorie_target?: number;
  macros_target?: {
    protein: number; // en %
    carbs: number; // en %
    fat: number; // en %
  };
}

interface UserNutritionProfileProps {
  /**
   * Si true, crée automatiquement un profil si aucun n'existe
   */
  createIfNotExists?: boolean;
}

const dietaryOptions = [
  { id: 'vegetarian', label: 'Végétarien' },
  { id: 'vegan', label: 'Végétalien' },
  { id: 'pescatarian', label: 'Pescétarien' },
  { id: 'gluten_free', label: 'Sans gluten' },
  { id: 'lactose_free', label: 'Sans lactose' },
  { id: 'keto', label: 'Cétogène' },
  { id: 'paleo', label: 'Paléo' },
  { id: 'low_carb', label: 'Faible en glucides' },
  { id: 'mediterranean', label: 'Méditerranéen' }
];

const allergyOptions = [
  { id: 'peanuts', label: 'Arachides' },
  { id: 'tree_nuts', label: 'Fruits à coque' },
  { id: 'milk', label: 'Lait' },
  { id: 'eggs', label: 'Œufs' },
  { id: 'fish', label: 'Poisson' },
  { id: 'shellfish', label: 'Fruits de mer' },
  { id: 'soy', label: 'Soja' },
  { id: 'wheat', label: 'Blé' },
  { id: 'sesame', label: 'Sésame' }
];

const healthConditionOptions = [
  { id: 'diabetes', label: 'Diabète' },
  { id: 'hypertension', label: 'Hypertension' },
  { id: 'heart_disease', label: 'Maladie cardiaque' },
  { id: 'celiac', label: 'Maladie cœliaque' },
  { id: 'ibs', label: 'Syndrome du côlon irritable' },
  { id: 'gerd', label: 'Reflux gastro-œsophagien' }
];

export default function UserNutritionProfile({ createIfNotExists = false }: UserNutritionProfileProps) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<NutritionProfile>({
    dietary_preferences: [],
    allergies: [],
    health_conditions: [],
    macros_target: { protein: 30, carbs: 40, fat: 30 }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [showHealthDisclaimer, setShowHealthDisclaimer] = useState(true);
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, [user]);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      if (!user) return;

      const { data, error } = await supabase
        .from('user_nutrition_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching nutrition profile:', error);
        return;
      }

      if (data) {
        setProfileExists(true);
        setProfile({
          height: data.height,
          weight: data.weight,
          target_weight: data.target_weight,
          gender: data.gender,
          age: data.age,
          activity_level: data.activity_level,
          weight_goal: data.weight_goal,
          dietary_preferences: data.dietary_preferences || [],
          allergies: data.allergies || [],
          health_conditions: data.health_conditions || [],
          daily_calorie_target: data.daily_calorie_target,
          macros_target: data.macros_target || { protein: 30, carbs: 40, fat: 30 }
        });
      } else {
        setProfileExists(false);
        if (createIfNotExists) {
          await createNewProfile();
        }
      }
    } catch (error) {
      console.error('Error loading nutrition profile:', error);
      toast.error('Erreur lors du chargement du profil nutritionnel');
    } finally {
      setIsLoading(false);
    }
  };

  const createNewProfile = async () => {
    try {
      if (!user) return;

      // Vérifier si un profil existe déjà
      const { data: existingProfile } = await supabase
        .from('user_nutrition_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingProfile) {
        setProfileExists(true);
        return; // Ne pas créer de nouveau profil si un existe déjà
      }

      const defaultProfile: NutritionProfile = {
        dietary_preferences: [],
        allergies: [],
        health_conditions: [],
        macros_target: { protein: 30, carbs: 40, fat: 30 }
      };

      const { error } = await supabase
        .from('user_nutrition_profiles')
        .insert({
          user_id: user.id,
          ...defaultProfile
        });

      if (error) throw error;

      setProfile(defaultProfile);
      setProfileExists(true);
      toast.success('Profil nutritionnel créé avec succès');
    } catch (error) {
      console.error('Error creating nutrition profile:', error);
      toast.error('Erreur lors de la création du profil nutritionnel');
    }
  };

  const saveProfile = async () => {
    try {
      setIsSaving(true);
      if (!user) {
        toast.error('Vous devez être connecté pour enregistrer votre profil');
        return;
      }

      // Calculer les objectifs caloriques si non définis
      if (!profile.daily_calorie_target && profile.weight && profile.height && profile.age && profile.gender && profile.activity_level) {
        const calculatedCalories = calculateDailyCalories(
          profile.weight,
          profile.height,
          profile.age,
          profile.gender,
          profile.activity_level,
          profile.weight_goal
        );
        setProfile(prev => ({ ...prev, daily_calorie_target: calculatedCalories }));
      }

      const { error } = await supabase
        .from('user_nutrition_profiles')
        .upsert({
          user_id: user.id,
          height: profile.height,
          weight: profile.weight,
          target_weight: profile.target_weight,
          gender: profile.gender,
          age: profile.age,
          activity_level: profile.activity_level,
          weight_goal: profile.weight_goal,
          dietary_preferences: profile.dietary_preferences,
          allergies: profile.allergies,
          health_conditions: profile.health_conditions,
          daily_calorie_target: profile.daily_calorie_target,
          macros_target: profile.macros_target
        });

      if (error) throw error;

      toast.success('Profil nutritionnel mis à jour avec succès');
      
      // Mettre à jour les préférences diététiques dans le contexte utilisateur
      await updateUserContext(user.id, profile.dietary_preferences || []);
    } catch (error) {
      console.error('Error saving nutrition profile:', error);
      toast.error('Erreur lors de la sauvegarde du profil nutritionnel');
    } finally {
      setIsSaving(false);
    }
  };

  const updateUserContext = async (userId: string, dietaryPreferences: string[]) => {
    try {
      const { error } = await supabase
        .from('user_contexts')
        .upsert({
          user_id: userId,
          dietary_preferences: dietaryPreferences
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating user context:', error);
    }
  };

  const calculateDailyCalories = (
    weight: number,
    height: number,
    age: number,
    gender: string,
    activityLevel: string,
    weightGoal?: string
  ): number => {
    // Formule de Harris-Benedict pour le métabolisme de base (BMR)
    let bmr = 0;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // Facteur d'activité
    let activityFactor = 1.2; // sédentaire
    switch (activityLevel) {
      case 'light':
        activityFactor = 1.375;
        break;
      case 'moderate':
        activityFactor = 1.55;
        break;
      case 'active':
        activityFactor = 1.725;
        break;
      case 'very_active':
        activityFactor = 1.9;
        break;
    }

    // Calories totales
    let totalCalories = bmr * activityFactor;

    // Ajustement selon l'objectif de poids
    if (weightGoal === 'lose') {
      totalCalories *= 0.8; // Déficit de 20%
    } else if (weightGoal === 'gain') {
      totalCalories *= 1.15; // Surplus de 15%
    }

    return Math.round(totalCalories);
  };

  const handleToggleOption = (category: 'dietary_preferences' | 'allergies' | 'health_conditions', optionId: string) => {
    setProfile(prev => {
      const currentOptions = prev[category] || [];
      const newOptions = currentOptions.includes(optionId)
        ? currentOptions.filter(id => id !== optionId)
        : [...currentOptions, optionId];
      
      return { ...prev, [category]: newOptions };
    });
  };

  const handleMacroChange = (macro: 'protein' | 'carbs' | 'fat', value: number) => {
    // Limiter la valeur entre 0 et 100
    const clampedValue = Math.max(0, Math.min(100, value));
    
    setProfile(prev => {
      const currentMacros = prev.macros_target || { protein: 0, carbs: 0, fat: 0 };
      const newMacros = { ...currentMacros, [macro]: clampedValue };
      
      // Ajuster les autres macros pour que le total soit 100%
      const total = newMacros.protein + newMacros.carbs + newMacros.fat;
      if (total !== 100) {
        // Répartir la différence entre les autres macros
        const diff = 100 - total;
        const otherMacros = Object.keys(newMacros).filter(m => m !== macro) as Array<'protein' | 'carbs' | 'fat'>;
        
        // Si un seul autre macro, lui attribuer toute la différence
        if (otherMacros.length === 1) {
          newMacros[otherMacros[0]] = Math.max(0, newMacros[otherMacros[0]] + diff);
        } 
        // Sinon répartir proportionnellement
        else {
          const otherTotal = otherMacros.reduce((sum, m) => sum + newMacros[m], 0);
          if (otherTotal > 0) {
            otherMacros.forEach(m => {
              const proportion = newMacros[m] / otherTotal;
              newMacros[m] = Math.max(0, newMacros[m] + diff * proportion);
            });
          } else {
            // Si les autres sont à 0, répartir également
            otherMacros.forEach(m => {
              newMacros[m] = Math.max(0, diff / otherMacros.length);
            });
          }
        }
      }
      
      // Arrondir les valeurs
      Object.keys(newMacros).forEach(m => {
        newMacros[m as keyof typeof newMacros] = Math.round(newMacros[m as keyof typeof newMacros]);
      });
      
      return { ...prev, macros_target: newMacros };
    });
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

  if (!profileExists && !createIfNotExists) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900">Aucun profil nutritionnel</h2>
          <p className="mt-1 text-sm text-gray-500">
            Vous n'avez pas encore de profil nutritionnel. Créez-en un pour commencer à suivre vos objectifs.
          </p>
          <button
            onClick={createNewProfile}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Créer mon profil nutritionnel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* En-tête */}
      <div className="p-6 border-b">
        <h2 className="text-lg font-medium text-gray-900">Profil nutritionnel et objectifs de santé</h2>
        <p className="mt-1 text-sm text-gray-500">
          Personnalisez vos préférences alimentaires et définissez vos objectifs de santé
        </p>
      </div>

      {/* Avertissement santé */}
      {showHealthDisclaimer && (
        <div className="bg-amber-50 p-4 border-b border-amber-100">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700">
                Les informations et recommandations fournies par cette application ne remplacent pas l'avis d'un professionnel de santé. 
                Consultez toujours un médecin ou un nutritionniste avant d'entreprendre un changement significatif dans votre alimentation.
              </p>
              <button 
                className="mt-2 text-sm font-medium text-amber-700 hover:text-amber-600"
                onClick={() => setShowHealthDisclaimer(false)}
              >
                Compris
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {[
            { id: 'basic', label: 'Informations de base' },
            { id: 'diet', label: 'Régime alimentaire' },
            { id: 'health', label: 'Santé' },
            { id: 'goals', label: 'Objectifs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu des onglets */}
      <div className="p-6">
        {/* Informations de base */}
        {activeTab === 'basic' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Genre
                </label>
                <select
                  id="gender"
                  value={profile.gender || ''}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                  className="mt-1 block w-full rounded-md bg-white border-2 border-indigo-400 text-black text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Sélectionner</option>
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Âge
                </label>
                <input
                  type="number"
                  id="age"
                  min="18"
                  max="120"
                  value={profile.age || ''}
                  onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || undefined })}
                  className="mt-1 block w-full rounded-md bg-white border-2 border-indigo-400 text-black text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                  Taille (cm)
                </label>
                <input
                  type="number"
                  id="height"
                  min="100"
                  max="250"
                  value={profile.height || ''}
                  onChange={(e) => setProfile({ ...profile, height: parseInt(e.target.value) || undefined })}
                  className="mt-1 block w-full rounded-md bg-white border-2 border-indigo-400 text-black text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                  Poids actuel (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  min="30"
                  max="300"
                  step="0.1"
                  value={profile.weight || ''}
                  onChange={(e) => setProfile({ ...profile, weight: parseFloat(e.target.value) || undefined })}
                  className="mt-1 block w-full rounded-md bg-white border-2 border-indigo-400 text-black text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="activity_level" className="block text-sm font-medium text-gray-700">
                  Niveau d'activité
                </label>
                <select
                  id="activity_level"
                  value={profile.activity_level || ''}
                  onChange={(e) => setProfile({ ...profile, activity_level: e.target.value as any })}
                  className="mt-1 block w-full rounded-md bg-white border-2 border-indigo-400 text-black text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Sélectionner</option>
                  <option value="sedentary">Sédentaire (peu ou pas d'exercice)</option>
                  <option value="light">Légèrement actif (exercice léger 1-3 jours/semaine)</option>
                  <option value="moderate">Modérément actif (exercice modéré 3-5 jours/semaine)</option>
                  <option value="active">Très actif (exercice intense 6-7 jours/semaine)</option>
                  <option value="very_active">Extrêmement actif (exercice très intense, travail physique)</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Régime alimentaire */}
        {activeTab === 'diet' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Préférences alimentaires</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {dietaryOptions.map((option) => (
                  <div key={option.id} className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id={`diet-${option.id}`}
                        type="checkbox"
                        checked={profile.dietary_preferences?.includes(option.id) || false}
                        onChange={() => handleToggleOption('dietary_preferences', option.id)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={`diet-${option.id}`} className="font-medium text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Répartition des macronutriments</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Protéines</span>
                    <span className="text-sm font-medium text-gray-700">{profile.macros_target?.protein || 0}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={profile.macros_target?.protein || 0}
                    onChange={(e) => handleMacroChange('protein', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Glucides</span>
                    <span className="text-sm font-medium text-gray-700">{profile.macros_target?.carbs || 0}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={profile.macros_target?.carbs || 0}
                    onChange={(e) => handleMacroChange('carbs', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Lipides</span>
                    <span className="text-sm font-medium text-gray-700">{profile.macros_target?.fat || 0}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={profile.macros_target?.fat || 0}
                    onChange={(e) => handleMacroChange('fat', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Visualisation des macros */}
              <div className="mt-4 flex h-4 overflow-hidden rounded-full bg-gray-200">
                <div 
                  className="bg-blue-500" 
                  style={{ width: `${profile.macros_target?.protein || 0}%` }}
                  title={`Protéines: ${profile.macros_target?.protein || 0}%`}
                />
                <div 
                  className="bg-green-500" 
                  style={{ width: `${profile.macros_target?.carbs || 0}%` }}
                  title={`Glucides: ${profile.macros_target?.carbs || 0}%`}
                />
                <div 
                  className="bg-yellow-500" 
                  style={{ width: `${profile.macros_target?.fat || 0}%` }}
                  title={`Lipides: ${profile.macros_target?.fat || 0}%`}
                />
              </div>
              <div className="mt-2 flex text-xs justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                  <span>Protéines</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span>Glucides</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                  <span>Lipides</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Santé */}
        {activeTab === 'health' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Allergies et intolérances</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {allergyOptions.map((option) => (
                  <div key={option.id} className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id={`allergy-${option.id}`}
                        type="checkbox"
                        checked={profile.allergies?.includes(option.id) || false}
                        onChange={() => handleToggleOption('allergies', option.id)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={`allergy-${option.id}`} className="font-medium text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Conditions de santé</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {healthConditionOptions.map((option) => (
                  <div key={option.id} className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id={`health-${option.id}`}
                        type="checkbox"
                        checked={profile.health_conditions?.includes(option.id) || false}
                        onChange={() => handleToggleOption('health_conditions', option.id)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={`health-${option.id}`} className="font-medium text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <HeartIcon className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Rappel important</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Les recommandations nutritionnelles de l'application sont générales et ne remplacent pas les conseils d'un professionnel de santé. 
                      Si vous avez des conditions médicales spécifiques, consultez votre médecin avant de modifier votre alimentation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Objectifs */}
        {activeTab === 'goals' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Objectif de poids</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'lose', label: 'Perdre du poids', icon: ArrowTrendingDownIcon },
                  { id: 'maintain', label: 'Maintenir mon poids', icon: MinusSmallIcon },
                  { id: 'gain', label: 'Prendre du poids', icon: ArrowTrendingUpIcon }
                ].map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setProfile({ ...profile, weight_goal: option.id as any })}
                    className={`${
                      profile.weight_goal === option.id
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    } cursor-pointer rounded-lg border p-4 text-center`}
                  >
                    <option.icon className="mx-auto h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {profile.weight_goal !== 'maintain' && (
              <div>
                <label htmlFor="target_weight" className="block text-sm font-medium text-gray-700">
                  Poids cible (kg)
                </label>
                <input
                  type="number"
                  id="target_weight"
                  min="30"
                  max="300"
                  step="0.1"
                  value={profile.target_weight || ''}
                  onChange={(e) => setProfile({ ...profile, target_weight: parseFloat(e.target.value) || undefined })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="daily_calorie_target" className="block text-sm font-medium text-gray-700">
                  Objectif calorique quotidien
                </label>
                <span className="text-xs text-gray-500">
                  {profile.daily_calorie_target ? `${profile.daily_calorie_target} kcal` : 'Calculé automatiquement'}
                </span>
              </div>
              <input
                type="number"
                id="daily_calorie_target"
                min="1000"
                max="5000"
                value={profile.daily_calorie_target || ''}
                onChange={(e) => setProfile({ ...profile, daily_calorie_target: parseInt(e.target.value) || undefined })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Calculé automatiquement"
              />
              <p className="mt-1 text-xs text-gray-500">
                Laissez vide pour un calcul automatique basé sur vos informations
              </p>
            </div>

            {/* Visualisation des objectifs */}
            {profile.weight && profile.target_weight && profile.weight_goal !== 'maintain' && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Progression vers l'objectif</h3>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium">{profile.weight} kg</div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${profile.weight_goal === 'lose' ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ 
                        width: `${Math.min(100, Math.abs(
                          profile.weight_goal === 'lose' 
                            ? 100 - ((profile.weight - profile.target_weight) / (profile.weight - profile.target_weight) * 100)
                            : ((profile.target_weight - profile.weight) / (profile.target_weight - profile.weight) * 100)
                        ))}%` 
                      }}
                    />
                  </div>
                  <div className="text-sm font-medium">{profile.target_weight} kg</div>
                </div>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  {profile.weight_goal === 'lose' 
                    ? `Objectif: perdre ${(profile.weight - profile.target_weight).toFixed(1)} kg`
                    : `Objectif: prendre ${(profile.target_weight - profile.weight).toFixed(1)} kg`}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Bouton de sauvegarde */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={saveProfile}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSaving ? 'Enregistrement...' : 'Enregistrer le profil'}
          </button>
        </div>
      </div>
    </div>
  );
}