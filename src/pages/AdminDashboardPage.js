import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getProducts, addProduct, deleteProduct } from '../services/productService';

function AdminDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: '' });

  useEffect(() => {
    if (!user || !user.isAdmin) {
      // Redirect non-admin users
      navigate('/');
    } else {
      fetchProducts();
    }
  }, [user, navigate]);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      // Convert price to a number
      const productWithNumberPrice = {
        ...newProduct,
        price: parseFloat(newProduct.price), // Convert price to a number
      };

      if (isNaN(productWithNumberPrice.price)) {
        alert('Please enter a valid number for the price.');
        return;
      }

      await addProduct(productWithNumberPrice);
      setNewProduct({ name: '', price: '', description: '', image: '' });
      fetchProducts();
      alert('Product added successfully!');
    } catch (error) {
      alert('Failed to add product: ' + error.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts();
      alert('Product deleted successfully!');
    } catch (error) {
      alert('Failed to delete product: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 dark:text-gray-300 mb-2">Price</label>
              <input
                type="text"
                id="price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                id="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
              <input
                type="text"
                id="image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Add Product
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Manage Products</h2>
          <ul className="space-y-4">
            {products.map((product) => (
              <li key={product.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">${product.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
