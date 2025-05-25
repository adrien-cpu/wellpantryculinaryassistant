
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Edit3, Save, X } from 'lucide-react';

interface MealEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  meal: {
    name: string;
    description?: string;
  } | null;
  onSave: (updatedMeal: { name: string; description: string }) => void;
}

const MealEditDialog: React.FC<MealEditDialogProps> = ({ 
  isOpen, 
  onClose, 
  meal, 
  onSave 
}) => {
  const [name, setName] = useState(meal?.name || '');
  const [description, setDescription] = useState(meal?.description || '');
  const { toast } = useToast();

  React.useEffect(() => {
    if (meal) {
      setName(meal.name);
      setDescription(meal.description || '');
    }
  }, [meal]);

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom du repas est requis",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    onSave({ name: name.trim(), description: description.trim() });
    toast({
      title: "Repas modifié",
      description: "Les modifications ont été sauvegardées",
      duration: 2000,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5 text-wp-green" />
            Modifier le repas
          </DialogTitle>
          <DialogDescription>
            Personnalisez votre repas selon vos préférences
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meal-name">Nom du repas</Label>
            <Input
              id="meal-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom du repas..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meal-description">Description</Label>
            <Textarea
              id="meal-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description du repas, ingrédients, préparation..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              <X className="mr-2 h-4 w-4" />
              Annuler
            </Button>
            <Button 
              onClick={handleSave}
              className="flex-1 bg-wp-green hover:bg-wp-green-dark"
            >
              <Save className="mr-2 h-4 w-4" />
              Sauvegarder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MealEditDialog;
