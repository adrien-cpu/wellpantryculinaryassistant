
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface Plant {
  id: number;
  name: string;
  image: string;
  wateringStatus: number;
  lastWatered: string;
  nextWatering: string;
  growthStage: string;
  tips: string;
  type: string;
}

interface GardenCardProps {
  plant: Plant;
}

const GardenCard: React.FC<GardenCardProps> = ({ plant }) => {
  const { toast } = useToast();

  const showComingSoon = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Cette fonctionnalité sera disponible prochainement.",
      duration: 3000,
    });
  };

  return (
    <Card className="card-hover overflow-hidden border-wp-green-light bg-white dark:bg-wp-gray-dark dark:border-wp-green-dark">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
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
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={showComingSoon} className="text-wp-green">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          Conseils
        </Button>
        <Button variant="outline" size="sm" onClick={showComingSoon} className="border-wp-green text-wp-green">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M12 22c4.97 0 9-2.69 9-6s-4.03-6-9-6-9 2.69-9 6 4.03 6 9 6z"></path>
            <path d="M12 16v6"></path>
            <path d="M9 10a3 3 0 1 0 6 0 3 3 0 0 0-6 0"></path>
            <path d="M12 13v3"></path>
          </svg>
          Arroser
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GardenCard;
