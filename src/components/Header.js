import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthButton from './AuthButton';
import { Badge } from './ui/Badge';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const { user } = useAuth();
  const { cart } = useCart();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            MiShop
          </Link>
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link to="/" className="text-gray-700 hover:text-gray-900">
                  Home
                </Link>
              </li>
              {user && user.isAdmin ? (
                <>
                  <li>
                    <Link to="/admin" className="text-gray-700 hover:text-gray-900">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/products" className="text-gray-700 hover:text-gray-900">
                      Manage Products
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/cart" className="text-gray-700 hover:text-gray-900 relative">
                      Cart
                      {cart.length > 0 && (
                        <Badge variant="destructive" className="absolute -top-2 -right-2">
                          {cart.length}
                        </Badge>
                      )}
                    </Link>
                  </li>
                  {user && (
                    <li>
                      <Link to="/profile" className="text-gray-700 hover:text-gray-900">
                        Profile
                      </Link>
                    </li>
                  )}
                </>
              )}
              <li>
                <AuthButton />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}