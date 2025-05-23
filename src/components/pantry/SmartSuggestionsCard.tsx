
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ChefHat, Package, Lightbulb } from "lucide-react";
import { SmartSuggestion } from "@/utils/pantry/smartSuggestions";

interface SmartSuggestionsCardProps {
  suggestions: SmartSuggestion[];
  onActionClick: (suggestion: SmartSuggestion) => void;
}

const SmartSuggestionsCard: React.FC<SmartSuggestionsCardProps> = ({
  suggestions,
  onActionClick,
}) => {
  if (suggestions.length === 0) {
    return null;
  }

  const getIcon = (type: SmartSuggestion['type']) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'recipe':
        return <ChefHat className="h-5 w-5 text-wp-orange" />;
      case 'storage':
        return <Package className="h-5 w-5 text-wp-green" />;
      default:
        return <Lightbulb className="h-5 w-5 text-wp-green" />;
    }
  };

  const getBadgeVariant = (type: SmartSuggestion['type']) => {
    switch (type) {
      case 'urgent':
        return "destructive";
      case 'recipe':
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Card className="mb-6 border-wp-green-light bg-gradient-to-r from-wp-green-light/10 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-wp-green-dark">
          <Lightbulb className="h-5 w-5" />
          Suggestions intelligentes
        </CardTitle>
        <CardDescription>
          Des recommandations personnalisées pour optimiser votre garde-manger
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg border border-wp-green-light/20 bg-white/50 hover:bg-white/80 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1">
              {getIcon(suggestion.type)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-wp-brown-dark">{suggestion.title}</h4>
                  <Badge variant={getBadgeVariant(suggestion.type)} className="text-xs">
                    {suggestion.type === 'urgent' ? 'Urgent' : 
                     suggestion.type === 'recipe' ? 'Recette' :
                     suggestion.type === 'storage' ? 'Stockage' : 'Conseil'}
                  </Badge>
                </div>
                <p className="text-sm text-wp-gray-dark">{suggestion.description}</p>
                {suggestion.items.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {suggestion.items.slice(0, 3).map((item, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {item.name}
                      </Badge>
                    ))}
                    {suggestion.items.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{suggestion.items.length - 3} autres
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onActionClick(suggestion)}
              className="ml-4 border-wp-green text-wp-green hover:bg-wp-green-light"
            >
              {suggestion.type === 'urgent' ? 'Agir' :
               suggestion.type === 'recipe' ? 'Voir recettes' : 'Optimiser'}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SmartSuggestionsCard;
