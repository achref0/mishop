import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { getProducts } from '../services/productService';

function HomePage() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }
    addToCart(product);
    alert('Product added to cart!');
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{product.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">${product.price.toFixed(2)}</p>
              <div className="mt-4 flex justify-between items-center">
                <Link to={`/product/${product.id}`} className="text-blue-500 hover:text-blue-600">
                  View Details
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;