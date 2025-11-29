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

  const [errors, setErrors] = useState({});

  // Handle input changes for all form fields
  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    // First/Last name: required, letters only
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email: basic pattern
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    // Password: min 8 chars, at least 1 letter and 1 number, match confirm
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must include a letter and a number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Age: required, 10–100
    const ageNum = Number(formData.age);
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (Number.isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
      newErrors.age = 'Enter a valid age between 10 and 100';
    }

    // Gender and Role: required
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }

    // Weight: required, positive
    const weightNum = Number(formData.weight);
    if (!formData.weight) {
      newErrors.weight = 'Weight is required';
    } else if (Number.isNaN(weightNum) || weightNum <= 0) {
      newErrors.weight = 'Enter a valid weight in kg';
    }

    // Height: required, positive
    const heightNum = Number(formData.height);
    if (!formData.height) {
      newErrors.height = 'Height is required';
    } else if (Number.isNaN(heightNum) || heightNum <= 0) {
      newErrors.height = 'Enter a valid height in cm';
    }

    // Primary goal: required
    if (!formData.primaryGoal.trim()) {
      newErrors.primaryGoal = 'Please enter your primary goal';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // prevent navigation if invalid
    }

    console.log('Form submitted:', formData);
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
                placeholder="Enter your first name"
                error={Boolean(errors.firstName)}
                helperText={errors.firstName || ''}
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
                placeholder="Enter your last name"
                error={Boolean(errors.lastName)}
                helperText={errors.lastName || ''}
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
                placeholder="you@example.com"
                error={Boolean(errors.email)}
                helperText={errors.email || ''}
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
                  placeholder="Create a strong password"
                  error={Boolean(errors.password)}
                  helperText={errors.password || ''}
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
                  placeholder="Re-enter your password"
                  error={Boolean(errors.confirmPassword)}
                  helperText={errors.confirmPassword || ''}
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
                  placeholder="e.g. 28"
                  error={Boolean(errors.age)}
                  helperText={errors.age || ''}
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
                  placeholder="Select gender"
                  error={Boolean(errors.gender)}
                  helperText={errors.gender || ''}
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
                  placeholder="Select role"
                  error={Boolean(errors.role)}
                  helperText={errors.role || ''}
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
                  placeholder="e.g. 70"
                  error={Boolean(errors.weight)}
                  helperText={errors.weight || ''}
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
                  placeholder="e.g. 172"
                  error={Boolean(errors.height)}
                  helperText={errors.height || ''}
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
                placeholder="e.g. Lose 5 kg in 3 months, build muscle, improve energy..."
                error={Boolean(errors.primaryGoal)}
                helperText={errors.primaryGoal || ''}
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
