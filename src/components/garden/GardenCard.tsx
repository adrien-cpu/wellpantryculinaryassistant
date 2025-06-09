import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import AdviceModal from "./AdviceModal";
import type { Plant } from "./GardenData";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddPlantForm from "./AddPlantForm";

interface GardenCardProps {
  plant: Plant;
  onRemove: (id: number) => void;
  onToggleWatered?: (id: number) => void; // Pour le bouton arrosage
  onToggleNotifications?: (id: number, enabled: boolean) => void; // Pour le switch notifications
  onUpdatePlant?: (plant: Plant) => void; // Pour la mise à jour de la plante
}

const GardenCard: React.FC<GardenCardProps> = ({ plant, onRemove, onToggleWatered, onToggleNotifications, onUpdatePlant }) => {
  const { toast } = useToast();
  const [showAdvice, setShowAdvice] = useState(false);
  const [isWatered, setIsWatered] = useState(false);
  const [notifications, setNotifications] = useState(plant.notificationsEnabled ?? false);
  const [showPlanning, setShowPlanning] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const showComingSoon = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Cette fonctionnalité sera disponible prochainement.",
      duration: 3000,
    });
  };

  const handleWater = () => {
    setIsWatered(!isWatered);
    onToggleWatered && onToggleWatered(plant.id);
  };

  const handleNotifications = (checked: boolean) => {
    setNotifications(checked);
    onToggleNotifications && onToggleNotifications(plant.id, checked);
  };

  return (
    <Card className="card-hover overflow-hidden border-wp-green-light bg-white dark:bg-wp-gray-dark dark:border-wp-green-dark">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          className="rounded w-full h-40 object-cover"
        />
      </div>
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-wp-green-dark dark:text-wp-green">{plant.name}</CardTitle>
            <CardDescription>{plant.type}</CardDescription>
          </div>
          <Badge className={
            plant.wateringStatus > 60
              ? "bg-wp-green"
              : plant.wateringStatus > 30
              ? "bg-wp-orange"
              : "bg-destructive"
          }>
            {plant.wateringStatus > 60
              ? "Bien hydratée"
              : plant.wateringStatus > 30
              ? "À surveiller"
              : "À arroser urgement"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-wp-gray-dark dark:text-wp-gray-light">Niveau d'eau</span>
              <span className="text-wp-gray-dark dark:text-wp-gray-light">{plant.wateringStatus}%</span>
            </div>
            <Progress value={plant.wateringStatus} className="h-2" 
              indicatorClassName={
                plant.wateringStatus > 60
                  ? "bg-wp-green"
                  : plant.wateringStatus > 30
                  ? "bg-wp-orange"
                  : "bg-destructive"
              }
            />
          </div>
          
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-wp-gray-dark dark:text-wp-gray-light">Dernier arrosage</p>
              <p className="font-medium">{plant.lastWatered}</p>
            </div>
            <div className="text-right">
              <p className="text-wp-gray-dark dark:text-wp-gray-light">Prochain arrosage</p>
              <p className={`font-medium ${plant.wateringStatus <= 30 ? "text-destructive" : ""}`}>
                {plant.nextWatering}
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-wp-gray-dark dark:text-wp-gray-light text-sm">Stade de croissance</p>
            <p className="font-medium">{plant.growthStage}</p>
          </div>

          <div className="flex items-center">
            <Switch checked={notifications} onCheckedChange={handleNotifications} />
            <span className="ml-1 text-xs">Notifications d'entretiens</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          className="text-wp-green"
          onClick={() => setShowAdvice(true)}
        >
          💡 Conseils
        </Button>
        <Button
          variant={isWatered ? "default" : "outline"}
          size="sm"
          onClick={handleWater}
          className="border-wp-green text-wp-black hover:bg-wp-green/90"
          title={isWatered ? "Marquer comme non arrosé" : "Marquer comme arrosé"}
        >
          {isWatered ? "Arrosé" : "À arroser"}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="text-black border-destructive hover:bg-destructive/90"
          onClick={() => onRemove(plant.id)}
        >
          Retirer
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-wp-blue"
          onClick={() => setShowPlanning(true)}
        >
          📅 Planning
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowEditModal(true)}
        >
          Modifier
        </Button>
      </CardFooter>
      {showAdvice && (
        <AdviceModal
          tips={plant.tips}
          onClose={() => setShowAdvice(false)}
        />
      )}
      {showPlanning && (
        <Dialog open={showPlanning} onOpenChange={setShowPlanning}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Planning de {plant.name}</DialogTitle>
            </DialogHeader>
            <ul className="list-disc pl-5">
              {plant.planning?.map((t, idx) => (
                <li key={idx}>
                  {t.date} : {t.action} {t.done ? "✅" : ""}
                </li>
              ))}
            </ul>
            {/* Tu peux ajouter ici un formulaire pour ajouter une tâche */}
          </DialogContent>
        </Dialog>
      )}
      {showEditModal && (
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="w-auto max-w-fit p-6">
            <DialogHeader>
              <DialogTitle>Modifier la plante</DialogTitle>
            </DialogHeader>
            <AddPlantForm
              onAdd={updatedPlant => {
                onUpdatePlant(updatedPlant);
                setShowEditModal(false);
              }}
              onCancel={() => setShowEditModal(false)}
              initialPlant={plant}
            />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default GardenCard;
