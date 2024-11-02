// This is a mock implementation. Replace with actual API calls in a real application.

const users = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'admin123', isAdmin: true },
  ];
  
  export async function signUp(name, email, password) {
    const newUser = { id: users.length + 1, name, email, password, isAdmin: false };
    users.push(newUser);
    return { ...newUser, password: undefined };
  }
  
  export async function login(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      return { ...user, password: undefined };
    }
    throw new Error('Invalid email or password');
  }