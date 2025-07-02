import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'food-app-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        const favoriteIds = JSON.parse(stored);
        setFavorites(new Set(favoriteIds));
      } catch {
        // If parsing fails, start with empty favorites
        setFavorites(new Set());
      }
    }
  }, []);

  const toggleFavorite = (dishId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(dishId)) {
      newFavorites.delete(dishId);
    } else {
      newFavorites.add(dishId);
    }
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(newFavorites)));
    return !favorites.has(dishId); // Return true if added, false if removed
  };

  const isFavorite = (dishId: string) => favorites.has(dishId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}