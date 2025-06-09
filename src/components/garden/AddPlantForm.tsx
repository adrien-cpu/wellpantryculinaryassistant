import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Plant } from "./GardenData";
import type { Task } from "./GardenData";
import { fetchPlantAdvice } from "@/api/fetchPlantAdvice";
import { fetchPlantPlanning } from "@/api/fetchPlantPlanning";
import { useToast } from "@/hooks/use-toast";

interface AddPlantFormProps {
  onAdd: (plant: Plant) => void;
  onCancel: () => void;
  initialPlant?: Plant;
}

const AddPlantForm: React.FC<AddPlantFormProps> = ({ onAdd, onCancel, initialPlant }) => {
  const [name, setName] = useState(initialPlant?.name || "");
  const [image, setImage] = useState<string>(initialPlant?.image || "");
  const [tips, setTips] = useState<string[]>(initialPlant?.tips || []);
  const [tipInput, setTipInput] = useState("");
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [planning, setPlanning] = useState<Task[]>(initialPlant?.planning || []);
  const [taskInput, setTaskInput] = useState("");
  const [taskDate, setTaskDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddTip = () => {
    if (tipInput.trim()) {
      setTips([...tips, tipInput]);
      setTipInput("");
    }
  };

  const handleAddTask = () => {
    if (!taskDate) {
      toast({
        title: "Date manquante",
        description: "Merci de renseigner une date pour la tâche.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    if (taskInput.trim()) {
      setPlanning([
        ...planning,
        {
          id: Date.now(),
          plantName: name,
          date: taskDate,
          action: taskInput,
          done: false,
          color: "#4ade80",
        }
      ]);
      setTaskInput("");
      setTaskDate("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onAdd({
      id: initialPlant?.id ?? Date.now(),
      name,
      image,
      wateringStatus: initialPlant?.wateringStatus ?? 50,
      lastWatered: initialPlant?.lastWatered ?? "Jamais",
      nextWatering: initialPlant?.nextWatering ?? "Demain",
      growthStage: initialPlant?.growthStage ?? "Jeune plant",
      tips,
      type: initialPlant?.type ?? "À préciser",
      planning,
    });
    toast({
      title: "Succès",
      description: "La plante a été ajoutée avec succès.",
      variant: "default",
    });
    setName("");
    setImage("");
    setTips([]);
    setPlanning([]);
  };

  // Appel à l’IA pour les conseils quand le nom change
  useEffect(() => {
    if (name.trim().length > 2) {
      setLoadingAdvice(true);
      fetchPlantAdvice(name).then(aiTips => {
        setTips(aiTips);
        setLoadingAdvice(false);
      });
    }
  }, [name]);

  // Appel à l’IA pour le planning quand le nom change
  useEffect(() => {
    if (name.trim().length > 2) {
      fetchPlantPlanning(name, new Date().toISOString().slice(0, 10)).then(aiPlanning => {
        setPlanning(aiPlanning);
      });
    }
  }, [name]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">  
      <div className="flex flex-col">
        <label>Nom de la plante :</label>
        <input value={name} onChange={e => setName(e.target.value)} required className="text-black ml-2 border rounded px-2 py-1 " />
      </div>
      <div>
        <label>Photo :</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="ml-2" />
        {image && <img src={image} alt="Aperçu" className="mt-2 w-24 h-24 object-cover rounded" />}
      </div>
      <div>
        <label>Conseil :</label>
        <input value={tipInput} onChange={e => setTipInput(e.target.value)} className="ml-2 border rounded px-2 py-1 text-black" />
        <Button type="button" onClick={handleAddTip} className="ml-2">Ajouter le conseil</Button>
      </div>
      {loadingAdvice && <p>Chargement des conseils...</p>}
      <ul className="list-disc pl-5">
        {tips.map((t, idx) => <li key={idx}>{t}</li>)}
      </ul>
      <div>
        <label>Planification :</label>
        <div className="flex gap-2">
          <input
            type="date"
            value={taskDate}
            onChange={e => setTaskDate(e.target.value)}
            className="border rounded px-2 py-1 text-black"
          />
          <input
            value={taskInput}
            onChange={e => setTaskInput(e.target.value)}
            placeholder="Nouvelle tâche"
            className="border rounded px-2 py-1 flex-1 text-black"
          />

          <Button type="button" onClick={handleAddTask}>Ajouter une tâche</Button>
        </div>
      </div>
      <ul className="list-disc pl-5">
        {planning.map((t, idx) => (
          <li key={t.id} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ background: t.color }}
              title="Couleur de la tâche"
            ></span>
            <span className="font-medium">{t.date}</span>
            <span>:</span>
            <span>{t.action}</span>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="ml-2"
              onClick={() => setPlanning(planning.filter(task => task.id !== t.id))}
              title="Supprimer la tâche"
            >
              ✕
            </Button>
          </li>
        ))}
        {planning.length === 0 && (
          <li className="text-gray-400 italic">Aucune tâche programmée</li>
        )}
      </ul>
      <div className="flex gap-2">
        <Button type="submit">
          {initialPlant ? "Modifier la plante" : "Ajouter la plante"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>Annuler</Button>
      </div>
    </form>
  );
};

export default AddPlantForm;