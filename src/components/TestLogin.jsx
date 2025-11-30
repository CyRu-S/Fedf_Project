import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const TestLogin = () => {
  const [result, setResult] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const testLogin = async () => {
    setResult('Testing full authentication flow...');
    
    try {
      // Step 1: API call
      setResult('Step 1: Calling login API...');
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: 'test@example.com', 
          password: 'password123' 
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setResult(`❌ API call failed: ${data.message}`);
        return;
      }
      
      // Step 2: AuthContext login
      setResult('Step 2: Calling AuthContext login...');
      await login({ 
        id: data.user.id, 
        email: data.user.email, 
        role: data.user.role, 
        token: data.accessToken 
      });
      
      // Step 3: Navigate
      setResult('Step 3: Navigating to dashboard...');
      navigate('/dashboard');
      
    } catch (err) {
      setResult(`❌ Error: ${err.message}`);
    }
  };

  const testDirectLogin = () => {
    setResult('Testing direct AuthContext login...');
    try {
      login({ 
        id: 'test-id', 
        email: 'test@direct.com', 
        role: 'user', 
        token: 'fake-token' 
      });
      setResult('✅ Direct login successful');
    } catch (err) {
      setResult(`❌ Direct login error: ${err.message}`);
    }
  };
  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Authentication Test</h2>
      
      {user && (
        <div style={{ padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '4px', marginBottom: '20px' }}>
          <strong>Current User:</strong> {user.email} (ID: {user.id})
        </div>
      )}
      
      <button 
        onClick={testLogin}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px'
        }}
      >
        Test Full Login Flow
      </button>
      
      <button 
        onClick={testDirectLogin}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test Direct Login
      </button>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        {result || 'Click a button to test authentication...'}
      </div>
    </div>
  );
};

export default TestLogin;
