import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/ui/navigation";
import { useCart } from "@/contexts/CartContext";
import { mockDishes, mockRestaurants } from "@/lib/mockData";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-food.jpg";

export default function Home() {
  const { getTotalItems } = useCart();
  
  const featuredDishes = mockDishes.slice(0, 3);
  const featuredRestaurants = mockRestaurants;

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartItemsCount={getTotalItems()} />
      
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-primary to-warning overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Delicious food" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-warning/70"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-center md:text-left max-w-2xl text-primary-foreground">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Delicious Food,
              <br />
              <span className="text-warning">Delivered Fast</span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Order from your favorite restaurants and get fresh, hot meals delivered to your door in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/menu">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Order Now
                </Button>
              </Link>
              <Link to="/menu">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                  Browse Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center">
                      ⭐ {restaurant.rating}
                    </span>
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{restaurant.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Dishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${dish.price}</span>
                    <Link to={`/dish/${dish.id}`}>
                      <Button>View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-warning">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust us for their daily meals.
          </p>
          <Link to="/menu">
            <Button size="lg" variant="secondary">
              Start Ordering
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}