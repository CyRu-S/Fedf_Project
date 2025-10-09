import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import NutriWellBrand from './components/NutriWellBrand';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

/*
 * AccessPage Component
 * Split screen design for Professional and User access
 * Left side: Professional Access (dark teal) | Right side: User Access (light blue)
 */
function AccessPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  // Handle login for different user types
  const handleLogin = async (type) => {
    try {
      console.log(`Login as ${type}`);
      // Create user data
      const userData = { 
        type, 
        name: type === 'professional' ? 'Professional' : 'User',
        email: `${type}@example.com`,
        id: Date.now() // Add a unique ID
      };
      
      console.log('Calling login with:', userData);
      
      // Call login and wait for it to complete
      await login(userData);
      
      console.log('Login successful, navigating to /dashboard');
      
      // Add a small delay to ensure state updates propagate
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Handle sign up - redirects to SignUpPage
  const handleSignUp = (type) => {
    console.log(`Sign up as ${type}`);
    navigate('/signup');
  };

  // Professional side - EXACT positions from the image
  const professionalFoods = [
    // Top area
    { img: '/Fruits and Vegies/Radish.svg', top: '21%', left: '10%', size: 65 },
    { img: '/Fruits and Vegies/Pear.svg', top: '18%', left: '32%', size: 70 },
    { img: '/Fruits and Vegies/Orange.svg', top: '20%', right: '35%', size: 80 },
    
    // Upper-middle area
    { img: '/Fruits and Vegies/Apple.svg', top: '35%', left: '25%', size: 55 },
    { img: '/Fruits and Vegies/Watermelon.svg', top: '35%', left: '40%', size: 90 },
    { img: '/Fruits and Vegies/SpringOnion.svg', top: '28%', right: '12%', size: 75 },
    { img: '/Fruits and Vegies/Grapes.svg', top: '45%', right: '32%', size: 100 },
    
    // Middle-left area
    { img: '/Fruits and Vegies/GreenVeggie.svg', top: '52%', left: '18%', size: 95 },
    
    // Middle-right area  
    { img: '/Fruits and Vegies/Carrot.svg', top: '45%', right: '15%', size: 80 },
    
    // Lower area
    { img: '/Fruits and Vegies/Orange1.svg', bottom: '22%', left: '12%', size: 70 },
    { img: '/Fruits and Vegies/Lemon.svg', bottom: '52%', left: '8%', size: 55 },
    { img: '/Fruits and Vegies/Banana.svg', bottom: '28%', left: '38%', size: 130 },
    { img: '/Fruits and Vegies/Strawberry.svg', bottom: '22%', right: '30%', size: 65 },
  ];

  // User side - EXACT positions from the image
  const userFoods = [
    // Top area
    { img: '/Fruits and Vegies/Lemon.svg', top: '22%', left: '15%', size: 65 },
    { img: '/Fruits and Vegies/BigGreenVeggie.svg', top: '15%', left: '38%', size: 120 },
    { img: '/Fruits and Vegies/Eggplant.svg', top: '25%', right: '20%', size: 85 },
    
    // Upper-middle area
    { img: '/Fruits and Vegies/Beetroot.svg', top: '32%', left: '25%', size: 80 },
    { img: '/Fruits and Vegies/Apple1.svg', top: '35%', right: '48%', size: 70 },
    { img: '/Fruits and Vegies/Tomato.svg', top: '38%', right: '30%', size: 60 },
    
    // Middle area
    { img: '/Fruits and Vegies/GreenCabbage.svg', top: '42%', left: '10%', size: 90 },
    { img: '/Fruits and Vegies/Orange.svg', top: '55%', left: '45%', size: 80 },
    { img: '/Fruits and Vegies/Cabbage.svg', top: '48%', right: '15%', size: 105 },
    
    // Lower area
    { img: '/Fruits and Vegies/SpringOnion.svg', bottom: '28%', left: '20%', size: 75 },
    { img: '/Fruits and Vegies/Radish1.svg', bottom: '25%', left: '42%', size: 90 },
    { img: '/Fruits and Vegies/RedChilli.svg', bottom: '18%', left: '30%', size: 55 },
    { img: '/Fruits and Vegies/Avocado.svg', bottom: '25%', right: '25%', size: 85 },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', fontFamily: 'Chillax, sans-serif' }}>
      {/* LEFT SIDE - Professional Access */}
      <Box
        sx={{
          flex: 1,
          background: 'linear-gradient(180deg, #1A5158 0%, #2F8983 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Navigation */}
        <Box
          sx={{
            position: 'absolute',
            top: 24,
            left: 24,
            zIndex: 10,
          }}
        >
          <NutriWellBrand
            circleSize={34}
            fontSize={18}
            fontWeight={600}
            fontFamily="'Chillax', sans-serif"
            textColor="#ffffff"
            primaryColor="#f1cc82"
            secondaryColor="#a7d8ff"
            gap={2}
          />
        </Box>

        {/* Scattered Food Images */}
        {professionalFoods.map((food, index) => (
          <Box
            key={`prof-${index}`}
            component="img"
            src={food.img}
            alt={`food-${index}`}
            sx={{
              position: 'absolute',
              maxWidth: food.size,
              height: 'auto',
              top: food.top,
              left: food.left,
              right: food.right,
              bottom: food.bottom,
              pointerEvents: 'none',
              userSelect: 'none',
              objectFit: 'contain',
            }}
          />
        ))}

        {/* Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            textAlign: 'center',
            px: 4,
            py: 8,
            zIndex: 5,
            position: 'relative',
          }}
        >
          {/* Top spacer */}
          <Box sx={{ flex: 1 }} />
          
          {/* Centered text */}
          <Box>
            <Typography
              variant="h3"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                fontFamily: 'Chillax, sans-serif',
                fontSize: '42px',
              }}
            >
              Professional Access
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '18px',
                fontFamily: 'Chillax, sans-serif',
              }}
            >
              Spot the gaps, build stronger lives.
            </Typography>
          </Box>

          {/* Bottom spacer pushes button down */}
          <Box sx={{ flex: 0.7 }} />

          {/* Button at bottom */}
          <Box>
            <Button
            onClick={() => handleLogin('professional')}
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: '#2d3748',
              borderRadius: 8,
              paddingX: 6,
              paddingY: 1.5,
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: 'Chillax, sans-serif',
              textTransform: 'none',
              mb: 4,
              '&:hover': {
                backgroundColor: '#f7fafc',
              },
            }}
          >
            Login
          </Button>

          <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'Chillax, sans-serif' }}>
            Don't have an account?{' '}
            <Typography
              component="span"
              onClick={() => handleSignUp('professional')}
              sx={{
                color: '#81e6d9',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: 'Chillax, sans-serif',
                '&:hover': { color: '#b2f5ea' },
              }}
            >
              Sign up
            </Typography>
          </Typography>
          </Box>
        </Box>
      </Box>

      {/* RIGHT SIDE - User Access */}
      <Box
        sx={{
          flex: 1,
          background: 'linear-gradient(135deg, #bfdbfe 0%, #ddd6fe 50%, #bfdbfe 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* NutriWell Logo */}
        <Box
          sx={{
            position: 'absolute',
            top: 32,
            right: 32,
            zIndex: 10,
          }}
        >
          <NutriWellBrand
            circleSize={28}
            fontSize={18}
            fontWeight={600}
            fontFamily="'Chillax', sans-serif"
            textColor="#4a5568"
            gap={1.5}
            primaryColor="#d8b4fe"
            secondaryColor="#fde68a"
          />
        </Box>

        {/* Scattered Food Images */}
        {userFoods.map((food, index) => (
          <Box
            key={`user-${index}`}
            component="img"
            src={food.img}
            alt={`food-${index}`}
            sx={{
              position: 'absolute',
              maxWidth: food.size,
              height: 'auto',
              top: food.top,
              left: food.left,
              right: food.right,
              bottom: food.bottom,
              pointerEvents: 'none',
              userSelect: 'none',
              objectFit: 'contain',
            }}
          />
        ))}

        {/* Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            textAlign: 'center',
            px: 4,
            py: 8,
            zIndex: 5,
            position: 'relative',
          }}
        >
          {/* Top spacer */}
          <Box sx={{ flex: 1 }} />
          
          {/* Centered text */}
          <Box>
            <Typography
              variant="h3"
              sx={{
                color: '#2d3748',
                fontWeight: 700,
                mb: 2,
                fontFamily: 'Chillax, sans-serif',
                fontSize: '42px',
              }}
            >
              User Access
            </Typography>
            <Typography
              sx={{
                color: '#4a5568',
                fontSize: '18px',
                fontFamily: 'Chillax, sans-serif',
              }}
            >
              Because every meal shapes tomorrow.
            </Typography>
          </Box>

          {/* Bottom spacer pushes button down */}
          <Box sx={{ flex: 0.7 }} />

          {/* Button at bottom */}
          <Box>
            <Button
            onClick={() => handleLogin('user')}
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: '#2d3748',
              borderRadius: 8,
              paddingX: 6,
              paddingY: 1.5,
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: 'Chillax, sans-serif',
              textTransform: 'none',
              mb: 4,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#f7fafc',
              },
            }}
          >
            Login
          </Button>

          <Typography sx={{ color: '#4a5568', fontFamily: 'Chillax, sans-serif' }}>
            Don't have an account?{' '}
            <Typography
              component="span"
              onClick={() => handleSignUp('user')}
              sx={{
                color: '#48bb78',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: 'Chillax, sans-serif',
                '&:hover': { color: '#68d391' },
              }}
            >
              Sign up
            </Typography>
          </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AccessPage;
