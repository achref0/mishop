import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <Card className="p-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4 pb-4 border-b">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 p-1 border rounded mr-2"
                />
                <Button onClick={() => removeFromCart(item.id)} variant="destructive" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <Button onClick={clearCart} variant="outline">
              Clear Cart
            </Button>
            <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
          </div>
          <div className="mt-6">
            <Link to="/checkout">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}