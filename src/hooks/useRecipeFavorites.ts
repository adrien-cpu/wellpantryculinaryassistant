import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { useToast } from './use-toast';

export const useRecipeFavorites = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's favorite recipes
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('recipe_favorites')
          .select('recipe_id')
          .eq('user_id', user.id);
        
        if (error) {
          console.error('Error fetching favorites:', error);
          throw error;
        }
        
        if (data) {
          const favoriteIds = data.map(item => item.recipe_id);
          setFavorites(favoriteIds);
        }
      } catch (error) {
        console.error('Error in fetchFavorites:', error);
        // Use mock data for favorites if needed
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  // Add a recipe to favorites
  const addFavorite = async (recipeId: string | number) => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour ajouter des favoris",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }

    try {
      // Optimistically update UI
      setFavorites(prev => [...prev, recipeId.toString()]);
      
      const { error } = await supabase
        .from('recipe_favorites')
        .insert({
          user_id: user.id,
          recipe_id: recipeId
        });
      
      if (error) {
        console.error('Error adding favorite:', error);
        // Revert optimistic update
        setFavorites(prev => prev.filter(id => id !== recipeId.toString()));
        throw error;
      }
      
      toast({
        title: "Ajouté aux favoris",
        description: "La recette a été ajoutée à vos favoris",
        duration: 2000,
      });
      
      return true;
    } catch (error) {
      console.error('Error in addFavorite:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter aux favoris",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
  };

  // Remove a recipe from favorites
  const removeFavorite = async (recipeId: string | number) => {
    if (!user) return false;

    try {
      // Optimistically update UI
      setFavorites(prev => prev.filter(id => id !== recipeId.toString()));
      
      const { error } = await supabase
        .from('recipe_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId);
      
      if (error) {
        console.error('Error removing favorite:', error);
        // Revert optimistic update
        setFavorites(prev => [...prev, recipeId.toString()]);
        throw error;
      }
      
      toast({
        title: "Retiré des favoris",
        description: "La recette a été retirée de vos favoris",
        duration: 2000,
      });
      
      return true;
    } catch (error) {
      console.error('Error in removeFavorite:', error);
      toast({
        title: "Erreur",
        description: "Impossible de retirer des favoris",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (recipeId: string | number, isFavorite: boolean) => {
    return isFavorite ? addFavorite(recipeId) : removeFavorite(recipeId);
  };

  // Check if a recipe is in favorites
  const isFavorite = (recipeId: string | number) => {
    return favorites.includes(recipeId.toString());
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  };
};