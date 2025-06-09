import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNutritionData } from '@/hooks/useNutritionData';
import { Loader2, Sparkles, Beaker } from 'lucide-react';
import GenerationOptions from '@/components/meal-planning/GenerationOptions';

interface MealGenerationDialogProps {
  onMealsGenerated: (meals: any) => void;
}

const MealGenerationDialog: React.FC<MealGenerationDialogProps> = ({ onMealsGenerated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [useMolecularGastronomy, setUseMolecularGastronomy] = useState(false);
  const { toast } = useToast();
  const { userGoals } = useNutritionData();
  const [people, setPeople] = useState(2);
  const [periodType, setPeriodType] = useState<"jours" | "semaines" | "mois">("semaines");
  const [periodValue, setPeriodValue] = useState(1);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-meal-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nutritionGoals: userGoals,
          dietaryPreferences: ['équilibré', 'varié'],
          useMolecularGastronomy,
          people,
          periodType,
          periodValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération');
      }

      const data = await response.json();
      onMealsGenerated(data.meals);
      
      toast({
        title: "Menu généré avec succès !",
        description: useMolecularGastronomy 
          ? "Votre menu intègre des techniques de cuisine moléculaire"
          : "Votre menu équilibré est prêt",
        duration: 3000,
      });
      
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le menu. Veuillez réessayer.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-wp-green hover:bg-wp-green-dark">
          <Sparkles className="mr-2 h-4 w-4" />
          Générer vos menus
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-wp-green" />
            Génération automatique de menu
          </DialogTitle>
          <DialogDescription>
            Créez un menu personnalisé basé sur vos objectifs nutritionnels
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Vos objectifs nutritionnels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Calories quotidiennes:</span>
                <span className="font-medium">{userGoals.dailyCalories} cal</span>
              </div>
              <div className="flex justify-between">
                <span>Protéines:</span>
                <span className="font-medium">{userGoals.proteinPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span>Glucides:</span>
                <span className="font-medium">{userGoals.carbsPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span>Lipides:</span>
                <span className="font-medium">{userGoals.fatPercentage}%</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Beaker className="h-5 w-5 text-wp-purple" />
                <div>
                  <Label htmlFor="molecular-mode" className="text-sm font-medium">
                    Mode cuisine moléculaire
                  </Label>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Intégrer des techniques innovantes et créatives
                  </p>
                </div>
              </div>
              <Switch
                id="molecular-mode"
                checked={useMolecularGastronomy}
                onCheckedChange={setUseMolecularGastronomy}
              />
            </div>
          </div>

          <GenerationOptions
            people={people}
            setPeople={setPeople}
            periodType={periodType}
            setPeriodType={setPeriodType}
            periodValue={periodValue}
            setPeriodValue={setPeriodValue}
          />

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 bg-wp-green hover:bg-wp-green-dark"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Génération...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Générer
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MealGenerationDialog;
