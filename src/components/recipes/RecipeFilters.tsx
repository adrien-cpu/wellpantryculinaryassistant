import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Filter, Clock, ChefHat, X } from "lucide-react";

interface RecipeFiltersProps {
  onSearch: (term: string) => void;
  onFilterChange: (filters: RecipeFilters) => void;
  onClearFilters: () => void;
  availableTags: string[];
  hasActiveFilters: boolean;
}

export interface RecipeFilters {
  tags: string[];
  maxTime?: number;
  difficulty?: string[];
  dietary?: string[];
}

const RecipeFilters: React.FC<RecipeFiltersProps> = ({
  onSearch,
  onFilterChange,
  onClearFilters,
  availableTags,
  hasActiveFilters
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [maxTime, setMaxTime] = useState<number>(120);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [isTimeFilterOpen, setIsTimeFilterOpen] = useState(false);
  const [isDifficultyFilterOpen, setIsDifficultyFilterOpen] = useState(false);
  const [isDietaryFilterOpen, setIsDietaryFilterOpen] = useState(false);

  const difficulties = ["Facile", "Moyen", "Difficile"];
  const dietaryOptions = ["Végétarien", "Végétalien", "Sans gluten", "Sans lactose", "Faible en calories", "Riche en protéines"];

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleTagClick = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    onFilterChange({
      tags: newTags,
      maxTime,
      difficulty: selectedDifficulties,
      dietary: selectedDietary
    });
  };

  const handleTimeChange = (value: number[]) => {
    const newMaxTime = value[0];
    setMaxTime(newMaxTime);
    onFilterChange({
      tags: selectedTags,
      maxTime: newMaxTime,
      difficulty: selectedDifficulties,
      dietary: selectedDietary
    });
  };

  const handleDifficultyChange = (difficulty: string) => {
    const newDifficulties = selectedDifficulties.includes(difficulty)
      ? selectedDifficulties.filter(d => d !== difficulty)
      : [...selectedDifficulties, difficulty];
    
    setSelectedDifficulties(newDifficulties);
    onFilterChange({
      tags: selectedTags,
      maxTime,
      difficulty: newDifficulties,
      dietary: selectedDietary
    });
  };

  const handleDietaryChange = (option: string) => {
    const newDietary = selectedDietary.includes(option)
      ? selectedDietary.filter(d => d !== option)
      : [...selectedDietary, option];
    
    setSelectedDietary(newDietary);
    onFilterChange({
      tags: selectedTags,
      maxTime,
      difficulty: selectedDifficulties,
      dietary: newDietary
    });
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setMaxTime(120);
    setSelectedDifficulties([]);
    setSelectedDietary([]);
    onClearFilters();
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-grow max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-wp-gray-dark dark:text-wp-gray-light" />
          <Input
            placeholder="Rechercher des recettes..."
            className="pl-10 border-wp-gray bg-white dark:bg-wp-gray-dark"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button 
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3 bg-wp-green"
            onClick={handleSearch}
          >
            Rechercher
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Popover open={isTimeFilterOpen} onOpenChange={setIsTimeFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-wp-gray-dark text-wp-gray-dark hover:bg-wp-green-light hover:text-wp-green-dark hover:border-wp-green dark:border-wp-gray-light dark:text-wp-gray-light">
                <Clock className="w-4 h-4 mr-2" />
                Temps
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-medium">Temps de préparation maximum</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[maxTime]}
                    max={180}
                    step={5}
                    onValueChange={handleTimeChange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-wp-gray-dark dark:text-wp-gray-light">
                    <span>0 min</span>
                    <span>{maxTime} min</span>
                    <span>180 min</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover open={isDifficultyFilterOpen} onOpenChange={setIsDifficultyFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-wp-gray-dark text-wp-gray-dark hover:bg-wp-green-light hover:text-wp-green-dark hover:border-wp-green dark:border-wp-gray-light dark:text-wp-gray-light">
                <ChefHat className="w-4 h-4 mr-2" />
                Difficulté
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <h3 className="font-medium mb-2">Niveau de difficulté</h3>
                {difficulties.map(difficulty => (
                  <div key={difficulty} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`difficulty-${difficulty}`}
                      checked={selectedDifficulties.includes(difficulty)}
                      onChange={() => handleDifficultyChange(difficulty)}
                      className="rounded border-wp-gray-dark text-wp-green focus:ring-wp-green mr-2"
                    />
                    <label htmlFor={`difficulty-${difficulty}`}>{difficulty}</label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover open={isDietaryFilterOpen} onOpenChange={setIsDietaryFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-wp-gray-dark text-wp-gray-dark hover:bg-wp-green-light hover:text-wp-green-dark hover:border-wp-green dark:border-wp-gray-light dark:text-wp-gray-light">
                <Filter className="w-4 h-4 mr-2" />
                Régime
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <h3 className="font-medium mb-2">Préférences alimentaires</h3>
                {dietaryOptions.map(option => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`dietary-${option}`}
                      checked={selectedDietary.includes(option)}
                      onChange={() => handleDietaryChange(option)}
                      className="rounded border-wp-gray-dark text-wp-green focus:ring-wp-green mr-2"
                    />
                    <label htmlFor={`dietary-${option}`}>{option}</label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              onClick={handleClearFilters}
              className="text-wp-gray-dark hover:text-wp-red dark:text-wp-gray-light"
            >
              <X className="w-4 h-4 mr-2" />
              Effacer
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className={
              selectedTags.includes(tag)
                ? "bg-wp-green hover:bg-wp-green-dark cursor-pointer"
                : "border-wp-gray-dark text-wp-gray-dark hover:bg-wp-green hover:text-white hover:border-wp-green dark:border-wp-gray-light dark:text-wp-gray-light cursor-pointer"
            }
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default RecipeFilters;

export { RecipeFilters }