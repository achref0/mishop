import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useCart } from '../contexts/CartContext';

export default function ProductList({ products }) {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col justify-between">
          <div>
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center">
            <Link to={`/product/${product.id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
            <Button onClick={() => addToCart(product)}>Add to Cart</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}