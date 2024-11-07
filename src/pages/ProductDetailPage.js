import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();

  const fetchProduct = async () => {
    try {
      const fetchedProduct = await getProductById(id);
      setProduct(fetchedProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id, fetchProduct]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
            <p className="mb-6">{product.description}</p>
            <Button onClick={() => addToCart(product)}>Add to Cart</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}