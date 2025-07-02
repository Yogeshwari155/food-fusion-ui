import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/ui/navigation";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();
  
  const tax = getTotalPrice() * 0.1; // 10% tax
  const total = getTotalPrice() + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation cartItemsCount={getTotalItems()} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add some delicious dishes to get started!</p>
            <Link to="/menu">
              <Button size="lg">Browse Menu</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartItemsCount={getTotalItems()} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.dish.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.dish.image} 
                        alt={item.dish.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{item.dish.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-1">
                        {item.dish.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          ${item.dish.price}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => removeFromCart(item.dish.id)}
                            className="ml-2 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.dish.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.dish.name}</span>
                      <span>${(item.dish.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <hr />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
                
                <Link to="/menu">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}