import { useState, useEffect, useMemo } from 'react';
import { Recipe } from '@/types/recipe';
import { mockRecipes } from '@/data/mockRecipes';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';
import { RecipeFilters } from '@/components/recipes/RecipeFilters';

export const useRecipes = () => {
  const { toast } = useToast();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<RecipeFilters>({
    tags: [],
    maxTime: undefined,
    difficulty: [],
    dietary: []
  });
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Fetch recipes from Supabase or use mock data
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from Supabase first
        const { data, error } = await supabase
          .from('recipes')
          .select('*');
        
        if (error) {
          console.error('Error fetching recipes from Supabase:', error);
          // Fall back to mock data
          setRecipes(mockRecipes);
        } else if (data && data.length > 0) {
          // Map Supabase data to Recipe type if needed
          setRecipes(data as Recipe[]);
        } else {
          // If no data in Supabase, use mock data
          setRecipes(mockRecipes);
        }
      } catch (error) {
        console.error('Error in fetchRecipes:', error);
        setRecipes(mockRecipes);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes based on search term and filters
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Search term filter
      if (searchTerm && !recipe.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Tags filter
      if (filters.tags.length > 0 && !filters.tags.some(tag => recipe.tags.includes(tag))) {
        return false;
      }
      
      // Max time filter
      if (filters.maxTime && (recipe.totalTime || (recipe.preparationTime + (recipe.cookingTime || 0))) > filters.maxTime) {
        return false;
      }
      
      // Difficulty filter
      if (filters.difficulty && filters.difficulty.length > 0 && !filters.difficulty.includes(recipe.difficulty)) {
        return false;
      }
      
      // Dietary filter
      if (filters.dietary && filters.dietary.length > 0 && !filters.dietary.some(diet => recipe.tags.includes(diet))) {
        return false;
      }
      
      return true;
    });
  }, [recipes, searchTerm, filters]);

  // Get all unique tags from recipes
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    recipes.forEach(recipe => {
      recipe.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [recipes]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: RecipeFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters({
      tags: [],
      maxTime: undefined,
      difficulty: [],
      dietary: []
    });
  };

  const handleViewRecipe = (id: string | number) => {
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
      setSelectedRecipe(recipe);
      setIsDetailOpen(true);
    }
  };

  const handleToggleFavorite = async (id: string | number, isFavorite: boolean) => {
    try {
      // Update local state first for immediate feedback
      setRecipes(prevRecipes => 
        prevRecipes.map(recipe => 
          recipe.id === id ? { ...recipe, isFavorite } : recipe
        )
      );
      
      if (selectedRecipe && selectedRecipe.id === id) {
        setSelectedRecipe({ ...selectedRecipe, isFavorite });
      }

      // In a real app, you would update the database
      // For now, just show a toast notification
      toast({
        title: isFavorite ? "Ajouté aux favoris" : "Retiré des favoris",
        description: isFavorite 
          ? "La recette a été ajoutée à vos favoris" 
          : "La recette a été retirée de vos favoris",
        duration: 3000,
      });
      
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des favoris",
        variant: "destructive",
        duration: 3000,
      });
      
      // Revert the change in case of error
      setRecipes(prevRecipes => 
        prevRecipes.map(recipe => 
          recipe.id === id ? { ...recipe, isFavorite: !isFavorite } : recipe
        )
      );
      
      if (selectedRecipe && selectedRecipe.id === id) {
        setSelectedRecipe({ ...selectedRecipe, isFavorite: !isFavorite });
      }
    }
  };

  return {
    recipes: filteredRecipes,
    loading,
    searchTerm,
    filters,
    allTags,
    selectedRecipe,
    isDetailOpen,
    hasActiveFilters: searchTerm !== '' || 
                     filters.tags.length > 0 || 
                     filters.maxTime !== undefined || 
                     (filters.difficulty?.length || 0) > 0 || 
                     (filters.dietary?.length || 0) > 0,
    handleSearch,
    handleFilterChange,
    handleClearFilters,
    handleViewRecipe,
    handleToggleFavorite,
    setIsDetailOpen
  };
};