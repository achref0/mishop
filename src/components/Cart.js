import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, X } from 'lucide-react';
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";

export function Cart({ cart, removeFromCart, addToCart, cartTotal }) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-xl">
      <CardContent className="p-4">
        {cart.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">Your cart is empty</p>
        ) : (
          <ul className="space-y-4">
            <AnimatePresence>
              {cart.map(item => (
                <motion.li
                  key={item.product.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.product.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">${item.product.price.toFixed(2)} each</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" onClick={() => removeFromCart(item.product.id)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Badge variant="secondary" className="text-lg px-3 py-1">{item.quantity}</Badge>
                    <Button size="icon" variant="outline" onClick={() => addToCart(item.product)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <span className="w-20 text-right font-semibold text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                    <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-700 hover:bg-red-100">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-gray-100 dark:bg-gray-700">
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-100">Total:</div>
        <div className="text-xl font-bold text-primary">${cartTotal.toFixed(2)}</div>
      </CardFooter>
    </Card>
  );
}
