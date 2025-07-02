import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  cartItemsCount?: number;
}

export function Navigation({ cartItemsCount = 0 }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/orders", label: "Orders" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-primary">
            FoodFusion
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-foreground hover:text-primary transition-colors ${
                    isActive ? "text-primary font-medium" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Cart and Auth */}
          <div className="flex items-center space-x-4">
            <NavLink to="/cart">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </NavLink>
            
            <NavLink to="/login">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </NavLink>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-4 py-2 text-foreground hover:text-primary transition-colors ${
                      isActive ? "text-primary font-medium bg-muted" : ""
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}