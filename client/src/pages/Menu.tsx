import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/ui/navigation";
import { useCart } from "@/contexts/CartContext";
import { mockDishes, categories } from "@/lib/mockData";
import { Link } from "wouter";
import { Search, ShoppingCart, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/hooks/useFavorites";

export default function Menu() {
  const { addToCart, getTotalItems } = useCart();
  const { toast } = useToast();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDishes = mockDishes.filter(dish => {
    const matchesCategory = selectedCategory === "All" || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (dish: any) => {
    addToCart(dish);
    toast({
      title: "Added to cart",
      description: `${dish.name} has been added to your cart.`,
    });
  };

  const handleToggleFavorite = (dish: any) => {
    const isAdded = toggleFavorite(dish.id);
    toast({
      title: isAdded ? "Added to Favorites" : "Removed from Favorites",
      description: `${dish.name} ${isAdded ? "added to" : "removed from"} your favorites.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartItemsCount={getTotalItems()} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Our Menu</h1>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No dishes found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold">{dish.name}</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleFavorite(dish)}
                        className="p-1 h-8 w-8"
                      >
                        <Heart 
                          className={`h-4 w-4 ${isFavorite(dish.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
                        />
                      </Button>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                        {dish.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{dish.description}</p>
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm ml-1">{dish.rating} ({dish.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${dish.price}</span>
                    <div className="flex gap-2">
                      <Link href={`/dish/${dish.id}`}>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </Link>
                      <Button size="sm" onClick={() => handleAddToCart(dish)}>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
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