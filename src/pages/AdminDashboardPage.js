import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';
import { Alert, AlertDescription } from '../components/ui/Alert';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await createProduct(newProduct);
      setNewProduct({ name: '', description: '', price: '', image: '' });
      fetchProducts();
      setSuccess('Product created successfully!');
    } catch (err) {
      setError('Failed to create product. Please try again.');
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    setError('');
    setSuccess('');
    try {
      await updateProduct(id, updatedProduct);
      fetchProducts();
      setSuccess('Product updated successfully!');
    } catch (err) {
      setError('Failed to update product. Please try again.');
    }
  };

  const handleDeleteProduct = async (id) => {
    setError('');
    setSuccess('');
    try {
      await deleteProduct(id);
      fetchProducts();
      setSuccess('Product deleted successfully!');
    } catch (err) {
      setError('Failed to delete product. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert variant="default" className="mb-4">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      <Card className="mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleCreateProduct} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              required
            />
          </div>
          <Button type="submit">Add Product</Button>
        </form>
      </Card>
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <Card key={product.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800 font-bold mt-2">${product.price.toFixed(2)}</p>
              </div>
              <div className="space-x-2">
                <Button onClick={() => handleUpdateProduct(product.id, { ...product, price: product.price + 1 })}>
                  Increase Price
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}