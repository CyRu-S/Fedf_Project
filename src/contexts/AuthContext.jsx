import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Check for existing session on initial load
  useEffect(() => {
    // Since we now initialize state from localStorage, this effect's main job
    // is to set loading to false after the first render.
    // Any future auth validation (e.g., checking token expiry) could go here.
    setLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      // If userData already contains a token, it means the login API was already called
      // and we just need to set the user in context
      if (userData && userData.token) {
        const userObj = {
          id: userData.id,
          email: userData.email,
          role: userData.role,
          token: userData.token,
          profile: userData.profile || null,
        };
        setUser(userObj);
        localStorage.setItem('user', JSON.stringify(userObj));
        return userObj;
      }

      // If credentials provided, call backend login
      if (userData && userData.email && userData.password) {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userData.email, password: userData.password }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || 'Login failed');
        }
        const data = await res.json();
        const userObj = {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          token: data.accessToken,
          profile: data.profile || null,
        };
        setUser(userObj);
        localStorage.setItem('user', JSON.stringify(userObj));
        return userObj;
      }

      throw new Error('Invalid login parameters');
    } catch (err) {
      // bubble up error to caller
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // The ProtectedRoute component will handle the redirect to the login page.
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

// Remove the default export to be compatible with Fast Refresh
// export default AuthContext;
