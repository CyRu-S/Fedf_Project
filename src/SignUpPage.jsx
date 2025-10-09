import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PlantImage from '/Plant.jpg';
import NutriWellBrand from './components/NutriWellBrand';

/**
 * SignUpPage Component
 * A beautiful signup form with a split layout design
 * Left side: Form fields | Right side: Branding and plant image
 */
function SignUpPage() {
  const navigate = useNavigate();
  
  // State to store all form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    role: '',
    weight: '',
    height: '',
    primaryGoal: '',
  });

  // Handle input changes for all form fields
  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    
    // Add your form validation here if needed
    // Redirect to AccessPage (split screen) after registration
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '110vh',
        background: '#D0FFD3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Chillax, sans-serif',
      }}
    >
      {/* Background image with opacity */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/vf.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2,
          zIndex: 0,
        }}
      />
      {/* Background decorative circles - matching the image design */}
      {/* Top-left large circle with gradient */}
      {/* <Box
        sx={{
          position: 'absolute',
          top: -200,
          left: -200,
          width: 800,
          height: 1500,
          background: 'linear-gradient(150deg,rgb(18, 62, 12) 0%, #B8D9AF 100%)',
          borderRadius: '50%',
          opacity: 0.7,
        }}
      /> */}
      {/* Top-right large circle */}
      {/* <Box
        sx={{
          position: 'absolute',
          top: -150,
          right: -150,
          width: 500,
          height: 500,
          background: 'linear-gradient(180deg, #9ED098 0%,rgb(18, 62, 12) 100%)',
          borderRadius: '50%',
          opacity: 0.6,
        }}
      /> */}
      {/* Main card container */}
      <Paper
        elevation={10}
        sx={{
          maxWidth: 1250, // stretched width
          width: '100%',
          borderRadius: 6,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          position: 'relative',
          zIndex: 100,
        }}
      >
        {/* LEFT SIDE - Form Section */}
        <Box
          sx={{
            flex: 1,
            padding: { xs: 4, md: 6 },
            backgroundColor: 'white',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              marginBottom: 4,
              fontFamily: 'Chillax, sans-serif',
              fontSize: '42px',
            }}
          >
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <Box sx={{ marginBottom: 2.5 }}>
              <Typography
                sx={{
                  fontSize: '14px',
                  marginBottom: 1,
                  color: '#4a5568',
                  fontFamily: 'Chillax, sans-serif',
                }}
              >
                First Name
              </Typography>
              <TextField
                fullWidth
                value={formData.firstName}
                onChange={handleChange('firstName')}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    '& fieldset': { border: 'none' },
                  },
                }}
              />
            </Box>

            {/* Last Name */}
            <Box sx={{ marginBottom: 2.5 }}>
              <Typography
                sx={{
                  fontSize: '14px',
                  marginBottom: 1,
                  color: '#4a5568',
                  fontFamily: 'Chillax, sans-serif',
                }}
              >
                Last Name
              </Typography>
              <TextField
                fullWidth
                value={formData.lastName}
                onChange={handleChange('lastName')}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    '& fieldset': { border: 'none' },
                  },
                }}
              />
            </Box>

            {/* Email Address */}
            <Box sx={{ marginBottom: 2.5 }}>
              <Typography
                sx={{
                  fontSize: '14px',
                  marginBottom: 1,
                  color: '#4a5568',
                  fontFamily: 'Chillax, sans-serif',
                }}
              >
                Email Address
              </Typography>
              <TextField
                fullWidth
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    '& fieldset': { border: 'none' },
                  },
                }}
              />
            </Box>

            {/* Password and Confirm Password Row */}
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2.5 }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    marginBottom: 1,
                    color: '#4a5568',
                    fontFamily: 'Chillax, sans-serif',
                  }}
                >
                  Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  value={formData.password}
                  onChange={handleChange('password')}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f3f4f6',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    marginBottom: 1,
                    color: '#4a5568',
                    fontFamily: 'Chillax, sans-serif',
                  }}
                >
                  Confirm Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f3f4f6',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Age, Gender, Role Row */}
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2.5 }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    marginBottom: 1,
                    color: '#4a5568',
                    fontFamily: 'Chillax, sans-serif',
                  }}
                >
                  Age
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.age}
                  onChange={handleChange('age')}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f3f4f6',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    marginBottom: 1,
                    color: '#4a5568',
                    fontFamily: 'Chillax, sans-serif',
                  }}
                >
                  Gender
                </Typography>
                <TextField
                  fullWidth
                  select
                  value={formData.gender}
                  onChange={handleChange('gender')}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f3f4f6',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                    },
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    marginBottom: 1,
                    color: '#4a5568',
                    fontFamily: 'Chillax, sans-serif',
                  }}
                >
                  Role
                </Typography>
                <TextField
                  fullWidth
                  select
                  value={formData.role}
                  onChange={handleChange('role')}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f3f4f6',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                    },
                  }}
                >
                  <MenuItem value="nutritionist">Nutritionist</MenuItem>
                  <MenuItem value="trainer">User</MenuItem>
                </TextField>
              </Box>
            </Box>

            {/* Weight and Height Row */}
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2.5 }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    marginBottom: 1,
                    color: '#4a5568',
                    fontFamily: 'Chillax, sans-serif',
                  }}
                >
                  Weight (Kg)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.weight}
                  onChange={handleChange('weight')}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f3f4f6',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    marginBottom: 1,
                    color: '#4a5568',
                    fontFamily: 'Chillax, sans-serif',
                  }}
                >
                  Height (cm)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.height}
                  onChange={handleChange('height')}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f3f4f6',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Primary Goal */}
            <Box sx={{ marginBottom: 3 }}>
              <Typography
                sx={{
                  fontSize: '14px',
                  marginBottom: 1,
                  color: '#4a5568',
                  fontFamily: 'Chillax, sans-serif',
                }}
              >
                Primary Goal
              </Typography>
              <TextField
                fullWidth
                value={formData.primaryGoal}
                onChange={handleChange('primaryGoal')}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    '& fieldset': { border: 'none' },
                  },
                }}
              />
            </Box>

            {/* Register Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, gap: 2 }}>
              <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#6fb86d',
                color: 'white',
                borderRadius: 8,
                paddingX: 5,
                paddingY: 1.2,
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'Chillax, sans-serif',
                '&:hover': {
                backgroundColor: '#5fa85d',
                },
              }}
              >
              Register
              </Button>
            </Box>
            {/* Already have an account? */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#2d3748',
                  fontWeight: 400,
                  fontFamily: 'Chillax, sans-serif',
                }}
              >
                Already have an account?{' '}
                <Typography
                  component="span"
                  onClick={() => navigate('/')}
                  sx={{
                    color: '#6fb86d',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontFamily: 'Chillax, sans-serif',
                    fontWeight: 500,
                    '&:hover': { color: '#5fa85d' },
                  }}
                >
                  Login
                </Typography>
              </Typography>
            </Box>
            </form>
          </Box>

        {/* RIGHT SIDE - Branding and Image Section */}
        <Box
          sx={{
            flex: 1,
            position: 'relative',
            backgroundColor: '#faf9f8',
            backgroundImage: `url(${PlantImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          {/* Semi-transparent overlay for better text readability */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(250, 249, 248, 0.15)',
              zIndex: 1,
            }}
          />

          {/* Content container - positioned above overlay */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            {/* NutriWell Branding */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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

            {/* Tagline Text */}
            <Box sx={{ textAlign: 'left', marginTop: 3 }}>
              <Typography
                sx={{
                  fontSize: '26px',
                  lineHeight: 1.6,
                  color: '#2d3748',
                  fontWeight: 400,
                  fontFamily: 'Chillax, sans-serif',
                }}
              >
                Turning everyday
                <br />
                meals into
                <br />
                <Box
                  component="span"
                  sx={{
                    color: '#ABC25B',
                    fontWeight: 600,
                  }}
                >
                  balanced
                </Box>{' '}
                health.
              </Typography>
            </Box>

            {/* Spacer to push content to top and middle */}
            <Box sx={{ flex: 1 }} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default SignUpPage;
