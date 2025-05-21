
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Droplet, Calendar, Bell, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PlantReminder {
  id: number;
  name: string;
  daysUntilNextWatering: number;
  wateringFrequency: number; // En jours
  lastWatered: string;
  notificationsEnabled: boolean;
}

const WateringReminders: React.FC = () => {
  const { toast } = useToast();
  
  const [plantReminders, setPlantReminders] = useState<PlantReminder[]>([
    { 
      id: 1, 
      name: "Basilic", 
      daysUntilNextWatering: 1, 
      wateringFrequency: 2, 
      lastWatered: "2025-05-20", 
      notificationsEnabled: true 
    },
    { 
      id: 2, 
      name: "Menthe", 
      daysUntilNextWatering: 0, 
      wateringFrequency: 3, 
      lastWatered: "2025-05-18", 
      notificationsEnabled: true 
    },
    { 
      id: 3, 
      name: "Persil", 
      daysUntilNextWatering: 2, 
      wateringFrequency: 4, 
      lastWatered: "2025-05-19", 
      notificationsEnabled: false 
    },
    { 
      id: 4, 
      name: "Thym", 
      daysUntilNextWatering: 3, 
      wateringFrequency: 5, 
      lastWatered: "2025-05-18", 
      notificationsEnabled: true 
    }
  ]);

  const markAsWatered = (id: number) => {
    const today = new Date().toISOString().split('T')[0];
    setPlantReminders(reminders => 
      reminders.map(reminder => 
        reminder.id === id 
          ? { 
              ...reminder, 
              lastWatered: today,
              daysUntilNextWatering: reminder.wateringFrequency
            }
          : reminder
      )
    );

    const plant = plantReminders.find(p => p.id === id);
    if (plant) {
      toast({
        title: "Plante arrosée !",
        description: `Vous avez arrosé votre ${plant.name}. Prochaine arrosage dans ${plant.wateringFrequency} jours.`,
        duration: 3000,
      });
    }
  };

  const toggleNotifications = (id: number) => {
    setPlantReminders(reminders => 
      reminders.map(reminder => 
        reminder.id === id 
          ? { ...reminder, notificationsEnabled: !reminder.notificationsEnabled }
          : reminder
      )
    );

    const plant = plantReminders.find(p => p.id === id);
    if (plant) {
      toast({
        title: `Notifications ${!plant.notificationsEnabled ? "activées" : "désactivées"}`,
        description: `Les rappels d'arrosage pour ${plant.name} sont maintenant ${!plant.notificationsEnabled ? "activés" : "désactivés"}.`,
        duration: 3000,
      });
    }
  };

  const scheduleCustomReminder = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "La programmation de rappels personnalisés sera bientôt disponible.",
      duration: 3000,
    });
  };

  return (
    <Card className="border-wp-green-light dark:border-wp-green-dark">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-wp-green-dark dark:text-wp-green flex items-center">
              <Droplet className="w-5 h-5 mr-2" /> Rappels d'arrosage
            </CardTitle>
            <CardDescription>Ne manquez jamais un arrosage</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark"
            onClick={scheduleCustomReminder}
          >
            <Calendar className="w-4 h-4 mr-1" /> Programmer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {plantReminders.map(plant => (
            <div 
              key={plant.id} 
              className={`p-3 border rounded-md flex items-center justify-between ${
                plant.daysUntilNextWatering === 0 
                  ? "border-wp-orange bg-wp-orange/5" 
                  : "border-wp-gray hover:border-wp-green-light"
              }`}
            >
              <div className="flex-grow">
                <div className="flex items-center">
                  <Leaf className={`w-4 h-4 mr-2 ${
                    plant.daysUntilNextWatering === 0 
                      ? "text-wp-orange" 
                      : "text-wp-green"
                  }`} />
                  <h3 className="font-medium">{plant.name}</h3>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {plant.daysUntilNextWatering === 0 ? (
                    <span className="text-wp-orange font-medium">À arroser aujourd'hui</span>
                  ) : (
                    <span>Prochain arrosage dans {plant.daysUntilNextWatering} jour{plant.daysUntilNextWatering > 1 ? "s" : ""}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 mr-2">
                  <Switch
                    id={`notifications-${plant.id}`}
                    checked={plant.notificationsEnabled}
                    onCheckedChange={() => toggleNotifications(plant.id)}
                    className="data-[state=checked]:bg-wp-green"
                  />
                  <Label htmlFor={`notifications-${plant.id}`} className="sr-only">
                    Notifications
                  </Label>
                  <Bell className="w-4 h-4 text-muted-foreground" />
                </div>
                <Button
                  size="sm"
                  variant={plant.daysUntilNextWatering === 0 ? "default" : "outline"}
                  className={plant.daysUntilNextWatering === 0 ? "bg-wp-green hover:bg-wp-green-dark" : "border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark"}
                  onClick={() => markAsWatered(plant.id)}
                >
                  <Check className="w-4 h-4 mr-1" /> Arrosé
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 border border-dashed border-wp-gray rounded-md">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground flex items-center">
              <Bell className="w-4 h-4 mr-2 text-wp-green" />
              Les notifications vous seront envoyées le jour de l'arrosage
            </div>
            <Button
              variant="link"
              size="sm"
              className="text-wp-green dark:text-wp-green p-0"
              onClick={scheduleCustomReminder}
            >
              Configurer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WateringReminders;
