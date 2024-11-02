// This is a mock implementation. Replace with actual API calls in a real application.

let products = [
    { id: 1, name: 'Product 1', price: 19.99, description: 'This is product 1', image: '/placeholder.svg?height=200&width=200' },
    { id: 2, name: 'Product 2', price: 29.99, description: 'This is product 2', image: '/placeholder.svg?height=200&width=200' },
    { id: 3, name: "Classic Sneakers", price: 79.99,description: 'This is product 3', image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Snapback Cap", price: 24.99,description: 'This is product 4', image: "/placeholder.svg?height=200&width=200" },
    { id: 5, name: "Leather Jacket", price: 89.99,description: 'This is product 5', image: "/placeholder.svg?height=200&width=200" },
    { id: 6, name: "Cozy Socks", price: 9.99,description: 'This is product 6', image: "/placeholder.svg?height=200&width=200" },
  ];
  
  export async function getProducts() {
    return products;
  }
  
  export async function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
  }
  
  export async function addProduct(product) {
    const newProduct = { ...product, id: products.length + 1 };
    products.push(newProduct);
    return newProduct;
  }
  
  export async function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
  }