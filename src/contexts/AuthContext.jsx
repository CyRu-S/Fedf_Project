import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking auth status...');
        const savedUser = localStorage.getItem('user');
        console.log('Saved user from localStorage:', savedUser);
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          console.log('Parsed user:', parsedUser);
          setUser(parsedUser);
        } else {
          console.log('No saved user found in localStorage');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        console.log('Auth check complete, loading set to false');
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (userData) => {
    console.log('Login called with:', userData);
    // Wrap in a promise to make it awaitable
    return new Promise((resolve) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('User data saved to localStorage');
      resolve();
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Return the path to navigate to after logout
    return '/login';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
