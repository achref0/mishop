// This is a mock implementation. Replace with actual API calls in a real application.

const carts = {};

export async function addToCart(userId, productId) {
  if (!carts[userId]) {
    carts[userId] = [];
  }
  carts[userId].push(productId);
}

export async function getCart(userId) {
  return carts[userId] || [];
}