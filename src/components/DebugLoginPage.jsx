import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DebugLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [status, setStatus] = useState('Ready');
  
  const handleDirectLogin = async () => {
    setStatus('Starting direct login test...');
    
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      setStatus(`API Response: ${res.status}`);
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus('API Success - Calling AuthContext...');
        await login({ 
          id: data.user.id, 
          email: data.user.email, 
          role: data.user.role, 
          token: data.accessToken 
        });
        setStatus('AuthContext Success - Navigating...');
        navigate('/dashboard');
      } else {
        setStatus(`API Error: ${data.message}`);
      }
    } catch (err) {
      setStatus(`Network Error: ${err.message}`);
    }
  };
  
  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>🐛 Debug Login Page</h1>
      
      <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Current Status:</h3>
        <p>{status}</p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            margin: '5px 0', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            margin: '5px 0', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }}
        />
      </div>
      
      <button 
        onClick={handleDirectLogin}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          width: '100%'
        }}
      >
        🚀 Test Login Flow
      </button>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>This page tests the same login flow as the main login page, but with detailed status updates.</p>
        <p>Default credentials: test@example.com / password123</p>
      </div>
    </div>
  );
};

export default DebugLoginPage;
