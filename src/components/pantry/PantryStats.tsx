
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface PantryStatsProps {
  itemsCount: number;
  fridgeCount: number;
  cabinetCount: number;
  wineCellarCount: number;
  expiringCount: number;
  onShowComingSoon: () => void;
}

const COLORS = ['#4ade80', '#f97316', '#8b5cf6', '#ec4899'];

const PantryStats: React.FC<PantryStatsProps> = ({
  itemsCount,
  fridgeCount,
  cabinetCount,
  wineCellarCount,
  expiringCount,
  onShowComingSoon,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  const pieData = [
    { name: 'Réfrigérateur', value: fridgeCount, color: '#4ade80' },
    { name: 'Placard', value: cabinetCount, color: '#f97316' },
    { name: 'Cave à vin', value: wineCellarCount, color: '#8b5cf6' },
  ];

  // Données simulées pour les statistiques mensuelles
  const monthlyData = [
    { name: 'Jan', ajoutés: 12, consommés: 10, expirés: 2 },
    { name: 'Fév', ajoutés: 15, consommés: 13, expirés: 1 },
    { name: 'Mar', ajoutés: 11, consommés: 9, expirés: 0 },
    { name: 'Avr', ajoutés: 14, consommés: 12, expirés: 1 },
    { name: 'Mai', ajoutés: 18, consommés: 15, expirés: 2 },
  ];

  // Données simulées pour les catégories les plus fréquentes
  const categoryData = [
    { name: 'Fruits', count: 8 },
    { name: 'Légumes', count: 7 },
    { name: 'Produits laitiers', count: 5 },
    { name: 'Viandes', count: 3 },
    { name: 'Céréales', count: 3 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques</CardTitle>
        <CardDescription>Aperçu de votre consommation</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="monthly">Évolution</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="flex justify-center space-x-8">
              <div>
                <div className="text-3xl font-bold text-wp-green-dark dark:text-wp-green">{itemsCount}</div>
                <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Articles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-wp-green-dark dark:text-wp-green">{fridgeCount}</div>
                <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Réfrigérateur</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-wp-green-dark dark:text-wp-green">{cabinetCount}</div>
                <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Placard</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-wp-green-dark dark:text-wp-green">{wineCellarCount}</div>
                <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Cave à vin</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-wp-orange-dark">{expiringCount}</div>
                <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-1">Expirations proches</div>
              </div>
            </div>
            
            {itemsCount > 0 && (
              <div className="mt-6 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="monthly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ajoutés" fill="#4ade80" />
                  <Bar dataKey="consommés" fill="#f97316" />
                  <Bar dataKey="expirés" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-4 text-center italic">
              Évolution de votre garde-manger au fil des mois
            </p>
          </TabsContent>
          
          <TabsContent value="categories">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-4 text-center italic">
              Catégories d'aliments les plus présentes dans votre garde-manger
            </p>
          </TabsContent>
        </Tabs>
        
        <Button variant="link" onClick={onShowComingSoon} className="mt-6 text-wp-green-dark dark:text-wp-green">
          <span>Voir toutes les statistiques</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PantryStats;
