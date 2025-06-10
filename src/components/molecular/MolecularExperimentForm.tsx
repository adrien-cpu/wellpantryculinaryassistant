import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { FlaskConical, Plus, X } from "lucide-react";

interface MolecularExperimentFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (experiment: any) => void;
}

const MolecularExperimentForm: React.FC<MolecularExperimentFormProps> = ({
  open,
  onClose,
  onSave
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technique, setTechnique] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [ingredients, setIngredients] = useState<{name: string; quantity: string}[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddIngredient = () => {
    if (currentIngredient.trim() && currentQuantity.trim()) {
      setIngredients([...ingredients, { name: currentIngredient, quantity: currentQuantity }]);
      setCurrentIngredient("");
      setCurrentQuantity("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddStep = () => {
    if (currentStep.trim()) {
      setSteps([...steps, currentStep]);
      setCurrentStep("");
    }
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title || !description || !technique || !difficulty) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    if (ingredients.length === 0) {
      toast({
        title: "Ingrédients manquants",
        description: "Veuillez ajouter au moins un ingrédient",
        variant: "destructive",
      });
      return;
    }

    if (steps.length === 0) {
      toast({
        title: "Étapes manquantes",
        description: "Veuillez ajouter au moins une étape",
        variant: "destructive",
      });
      return;
    }

    const newExperiment = {
      id: Date.now(),
      title,
      description,
      technique,
      difficulty,
      ingredients,
      steps,
      notes,
      image: "https://images.unsplash.com/photo-1621955964441-c173e01c6f3a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9sZWN1bGFyJTIwZ2FzdHJvbm9teXxlbnwwfHwwfHx8MA%3D%3D"
    };

    onSave(newExperiment);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTechnique("");
    setDifficulty("");
    setIngredients([]);
    setCurrentIngredient("");
    setCurrentQuantity("");
    setSteps([]);
    setCurrentStep("");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-wp-green" />
            Créer une nouvelle expérience moléculaire
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titre de l'expérience *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Caviar de mangue"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez brièvement votre expérience"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="technique">Technique *</Label>
                <Select value={technique} onValueChange={setTechnique}>
                  <SelectTrigger id="technique">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sphérification">Sphérification</SelectItem>
                    <SelectItem value="Émulsification">Émulsification</SelectItem>
                    <SelectItem value="Gélification">Gélification</SelectItem>
                    <SelectItem value="Azote liquide">Azote liquide</SelectItem>
                    <SelectItem value="Sous vide">Sous vide</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty">Difficulté *</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Facile">Facile</SelectItem>
                    <SelectItem value="Moyen">Moyen</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes additionnelles</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Conseils, astuces, variations possibles..."
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Ingrédients *</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  placeholder="Nom de l'ingrédient"
                  className="flex-grow"
                />
                <Input
                  value={currentQuantity}
                  onChange={(e) => setCurrentQuantity(e.target.value)}
                  placeholder="Quantité"
                  className="w-1/3"
                />
                <Button type="button" size="icon" onClick={handleAddIngredient}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="max-h-32 overflow-y-auto border rounded-md p-2">
                {ingredients.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-2">Aucun ingrédient ajouté</p>
                ) : (
                  <ul className="space-y-1">
                    {ingredients.map((ingredient, index) => (
                      <li key={index} className="flex justify-between items-center text-sm">
                        <span>{ingredient.name} - {ingredient.quantity}</span>
                        <Button 
                          type="button" 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6" 
                          onClick={() => handleRemoveIngredient(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <Label>Étapes *</Label>
              <div className="flex gap-2 mb-2">
                <Textarea
                  value={currentStep}
                  onChange={(e) => setCurrentStep(e.target.value)}
                  placeholder="Décrivez une étape"
                  className="flex-grow"
                />
                <Button type="button" size="icon" onClick={handleAddStep} className="h-10">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="max-h-48 overflow-y-auto border rounded-md p-2">
                {steps.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-2">Aucune étape ajoutée</p>
                ) : (
                  <ol className="space-y-2 list-decimal list-inside">
                    {steps.map((step, index) => (
                      <li key={index} className="flex justify-between items-start text-sm group">
                        <span className="flex-grow">{step}</span>
                        <Button 
                          type="button" 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" 
                          onClick={() => handleRemoveStep(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit} className="bg-wp-green hover:bg-wp-green-dark">
            Enregistrer l'expérience
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MolecularExperimentForm;