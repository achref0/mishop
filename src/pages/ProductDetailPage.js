import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { getProductById } from '../services/productService';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct = await getProductById(id);
      setProduct(fetchedProduct);
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }
    addToCart(product);
    alert('Product added to cart!');
  };

  if (!product) {
    return <div className="container mx-auto px-6 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl  font-bold text-gray-800 dark:text-white mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;