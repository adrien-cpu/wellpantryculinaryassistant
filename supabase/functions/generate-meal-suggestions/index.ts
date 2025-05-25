
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      nutritionGoals, 
      dietaryPreferences, 
      useMolecularGastronomy = false,
      weekdays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
    } = await req.json();

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let molecularData = "";
    if (useMolecularGastronomy) {
      // Récupérer quelques techniques et composés moléculaires
      const { data: techniques } = await supabase
        .from('molecular_techniques')
        .select('name, description, applications')
        .limit(5);

      const { data: compounds } = await supabase
        .from('molecular_compounds')
        .select('name, flavor_profile, foods')
        .limit(10);

      if (techniques && compounds) {
        molecularData = `
        TECHNIQUES MOLÉCULAIRES DISPONIBLES:
        ${techniques.map(t => `- ${t.name}: ${t.description}`).join('\n')}
        
        COMPOSÉS MOLÉCULAIRES:
        ${compounds.map(c => `- ${c.name}: saveurs ${c.flavor_profile?.join(', ')} présent dans ${c.foods?.slice(0, 3).join(', ')}`).join('\n')}
        `;
      }
    }

    const systemPrompt = `Tu es un chef expert en nutrition et${useMolecularGastronomy ? ' en cuisine moléculaire' : ''}. 
    
    Objectifs nutritionnels:
    - Calories quotidiennes: ${nutritionGoals.dailyCalories}
    - Protéines: ${nutritionGoals.proteinPercentage}%
    - Glucides: ${nutritionGoals.carbsPercentage}%
    - Lipides: ${nutritionGoals.fatPercentage}%
    
    Préférences alimentaires: ${dietaryPreferences?.join(', ') || 'Aucune restriction'}
    
    ${molecularData}
    
    Crée un menu équilibré pour une semaine avec:
    - Des recettes créatives${useMolecularGastronomy ? ' intégrant des techniques de cuisine moléculaire quand approprié' : ''}
    - Respect strict des objectifs nutritionnels
    - Variété des saveurs et textures
    - Utilisation d'ingrédients de saison
    
    Réponds UNIQUEMENT en JSON valide avec cette structure exacte:
    {
      "meals": {
        "Lundi": {
          "breakfast": { "name": "nom", "description": "description détaillée", "nutrition": {"calories": 350, "protein": 15, "carbs": 45, "fat": 12, "fiber": 6} },
          "lunch": { "name": "nom", "description": "description détaillée", "nutrition": {"calories": 450, "protein": 25, "carbs": 55, "fat": 15, "fiber": 8} },
          "dinner": { "name": "nom", "description": "description détaillée", "nutrition": {"calories": 520, "protein": 30, "carbs": 60, "fat": 18, "fiber": 5} }
        }
        // ... pour chaque jour
      },
      "molecularTechniques": ["technique1", "technique2"] // seulement si cuisine moléculaire activée
    }`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Génère un menu pour les jours: ${weekdays.join(', ')}` }
        ],
        temperature: 0.8,
        max_tokens: 4000,
      }),
    });

    const data = await response.json();
    let generatedContent = data.choices[0].message.content;

    // Nettoyer la réponse pour extraire le JSON
    const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      generatedContent = jsonMatch[0];
    }

    const parsedContent = JSON.parse(generatedContent);

    return new Response(JSON.stringify(parsedContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-meal-suggestions function:', error);
    return new Response(JSON.stringify({ 
      error: 'Erreur lors de la génération des suggestions',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
