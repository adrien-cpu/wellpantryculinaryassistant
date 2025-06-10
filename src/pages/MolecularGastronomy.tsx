import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ChemicalCompatibilityChart from "@/components/ChemicalCompatibilityChart";
import { BeakerIcon, BookOpen, FlaskConical, Lightbulb, Search, Sparkles } from "lucide-react";
import MolecularTechniqueCard from "@/components/molecular/MolecularTechniqueCard";
import MolecularCompoundCard from "@/components/molecular/MolecularCompoundCard";
import MolecularExperimentCard from "@/components/molecular/MolecularExperimentCard";
import MolecularTechniqueDetails from "@/components/molecular/MolecularTechniqueDetails";
import MolecularExperimentDetails from "@/components/molecular/MolecularExperimentDetails";
import MolecularExperimentForm from "@/components/molecular/MolecularExperimentForm";

const MolecularGastronomyPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState<string | undefined>();
  const [selectedTechnique, setSelectedTechnique] = useState<any>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<any>(null);
  const [showExperimentForm, setShowExperimentForm] = useState(false);

  const showComingSoon = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Cette fonctionnalité sera disponible prochainement.",
      duration: 3000,
    });
  };

  const techniques = [
    {
      id: 1,
      name: "Sphérification",
      description: "Technique qui transforme des liquides en sphères qui éclatent en bouche",
      difficulty: "Moyen",
      equipment: ["Alginate de sodium", "Chlorure de calcium", "Seringue", "Cuillère à égoutter"],
      image: "https://images.unsplash.com/photo-1621955964441-c173e01c6f3a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9sZWN1bGFyJTIwZ2FzdHJvbm9teXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 2,
      name: "Émulsification",
      description: "Création de mousses légères et aérées à partir d'ingrédients liquides",
      difficulty: "Facile",
      equipment: ["Siphon à chantilly", "Cartouches de N2O", "Lécithine de soja"],
      image: "https://images.unsplash.com/photo-1607877361964-d8cbec867f19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9hbSUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 3,
      name: "Gélification",
      description: "Transformation de liquides en gels avec différentes textures",
      difficulty: "Moyen",
      equipment: ["Agar-agar", "Balance de précision", "Thermomètre"],
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2VsJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 4,
      name: "Azote liquide",
      description: "Congélation instantanée pour créer des textures uniques",
      difficulty: "Expert",
      equipment: ["Azote liquide", "Conteneur cryogénique", "Gants isolants", "Lunettes de protection"],
      image: "https://images.unsplash.com/photo-1505253668822-42074d58a7c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGlxdWlkJTIwbml0cm9nZW4lMjBjb29raW5nfGVufDB8fDB8fHww"
    }
  ];

  const compounds = [
    {
      id: 1,
      name: "Vanilline",
      formula: "C8H8O3",
      category: "Aldéhyde aromatique",
      foods: ["Vanille", "Chocolat", "Pâtisseries"],
      flavorProfile: ["Sucré", "Boisé", "Crémeux"]
    },
    {
      id: 2,
      name: "Limonène",
      formula: "C10H16",
      category: "Terpène",
      foods: ["Agrumes", "Herbes aromatiques", "Épices"],
      flavorProfile: ["Agrume", "Frais", "Vif"]
    },
    {
      id: 3,
      name: "Acide glutamique",
      formula: "C5H9NO4",
      category: "Acide aminé",
      foods: ["Tomates", "Fromages affinés", "Champignons"],
      flavorProfile: ["Umami", "Savoureux", "Complexe"]
    }
  ];

  const experiments = [
    {
      id: 1,
      title: "Caviar de fruits",
      description: "Créez des perles de jus de fruits qui éclatent en bouche",
      technique: "Sphérification",
      difficulty: "Moyen",
      image: "https://images.unsplash.com/photo-1621955964441-c173e01c6f3a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9sZWN1bGFyJTIwZ2FzdHJvbm9teXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 2,
      title: "Espuma de fromage",
      description: "Une mousse légère et aérienne au fromage",
      technique: "Émulsification",
      difficulty: "Facile",
      image: "https://images.unsplash.com/photo-1607877361964-d8cbec867f19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9hbSUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 3,
      title: "Spaghetti de fruits",
      description: "Des spaghettis comestibles à base de purée de fruits",
      technique: "Gélification",
      difficulty: "Moyen",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2VsJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
    }
  ];

  const articles = [
    {
      id: 1,
      title: "Les principes de la cuisine moléculaire",
      excerpt: "Découvrez les fondements scientifiques qui révolutionnent la gastronomie moderne",
      category: "Fondamentaux",
      readTime: "8 min"
    },
    {
      id: 2,
      title: "Comprendre les émulsions en cuisine",
      excerpt: "Comment la science des émulsions peut transformer vos sauces et vinaigrettes",
      category: "Techniques",
      readTime: "6 min"
    },
    {
      id: 3,
      title: "L'art de la sphérification",
      excerpt: "Maîtrisez cette technique emblématique de la cuisine moléculaire",
      category: "Techniques avancées",
      readTime: "10 min"
    }
  ];

  const handleShowTechniqueDetails = (id: number) => {
    const technique = techniques.find(t => t.id === id);
    setSelectedTechnique(technique || null);
  };

  const handleShowExperimentDetails = (id: number) => {
    const experiment = experiments.find(e => e.id === id);
    setSelectedExperiment(experiment || null);
  };

  const handleSaveExperiment = (experiment: any) => {
    toast({
      title: "Expérience enregistrée",
      description: "Votre expérience a été ajoutée avec succès",
      duration: 3000,
    });
    // Ici, vous ajouteriez normalement l'expérience à votre état ou base de données
  };

  return (
    <Layout>
      <section className="py-12 bg-wp-gray-light dark:bg-wp-gray-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-wp-green-dark dark:text-wp-green mb-2">Laboratoire de Gastronomie Moléculaire</h1>
              <p className="text-wp-gray-dark dark:text-wp-gray-light">
                Explorez la science derrière les saveurs et transformez votre cuisine avec des techniques innovantes
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              <Button onClick={() => setShowExperimentForm(true)} className="bg-wp-green hover:bg-wp-green-dark">
                <FlaskConical className="mr-2 h-4 w-4" />
                Créer une expérience
              </Button>
            </div>
          </div>

          <Tabs defaultValue="techniques" className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="techniques" className="flex items-center gap-2">
                <BeakerIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Techniques</span>
              </TabsTrigger>
              <TabsTrigger value="compounds" className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                <span className="hidden sm:inline">Composés</span>
              </TabsTrigger>
              <TabsTrigger value="experiments" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Expériences</span>
              </TabsTrigger>
              <TabsTrigger value="compatibility" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Compatibilités</span>
              </TabsTrigger>
              <TabsTrigger value="learn" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Apprendre</span>
              </TabsTrigger>
            </TabsList>

            {/* Techniques */}
            <TabsContent value="techniques">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {techniques.map((technique) => (
                  <MolecularTechniqueCard 
                    key={technique.id} 
                    technique={technique} 
                    onShowDetails={handleShowTechniqueDetails}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Composés */}
            <TabsContent value="compounds">
              <div className="mb-6">
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-wp-gray-dark h-4 w-4" />
                  <Input
                    placeholder="Rechercher un composé..."
                    className="pl-10 border-wp-green focus:border-wp-green-dark"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {compounds
                  .filter(compound => 
                    searchTerm === "" || 
                    compound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    compound.foods.some(food => food.toLowerCase().includes(searchTerm.toLowerCase()))
                  )
                  .map((compound) => (
                    <MolecularCompoundCard 
                      key={compound.id} 
                      compound={compound} 
                      onSelectIngredient={setSelectedIngredient}
                    />
                  ))}
              </div>
            </TabsContent>

            {/* Expériences */}
            <TabsContent value="experiments">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {experiments.map((experiment) => (
                  <MolecularExperimentCard 
                    key={experiment.id} 
                    experiment={experiment} 
                    onShowRecipe={handleShowExperimentDetails}
                  />
                ))}
                <Card className="border-dashed border-2 border-wp-green-light bg-white/50 dark:bg-wp-gray-dark/50 flex flex-col items-center justify-center p-6">
                  <FlaskConical className="h-12 w-12 text-wp-green-light mb-4" />
                  <h3 className="text-lg font-medium text-wp-green-dark dark:text-wp-green mb-2">Créez votre expérience</h3>
                  <p className="text-center text-wp-gray-dark dark:text-wp-gray-light mb-4">
                    Partagez vos découvertes culinaires avec la communauté
                  </p>
                  <Button onClick={() => setShowExperimentForm(true)} className="bg-wp-green hover:bg-wp-green-dark">
                    Ajouter une expérience
                  </Button>
                </Card>
              </div>
            </TabsContent>

            {/* Compatibilités */}
            <TabsContent value="compatibility">
              <div className="mb-6">
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-wp-gray-dark h-4 w-4" />
                  <Input
                    placeholder="Rechercher un ingrédient..."
                    className="pl-10 border-wp-green focus:border-wp-green-dark"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <ChemicalCompatibilityChart selectedIngredient={selectedIngredient} />
            </TabsContent>

            {/* Apprendre */}
            <TabsContent value="learn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-bold text-wp-green-dark dark:text-wp-green mb-4">Articles et ressources</h2>
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <Card key={article.id} className="border-wp-green-light bg-white dark:bg-wp-gray-dark dark:border-wp-green-dark hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-wp-green-dark dark:text-wp-green">{article.title}</h3>
                              <p className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">{article.excerpt}</p>
                            </div>
                            <Badge variant="outline" className="ml-2 shrink-0">
                              {article.category}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xs text-wp-gray-dark dark:text-wp-gray-light">{article.readTime} de lecture</span>
                            <Button 
                              variant="ghost" 
                              onClick={showComingSoon}
                              className="text-wp-green hover:text-wp-green-dark"
                            >
                              Lire l'article
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={showComingSoon}
                    className="mt-4 border-wp-green text-wp-green hover:bg-wp-green-light w-full"
                  >
                    Voir tous les articles
                  </Button>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-wp-green-dark dark:text-wp-green mb-4">Vidéos tutorielles</h2>
                  <Card className="border-wp-green-light bg-white dark:bg-wp-gray-dark dark:border-wp-green-dark overflow-hidden">
                    <div className="aspect-video bg-wp-gray-dark flex items-center justify-center">
                      <div className="text-center p-8">
                        <FlaskConical className="h-12 w-12 text-wp-green mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">Tutoriels vidéo</h3>
                        <p className="text-wp-gray-light mb-4">
                          Des vidéos explicatives pour maîtriser les techniques de gastronomie moléculaire
                        </p>
                        <Button onClick={showComingSoon} className="bg-wp-green hover:bg-wp-green-dark">
                          Explorer les vidéos
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-wp-green-dark dark:text-wp-green mb-2">Vidéos populaires</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-wp-green"></div>
                          <span>Introduction à la sphérification</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-wp-green"></div>
                          <span>Créer des mousses parfaites</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-wp-green"></div>
                          <span>Les bases de la cuisine sous vide</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-wp-green-light bg-white dark:bg-wp-gray-dark dark:border-wp-green-dark mt-6">
                    <CardHeader>
                      <CardTitle className="text-wp-green-dark dark:text-wp-green">Glossaire scientifique</CardTitle>
                      <CardDescription>Comprendre les termes techniques de la gastronomie moléculaire</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-wp-green-dark dark:text-wp-green">Hydrocolloides</h4>
                          <p className="text-sm text-wp-gray-dark dark:text-wp-gray-light">Substances qui forment des gels ou épaississent les liquides en présence d'eau.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-wp-green-dark dark:text-wp-green">Émulsion</h4>
                          <p className="text-sm text-wp-gray-dark dark:text-wp-gray-light">Mélange de deux liquides normalement non miscibles, comme l'huile et l'eau.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-wp-green-dark dark:text-wp-green">Lyophilisation</h4>
                          <p className="text-sm text-wp-gray-dark dark:text-wp-gray-light">Procédé de déshydratation par congélation sous vide qui préserve la structure des aliments.</p>
                        </div>
                      </div>
                      <Button 
                        variant="link" 
                        onClick={showComingSoon}
                        className="mt-2 text-wp-green hover:text-wp-green-dark p-0"
                      >
                        Voir le glossaire complet
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Modals */}
      <MolecularTechniqueDetails 
        open={!!selectedTechnique} 
        onClose={() => setSelectedTechnique(null)} 
        technique={selectedTechnique}
      />

      <MolecularExperimentDetails 
        open={!!selectedExperiment} 
        onClose={() => setSelectedExperiment(null)} 
        experiment={selectedExperiment}
      />

      <MolecularExperimentForm 
        open={showExperimentForm} 
        onClose={() => setShowExperimentForm(false)} 
        onSave={handleSaveExperiment}
      />
    </Layout>
  );
};

export default MolecularGastronomyPage;