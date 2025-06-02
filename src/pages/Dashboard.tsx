import { useEffect, useState } from "react";
import { Calendar, BookOpen, ShoppingBasket, Leaf, BarChart2, DollarSign, Scale, Sparkles, BarChart3 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Layout from "@/components/layout/Layout";

export default function Dashboard() {
  const [recipesCount, setRecipesCount] = useState(0);

  useEffect(() => {
    async function fetchRecipes() {
      const { count } = await supabase
        .from("recipes")
        .select("*", { count: "exact", head: true });
      setRecipesCount(count || 0);
    }
    fetchRecipes();
  }, []);

  return (
    <Layout>
        <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-wp-green-dark mb-2">Tableau de bord</h1>
      <p className="text-white mb-8">
        Retrouvez ici un aperçu de votre activité, vos statistiques et vos accès rapides.
      </p>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <Calendar className="w-8 h-8 text-wp-green mb-2" />
          <div className="text-2xl font-bold text-wp-green-dark">7</div>
          <div className="text-gray-500 text-sm">Repas planifiés</div>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <BookOpen className="w-8 h-8 text-wp-green mb-2" />
          <div className="text-2xl font-bold text-wp-green-dark">{recipesCount}</div>
          <div className="text-gray-500 text-sm">Recettes favorites</div>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <ShoppingBasket className="w-8 h-8 text-wp-green mb-2" />
          <div className="text-2xl font-bold text-wp-green-dark">12</div>
          <div className="text-gray-500 text-sm">Produits à consommer</div>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <Leaf className="w-8 h-8 text-wp-green mb-2" />
          <div className="text-2xl font-bold text-wp-green-dark">5</div>
          <div className="text-gray-500 text-sm">Plantes suivies</div>
        </div>
      </div>

      {/* Section graphique/statistiques */}
      <div className="bg-white rounded shadow p-6 mb-10">
        <div className="flex items-center mb-4">
          <BarChart2 className="w-6 h-6 text-wp-green mr-2" />
          <h2 className="text-xl font-semibold text-wp-green-dark">Statistiques de consommation</h2>
        </div>
        <div className="h-48 flex items-center justify-center text-gray-400">
          {/* Ici tu peux intégrer un vrai graphique plus tard */}
          <span>Graphique à venir…</span>
        </div>
      </div>

      {/* Accès rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/recipes" className="bg-wp-green hover:bg-wp-green-light text-black rounded p-6 flex flex-col items-center transition">
          <BookOpen className="w-7 h-7 mb-2" />
          <span className="font-semibold">Voir mes recettes</span>
        </a>
        <a href="/meal-planning" className="bg-wp-green hover:bg-wp-green-light text-black rounded p-6 flex flex-col items-center transition">
          <Calendar className="w-7 h-7 mb-2" />
          <span className="font-semibold">Planifier mes repas</span>
        </a>
        <a href="/pantry" className="bg-wp-green hover:bg-wp-green-light text-black rounded p-6 flex flex-col items-center transition">
          <ShoppingBasket className="w-7 h-7 mb-2" />
          <span className="font-semibold">Gérer mon garde-manger</span>
        </a>
      </div>

      {/* Votre impact sur la réduction du gaspillage alimentaire */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold text-center mb-8">
          Votre impact sur la réduction du gaspillage alimentaire
        </h2>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Économies réalisées */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Économies réalisées</span>
              <span className="rounded-full bg-green-50 p-2">
                <DollarSign className="w-6 h-6 text-green-500" />
              </span>
            </div>
            <div className="text-3xl font-bold text-green-600">243€</div>
            <div className="flex items-center gap-2 text-green-500 text-sm">
              <span>↑ +12%</span>
              <span className="text-gray-400">vs mois dernier</span>
            </div>
          </div>
          {/* Aliments sauvés */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Aliments sauvés</span>
              <span className="rounded-full bg-blue-50 p-2">
                <Scale className="w-6 h-6 text-blue-500" />
              </span>
            </div>
            <div className="text-3xl font-bold text-blue-600">18.5 kg</div>
            <div className="flex items-center gap-2 text-blue-500 text-sm">
              <span>↑ +8%</span>
              <span className="text-gray-400">vs mois dernier</span>
            </div>
          </div>
          {/* Impact CO2 */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Impact CO2</span>
              <span className="rounded-full bg-purple-50 p-2">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </span>
            </div>
            <div className="text-3xl font-bold text-purple-600">-42 kg</div>
            <div className="flex items-center gap-2 text-purple-500 text-sm">
              <span>↓ -15%</span>
              <span className="text-gray-400">d'émissions</span>
            </div>
          </div>
        </div>

        {/* Catégories d'aliments sauvés */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <BarChart3 className="w-8 h-8 text-green-400 mb-2" />
            <div className="font-semibold">Fruits & Légumes</div>
            <div className="text-gray-500 text-sm">8.2 kg sauvés</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <BarChart3 className="w-8 h-8 text-red-300 mb-2" />
            <div className="font-semibold">Produits laitiers</div>
            <div className="text-gray-500 text-sm">4.5 kg sauvés</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <BarChart3 className="w-8 h-8 text-yellow-400 mb-2" />
            <div className="font-semibold">Céréales</div>
            <div className="text-gray-500 text-sm">3.8 kg sauvés</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <BarChart3 className="w-8 h-8 text-blue-300 mb-2" />
            <div className="font-semibold">Viandes</div>
            <div className="text-gray-500 text-sm">2.0 kg sauvés</div>
          </div>
        </div>

        {/* Objectifs */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Vos objectifs</h3>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span>Réduire le gaspillage de 30%</span>
              <span className="font-semibold text-gray-500">75%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div className="h-3 bg-green-500 rounded-full" style={{ width: "75%" }} />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span>Économiser 300€</span>
              <span className="font-semibold text-gray-500">81%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div className="h-3 bg-blue-500 rounded-full" style={{ width: "81%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Réduire l'empreinte carbone de 50kg</span>
              <span className="font-semibold text-gray-500">84%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div className="h-3 bg-purple-500 rounded-full" style={{ width: "84%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    </Layout>
  );
}