import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

export default function AuthButton() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (user) {
    return (
      <Button onClick={handleLogout} variant="outline">
        Logout
      </Button>
    );
  }

  return (
    <>
      <Link to="/login">
        <Button variant="outline" className="mr-2">
          Login
        </Button>
      </Link>
      <Link to="/signup">
        <Button>Sign Up</Button>
      </Link>
    </>
  );
}