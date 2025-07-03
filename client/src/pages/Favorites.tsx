import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/ui/navigation";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/hooks/useFavorites";
import { mockDishes } from "@/lib/mockData";
import { Link } from "wouter";
import { Heart, ShoppingCart, ChefHat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Favorites() {
  const { addToCart, getTotalItems } = useCart();
  const { toast } = useToast();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const favoriteDishes = mockDishes.filter(dish => favorites.has(dish.id));

  const handleAddToCart = (dish: any) => {
    addToCart(dish);
    toast({
      title: "Added to cart",
      description: `${dish.name} has been added to your cart.`,
    });
  };

  const handleToggleFavorite = (dish: any) => {
    toggleFavorite(dish.id);
    toast({
      title: "Removed from Favorites",
      description: `${dish.name} removed from your favorites.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartItemsCount={getTotalItems()} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Your Favorites</h1>
        
        {favoriteDishes.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">No favorites yet</h2>
            <p className="text-muted-foreground mb-8">Start adding dishes to your favorites from the menu</p>
            <Link href="/menu">
              <Button size="lg">
                <ChefHat className="mr-2 h-5 w-5" />
                Browse Menu
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteDishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    onClick={() => handleToggleFavorite(dish)}
                  >
                    <Heart className="h-4 w-4 fill-destructive text-destructive" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{dish.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      ${dish.price.toFixed(2)}
                    </span>
                    <div className="flex gap-2">
                      <Link href={`/dish/${dish.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(dish)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}