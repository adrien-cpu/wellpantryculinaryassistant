
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

const NutritionLegend: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Info className="h-4 w-4 text-wp-green" />
          Guide nutritionnel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-wp-green rounded"></div>
              <span><strong>Protéines</strong> - Construction musculaire, satiété</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-wp-orange rounded"></div>
              <span><strong>Glucides</strong> - Énergie immédiate, carburant du cerveau</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-wp-brown rounded"></div>
              <span><strong>Lipides</strong> - Énergie durable, vitamines liposolubles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-wp-green-dark rounded"></div>
              <span><strong>Fibres</strong> - Digestion, satiété, santé intestinale</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionLegend;
