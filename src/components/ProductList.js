import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

export function ProductList({ products, addToCart, addedProductId }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <motion.div key={product.id} layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden group">
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Button onClick={() => addToCart(product)} variant="secondary" className="transform transition-transform duration-300 hover:scale-110">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">{product.name}</CardTitle>
              <p className="text-xl font-bold mt-2 text-primary">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4">
              <Button onClick={() => addToCart(product)} className="w-full relative overflow-hidden group bg-primary hover:bg-primary-dark text-white">
                <span className="relative z-10">Add to Cart</span>
                <span className="absolute inset-0 bg-white opacity-25 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Button>
            </CardFooter>
          </Card>
          <AnimatePresence>
            {addedProductId === product.id && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-2 shadow-lg"
              >
                <ShoppingCart size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}