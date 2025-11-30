import React, { useState } from "react";
import "../loginpage.css";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import NutriWellBrand from "./NutriWellBrand.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const UserLoginPageFixed = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (serverError) setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    setServerError('');
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Call the backend API
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || 'Invalid credentials');
        return;
      }      // Use AuthContext to set user
      await login({
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
        token: data.accessToken,
        profile: data.profile,
      });

      // Navigate to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      setServerError('Server error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="chillax-bg">
      <div className="login-container">
        {/* Left Side */}
        <div className="login-left">
          <div className="nutri-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
            <NutriWellBrand circleSize={56} fontSize={26} gap={8} />
          </div>
          <h2 className="nutriwell-left-heading">Welcome to NutriWell</h2>
          <p className="nutriwell-sub">Personalized nutrition, simplified.</p>
          <div className="zigzag-images">
            <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" alt="Food1" className="zigzag-img img1" />&nbsp;
            <img src="https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg" alt="Food2" className="zigzag-img img2" />&nbsp;
            <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061" alt="Food3" className="zigzag-img img3" />&nbsp;
            <img src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg" alt="Food4" className="zigzag-img img4" />&nbsp;
          </div>
        </div>
        
        {/* Right Side */}
        <div className="login-right">
          <div className="brand-row brand-row-right">
            <NutriWellBrand circleSize={28} fontSize={18} />
          </div>
          <h2 className="get-started-header">Get Started</h2>
          
          <form onSubmit={handleFormSubmit} className="login-form">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={formData.email} 
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={isSubmitting}
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
            
            <input 
              type="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={(e) => handleInputChange('password', e.target.value)}
              disabled={isSubmitting}
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
            
            {serverError && <div className="error-text">{serverError}</div>}
            
            <button 
              type="submit" 
              className="login-btn login-btn-center" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="signin-block">
            <div className="signin-text">Or continue with</div>
            <div className="signin-social">
              <FaGoogle className="social-icon" />
              <FaFacebook className="social-icon" />
            </div>
          </div>
          
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={() => navigate('/signup')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#b6b4fa',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPageFixed;
