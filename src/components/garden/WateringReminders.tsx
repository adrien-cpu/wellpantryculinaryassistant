import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Droplet, Calendar, Bell, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { Task } from "./GardenData";
import type { Plant } from "./GardenData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddPlantForm from "./AddPlantForm";
import { useNavigate } from "react-router-dom";


interface PlantReminder {
  id: number;
  name: string;
  daysUntilNextWatering: number;
  wateringFrequency: number; // En jours
  lastWatered: string;
  notificationsEnabled: boolean;
  advice: string[]; // Ajouté pour les conseils
}

interface WateringRemindersProps {
  plants: Plant[];
  onEditPlant: (plantName: string) => void;
}

const WateringReminders: React.FC<WateringRemindersProps> = ({ plants, onEditPlant }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [plantReminders, setPlantReminders] = useState<PlantReminder[]>([
    { 
      id: 1, 
      name: "Basilic", 
      daysUntilNextWatering: 1, 
      wateringFrequency: 2, 
      lastWatered: "2025-05-20", 
      notificationsEnabled: true,
      advice: ["Arrosez le matin pour éviter l'évaporation rapide de l'eau.", "Ajoutez un peu d'engrais une fois par mois."] // Exemple de conseils
    },
    { 
      id: 2, 
      name: "Menthe", 
      daysUntilNextWatering: 0, 
      wateringFrequency: 3, 
      lastWatered: "2025-05-18", 
      notificationsEnabled: true,
      advice: ["La menthe préfère un sol légèrement sec entre les arrosages.", "Pincez les feuilles pour encourager une croissance bushy."] 
    },
    { 
      id: 3, 
      name: "Persil", 
      daysUntilNextWatering: 2, 
      wateringFrequency: 4, 
      lastWatered: "2025-05-19", 
      notificationsEnabled: false,
      advice: ["Le persil peut être arrosé avec de l'eau de cuisson des légumes.", "Évitez de mouiller les feuilles pour prévenir les maladies fongiques."]
    },
    { 
      id: 4, 
      name: "Thym", 
      daysUntilNextWatering: 3, 
      wateringFrequency: 5, 
      lastWatered: "2025-05-18", 
      notificationsEnabled: true,
      advice: ["Le thym préfère un sol bien drainé et sec.", "Peut être arrosé avec de l'eau de pluie pour de meilleurs résultats."]
    }
  ]);

  const [showAdvice, setShowAdvice] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      plantName: "Basilic",
      date: "2025-06-10",
      action: "Arrosage",
      done: false,
      color: "#4ade80", // vert
    },
    {
      id: 2,
      plantName: "Menthe",
      date: "2025-06-11",
      action: "Fertilisation",
      done: false,
      color: "#fbbf24", // orange
    },
    // ...
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [newTaskPlant, setNewTaskPlant] = useState("");
  const [newTaskAction, setNewTaskAction] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newTaskColor, setNewTaskColor] = useState("#4ade80");
  const [showEditModal, setShowEditModal] = useState(false);
  const [plantToEdit, setPlantToEdit] = useState<Plant | null>(null);

  const actionsByPlant = {
    Basilic: ["Arrosage", "Fertilisation", "Récolte"],
    Menthe: ["Arrosage", "Taille", "Récolte"],
    // Ajoutez d'autres plantes et actions ici
  };

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

  const removePlant = (id: number) => {
    setPlantReminders(reminders => reminders.filter(plant => plant.id !== id));
    toast({
      title: "Plante retirée",
      description: "La plante a été supprimée du planning.",
      duration: 2000,
    });
  };

  const handleUpdatePlant = (updatedPlant: Plant) => {
    // Si tu veux aussi mettre à jour plantReminders, adapte ici
    setPlantReminders(reminders =>
      reminders.map(plant =>
        plant.id === updatedPlant.id
          ? { ...plant, ...updatedPlant }
          : plant
      )
    );
    toast({
      title: "Plante mise à jour",
      description: `${updatedPlant.name} a été mise à jour avec succès.`,
      duration: 2000,
    });
  };

  const handleEditPlant = (plantName: string) => {
    const plant = plants.find(p => p.name === plantName);
    if (plant) {
      setPlantToEdit(plant);
      setShowEditModal(true);
    }
  };

  return (
    <Card className="border-wp-green-light dark:border-wp-green-dark">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-wp-green-dark dark:text-wp-green flex items-center">
              <Droplet className="w-5 h-5 mr-2" /> Rappels d'entretien
            </CardTitle>
            <CardDescription>Ne manquez jamais une action importante</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-wp-green text-wp-green hover:bg-wp-green-light dark:border-wp-green dark:text-wp-green dark:hover:bg-wp-gray-dark"
            onClick={() => setShowCalendar(true)}
          >
            <Calendar className="w-4 h-4 mr-1" /> Programmer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        
        {/* <div className="space-y-4">
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
                <Button
                  size="sm"
                  variant="outline"
                  className="border-wp-blue text-wp-blue hover:bg-wp-blue-light"
                  onClick={() => setShowAdvice(plant.id)}
                >
                  Conseils
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="border-wp-red text-wp-red hover:bg-wp-red-light"
                  onClick={() => removePlant(plant.id)}
                >
                  Retirer
                </Button>
              </div>
              {showAdvice === plant.id && (
                <div className="mt-2 p-2 bg-wp-gray rounded-md">
                  <h4 className="font-medium text-wp-green">Conseils pour {plant.name}</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {plant.advice.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div> */}
        
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
              onClick={() => {
                // Utilise ton système de navigation, par exemple react-router
                navigate("/UserSettings#notifications");
                // Ou si tu utilises un autre système de navigation, adapte ici
                // navigate("/settings/watering-reminders");
              }}
            >
              Configurer
            </Button>
          </div>
        </div>

        {showCalendar && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg text-wp-gray dark:bg-wp-gray-dark">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Calendrier des tâches (14 jours)</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowCalendar(false)}>Fermer</Button>
              </div>
              <ul className="space-y-2">
                {tasks
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map(task => (
                    <li key={task.id} className="flex items-center gap-2 text-black dark:text-white">
                      <Droplet className="w-4 h-4" />
                      <span style={{ background: task.color }} className="w-3 h-3 rounded-full inline-block"></span>
                      <span className="font-semibold">{task.plantName}</span>
                      <span>{task.action}</span>
                      <span>{task.date}</span>
                      {task.done && <Check className="text-green-500 w-4 h-4" />}
                    </li>
                  ))}
              </ul>
              <form
                className="mb-4 flex flex-wrap gap-2 items-end"
                onSubmit={e => {
                  e.preventDefault();
                  if (!newTaskPlant || !newTaskAction || !newTaskDate) return;
                  setTasks([
                    ...tasks,
                    {
                      id: Date.now(),
                      plantName: newTaskPlant,
                      action: newTaskAction,
                      date: newTaskDate,
                      done: false,
                      color: newTaskColor,
                    }
                  ]);
                  setNewTaskPlant("");
                  setNewTaskAction("");
                  setNewTaskDate("");
                  setNewTaskColor("#4ade80");
                }}
              >
                <select
                  value={newTaskPlant}
                  onChange={e => setNewTaskPlant(e.target.value)}
                  className="border rounded px-2 py-1 text-black"
                  required
                >
                  <option value="">Choisir une plante</option>
                  {plants.map(plant => (
                    <option key={plant.id} value={plant.name}>{plant.name}</option>
                  ))}
                </select>
                <select
                  value={newTaskAction}
                  onChange={e => setNewTaskAction(e.target.value)}
                  className="border rounded px-2 py-1 text-black"
                  required
                  disabled={!newTaskPlant}
                >
                  <option value="">Choisir une action</option>
                  {(actionsByPlant[newTaskPlant] || []).map(action => (
                    <option key={action} value={action}>{action}</option>
                  ))}
                </select>
                {newTaskPlant && (actionsByPlant[newTaskPlant]?.length === 0 || !actionsByPlant[newTaskPlant]) && (
                  <div className="w-full mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const plant = plants.find(p => p.name === newTaskPlant);
                        if (plant) {
                          setShowCalendar(false);
                          setPlantToEdit(plant);
                          setShowEditModal(true);
                        }
                      }}
                    >
                      Ajouter une action pour cette plante
                    </Button>
                  </div>
                )}
                <input
                  type="date"
                  value={newTaskDate}
                  onChange={e => setNewTaskDate(e.target.value)}
                  className="border rounded px-2 py-1 text-black"
                  required
                />
                <input
                  type="color"
                  value={newTaskColor}
                  onChange={e => setNewTaskColor(e.target.value)}
                  title="Couleur"
                  className="w-8 h-8 p-0 border-none"
                />
                <Button type="submit" size="sm">Ajouter</Button>
                
              </form>
            </div>
          </div>
        )}

        {showEditModal && plantToEdit && (
          <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
            <DialogContent className="w-auto max-w-fit p-6">
              <DialogHeader>
                <DialogTitle>Modifier la plante</DialogTitle>
              </DialogHeader>
              <AddPlantForm
                initialPlant={plantToEdit}
                onAdd={updatedPlant => {
                  handleUpdatePlant(updatedPlant);
                  setShowEditModal(false);
                }}
                onCancel={() => setShowEditModal(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default WateringReminders;
