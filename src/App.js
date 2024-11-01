import React, { useState, useEffect } from 'react';
import { ShoppingCart, ChevronUp } from 'lucide-react';
import { Button } from "./components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { AuthButton } from './components/AuthButton';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { products } from './data/products';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedProductId, setAddedProductId] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('John Doe');
  const [userImage, setUserImage] = useState('/placeholder.svg?height=32&width=32');

  const addToCart = (product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { product, quantity: 1 }];
    });
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 500);
  };

  const removeFromCart = (productId) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map(item =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return currentCart.filter(item => item.product.id !== productId);
    });
  };

  const handleSignIn = () => {
    // Implement your sign-in logic here
    setIsAuthenticated(true);
  };

  const handleSignUp = () => {
    // Implement your sign-up logic here
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/75 dark:bg-gray-900/75 shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Stylish Shopping</h1>
          <AuthButton
            isAuthenticated={isAuthenticated}
            onSignInClick={handleSignIn}
            onSignUpClick={handleSignUp}
            onLogout={handleLogout}
            userName={userName}
            userImage={userImage}
          />
        </div>
      </header>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-semibold mb-6 text-gray-700 dark:text-gray-200">Our Collection</h2>
            <ProductList products={products} addToCart={addToCart} addedProductId={addedProductId} />
          </div>
          <div>
            <div className="sticky top-20">
              <h2 className="text-3xl font-semibold mb-6 text-gray-700 dark:text-gray-200">Your Cart</h2>
              <Button onClick={() => setIsCartOpen(!isCartOpen)} className="mb-4 w-full bg-primary hover:bg-primary-dark text-white">
                <ShoppingCart className="mr-2" />
                {isCartOpen ? 'Close Cart' : 'Open Cart'} ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </Button>
              <AnimatePresence>
                {isCartOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Cart cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} cartTotal={cartTotal} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-primary hover:bg-primary-dark text-white p-3 rounded-full shadow-lg transition-colors duration-300"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;