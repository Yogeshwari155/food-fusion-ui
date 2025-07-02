import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/ui/navigation";
import { useCart } from "@/contexts/CartContext";
import { mockOrders } from "@/lib/mockData";

export default function Orders() {
  const { getTotalItems } = useCart();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-success text-success-foreground";
      case "out-for-delivery":
        return "bg-warning text-warning-foreground";
      case "preparing":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "out-for-delivery":
        return "Out for Delivery";
      case "preparing":
        return "Preparing";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartItemsCount={getTotalItems()} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        
        {mockOrders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">No orders yet</h2>
            <p className="text-muted-foreground">Your order history will appear here once you place your first order.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {mockOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ordered on {formatDate(order.orderDate)}
                    {order.estimatedDelivery && order.status !== "delivered" && (
                      <span className="block">
                        Estimated delivery: {formatDate(order.estimatedDelivery)}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.dish.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.dish.image} 
                            alt={item.dish.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.dish.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} × ${item.dish.price}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">
                            ${(item.dish.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    <hr className="my-4" />
                    
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-primary">${order.total.toFixed(2)}</span>
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