import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 mr-2 p-1 border rounded"
                />
                <Button onClick={() => removeFromCart(item.id)} variant="destructive" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <strong>Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</strong>
          </div>
        </>
      )}
    </Card>
  );
}