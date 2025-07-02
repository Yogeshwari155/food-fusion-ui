export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
  rating: number;
  reviews: number;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  category: string;
}

export interface Order {
  id: string;
  items: Array<{
    dish: Dish;
    quantity: number;
  }>;
  total: number;
  status: "preparing" | "out-for-delivery" | "delivered";
  orderDate: string;
  estimatedDelivery?: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export const mockDishes: Dish[] = [
  {
    id: "1",
    name: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, onion, and our special sauce",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    category: "Burgers",
    ingredients: ["Beef patty", "Lettuce", "Tomato", "Onion", "Special sauce", "Sesame bun"],
    rating: 4.5,
    reviews: 128
  },
  {
    id: "2",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, and basil on crispy thin crust",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500",
    category: "Pizza",
    ingredients: ["Mozzarella", "Tomato sauce", "Fresh basil", "Olive oil", "Thin crust"],
    rating: 4.7,
    reviews: 95
  },
  {
    id: "3",
    name: "Salmon Sushi Roll",
    description: "Fresh salmon with avocado and cucumber, served with wasabi and ginger",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500",
    category: "Sushi",
    ingredients: ["Fresh salmon", "Avocado", "Cucumber", "Sushi rice", "Nori", "Wasabi"],
    rating: 4.8,
    reviews: 76
  },
  {
    id: "4",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan, croutons, and Caesar dressing",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500",
    category: "Salads",
    ingredients: ["Romaine lettuce", "Parmesan cheese", "Croutons", "Caesar dressing"],
    rating: 4.3,
    reviews: 54
  },
  {
    id: "5",
    name: "Chicken Tacos",
    description: "Grilled chicken with salsa, lettuce, and cheese in soft tortillas",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500",
    category: "Mexican",
    ingredients: ["Grilled chicken", "Soft tortillas", "Salsa", "Lettuce", "Cheese"],
    rating: 4.6,
    reviews: 89
  },
  {
    id: "6",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with chocolate frosting and berries",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    category: "Desserts",
    ingredients: ["Chocolate cake", "Chocolate frosting", "Fresh berries"],
    rating: 4.9,
    reviews: 112
  }
];

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "The Burger Joint",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500",
    rating: 4.5,
    deliveryTime: "25-35 min",
    category: "Burgers"
  },
  {
    id: "2",
    name: "Mario's Pizzeria",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    rating: 4.7,
    deliveryTime: "30-40 min",
    category: "Pizza"
  },
  {
    id: "3",
    name: "Sakura Sushi",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500",
    rating: 4.8,
    deliveryTime: "20-30 min",
    category: "Sushi"
  }
];

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    items: [
      { dish: mockDishes[0], quantity: 2 },
      { dish: mockDishes[3], quantity: 1 }
    ],
    total: 36.97,
    status: "delivered",
    orderDate: "2024-01-15T10:30:00Z"
  },
  {
    id: "ORD-002",
    items: [
      { dish: mockDishes[1], quantity: 1 },
      { dish: mockDishes[5], quantity: 2 }
    ],
    total: 30.97,
    status: "out-for-delivery",
    orderDate: "2024-01-16T14:15:00Z",
    estimatedDelivery: "2024-01-16T15:00:00Z"
  },
  {
    id: "ORD-003",
    items: [
      { dish: mockDishes[2], quantity: 3 }
    ],
    total: 50.97,
    status: "preparing",
    orderDate: "2024-01-16T16:45:00Z",
    estimatedDelivery: "2024-01-16T17:30:00Z"
  }
];

export const categories = ["All", "Burgers", "Pizza", "Sushi", "Salads", "Mexican", "Desserts"];