import React from "react";
import { useNavigate } from 'react-router-dom';
import "../LoginPage.css";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import NutriWellBrand from "./NutriWellBrand.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/admin-dashboard');
  };
  return (
  <div className="chillax-bg">
    <div className="login-container">
      {/* Left Side */}
      <div className="login-left">
        <div className="nutri-logo">
          <NutriWellBrand circleSize={56} fontSize={26} gap={1.5} />
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
          <NutriWellBrand circleSize={28} fontSize={18} gap={1.5} />
        </div>
        <h2 className="get-started-header">Get Started</h2>
        <input type="text" placeholder="Name or Username" />
        <input type="password" placeholder="Password" />
        <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="MFA Code" aria-label="MFA Code" />
        <button className="login-btn login-btn-center" onClick={handleLogin}>Login</button>
        <div className="signin-block">
          <div className="signin-text">Sign in</div>
          <div className="signin-social">
            <FaGoogle className="social-icon" />
            <FaFacebook className="social-icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;