import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/ui/navigation";
import { useCart } from "@/contexts/CartContext";
import { mockDishes } from "@/lib/mockData";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DishDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getTotalItems } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const dish = mockDishes.find(d => d.id === id);

  if (!dish) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation cartItemsCount={getTotalItems()} />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Dish not found</h1>
          <Button onClick={() => navigate("/menu")}>Back to Menu</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(dish, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity}x ${dish.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartItemsCount={getTotalItems()} />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/menu")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-lg">
            <img 
              src={dish.image} 
              alt={dish.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold">{dish.name}</h1>
                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {dish.category}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">⭐</span>
                <span className="ml-1">{dish.rating} ({dish.reviews} reviews)</span>
              </div>
              <p className="text-lg text-muted-foreground">{dish.description}</p>
            </div>

            {/* Ingredients */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {dish.ingredients.map((ingredient, index) => (
                    <span 
                      key={index}
                      className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price and Add to Cart */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-primary">${dish.price}</span>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => updateQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => updateQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${(dish.price * quantity).toFixed(2)}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add {quantity} to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}