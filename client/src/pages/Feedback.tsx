import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/ui/navigation";
import { useCart } from "@/contexts/CartContext";
import { mockDishes } from "@/lib/mockData";
import { Star, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface FeedbackForm {
  dishId: string;
  rating: number;
  comment: string;
  customerName: string;
}

export default function Feedback() {
  const { getTotalItems } = useCart();
  const { toast } = useToast();
  const [selectedDish, setSelectedDish] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const form = useForm<FeedbackForm>({
    defaultValues: {
      dishId: "",
      rating: 0,
      comment: "",
      customerName: "",
    },
  });

  const onSubmit = (data: FeedbackForm) => {
    const dishName = mockDishes.find(d => d.id === data.dishId)?.name || "Unknown dish";
    
    toast({
      title: "Feedback submitted!",
      description: `Thank you for your feedback on ${dishName}. We appreciate your review!`,
    });

    // Reset form
    form.reset();
    setRating(0);
    setSelectedDish("");
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
    form.setValue("rating", value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartItemsCount={getTotalItems()} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Share Your Feedback</h1>
          <p className="text-center text-muted-foreground mb-8">
            We value your opinion! Tell us about your dining experience.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Rate Your Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="customerName"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dishId"
                    rules={{ required: "Please select a dish" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Dish</FormLabel>
                        <FormControl>
                          <select 
                            {...field}
                            value={selectedDish}
                            onChange={(e) => {
                              setSelectedDish(e.target.value);
                              field.onChange(e.target.value);
                            }}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Select a dish...</option>
                            {mockDishes.map((dish) => (
                              <option key={dish.id} value={dish.id}>
                                {dish.name} - ${dish.price}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    rules={{ required: "Please provide a rating", min: { value: 1, message: "Rating must be at least 1 star" } }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => handleRatingClick(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="focus:outline-none"
                              >
                                <Star 
                                  className={`h-8 w-8 ${
                                    star <= (hoveredRating || rating) 
                                      ? "fill-yellow-400 text-yellow-400" 
                                      : "text-gray-300"
                                  } transition-colors`}
                                />
                              </button>
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">
                              {rating > 0 && `${rating} star${rating > 1 ? 's' : ''}`}
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="comment"
                    rules={{ required: "Please share your feedback", minLength: { value: 10, message: "Please provide more detailed feedback" } }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Feedback</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your experience with this dish..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Recent Feedback Display */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recent Customer Reviews</h2>
            <div className="space-y-4">
              {mockDishes.slice(0, 3).map((dish) => (
                <Card key={dish.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={dish.image} 
                        alt={dish.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{dish.name}</h3>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(dish.rating) 
                                  ? "fill-yellow-400 text-yellow-400" 
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">
                            {dish.rating} ({dish.reviews} reviews)
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          "Great taste and quality! Highly recommended." - Recent Customer
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}