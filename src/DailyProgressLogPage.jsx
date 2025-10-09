import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Button,
  TextField,
  Chip,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  AccessTime,
  LocalDining,
  WaterDrop,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Delete as DeleteIcon,
  Add, // Adding the missing Add icon import
} from '@mui/icons-material';
import AppSidebar from './components/AppSidebar';
import AppTopBar from './components/AppTopBar';
import { useNutrition } from './contexts/NutritionContext';
/**
 * DailyProgressLogPage Component
 * Food logging and daily progress tracking page
 */
function DailyProgressLogPage() {
  const { loggedFoods, waterIntake, addFood, removeFood, updateWaterIntake } = useNutrition();
  const [selectedPortion, setSelectedPortion] = useState('Medium');
  const [timeInput, setTimeInput] = useState('');

  // Auto-detect meal type based on time
  const getMealTypeFromTime = (timeStr) => {
    if (!timeStr) return 'Snacks';
    
    const time = timeStr.toLowerCase();
    const hour = parseInt(timeStr.split(':')[0]);
    const isAM = time.includes('am');
    
    let adjustedHour = hour;
    if (!isAM && hour !== 12) adjustedHour += 12;
    if (isAM && hour === 12) adjustedHour = 0;
    
    if (adjustedHour >= 6 && adjustedHour < 11) return 'Breakfast';
    if (adjustedHour >= 11 && adjustedHour < 15) return 'Lunch';
    if (adjustedHour >= 15 && adjustedHour < 18) return 'Snacks';
    if (adjustedHour >= 18 && adjustedHour < 22) return 'Dinner';
    return 'Snacks';
  };

  const [suggestedMealType, setSuggestedMealType] = useState('Snacks');

  useEffect(() => {
    const mealType = getMealTypeFromTime(timeInput);
    setSuggestedMealType(mealType);
  }, [timeInput]);

  // Enhanced food database with accurate nutritional data
  const foodDatabase = [
    // Breakfast items
    { id: 1, name: 'Oats Porridge', image: '🥣', macros: 'Carbs, Fiber', calories: 150, protein: 5, fats: 3, carbs: 27, category: 'breakfast' },
    { id: 2, name: 'Avocado Toast', image: '🥑', macros: 'Fats, Carbs', calories: 220, protein: 8, fats: 12, carbs: 20, category: 'breakfast' },
    { id: 3, name: 'Egg Scramble', image: '🍳', macros: 'Protein, Fats', calories: 200, protein: 14, fats: 15, carbs: 2, category: 'breakfast' },
    { id: 4, name: 'Greek Yogurt', image: '🥛', macros: 'Protein, Fats', calories: 120, protein: 10, fats: 6, carbs: 8, category: 'breakfast' },
    { id: 5, name: 'Banana Smoothie', image: '🍌', macros: 'Carbs, Fiber', calories: 180, protein: 3, fats: 1, carbs: 45, category: 'breakfast' },
    
    // Lunch items
    { id: 6, name: 'Grilled Sandwich', image: '🥪', macros: 'Carbs, Protein', calories: 350, protein: 18, fats: 12, carbs: 35, category: 'lunch' },
    { id: 7, name: 'Paneer Butter Masala', image: '🍛', macros: 'Protein, Fats', calories: 420, protein: 16, fats: 28, carbs: 22, category: 'lunch' },
    { id: 8, name: 'Rice (Steamed)', image: '🍚', macros: 'Carbs', calories: 200, protein: 4, fats: 0.5, carbs: 45, category: 'lunch' },
    { id: 9, name: 'Chicken Stir-Fry', image: '🍗', macros: 'Protein, Carbs', calories: 320, protein: 25, fats: 8, carbs: 20, category: 'lunch' },
    { id: 10, name: 'Chana Masala', image: '🫘', macros: 'Protein, Carbs', calories: 250, protein: 12, fats: 6, carbs: 35, category: 'lunch' },
    
    // Dinner items
    { id: 11, name: 'Grilled Salmon', image: '🐟', macros: 'Protein, Fats', calories: 280, protein: 25, fats: 18, carbs: 0, category: 'dinner' },
    { id: 12, name: 'Quinoa Salad', image: '🥗', macros: 'Carbs, Protein', calories: 180, protein: 8, fats: 6, carbs: 25, category: 'dinner' },
    { id: 13, name: 'Green Salad', image: '🥬', macros: 'Fiber, Vitamins', calories: 80, protein: 3, fats: 2, carbs: 15, category: 'dinner' },
    
    // Snacks
    { id: 14, name: 'Mixed Nuts', image: '🥜', macros: 'Fats, Protein', calories: 160, protein: 6, fats: 14, carbs: 6, category: 'snacks' },
    { id: 15, name: 'Apple Slices', image: '🍎', macros: 'Carbs, Fiber', calories: 80, protein: 0.4, fats: 0.2, carbs: 21, category: 'snacks' },
    { id: 16, name: 'Trail Mix', image: '🥜', macros: 'Fats, Protein', calories: 200, protein: 8, fats: 16, carbs: 12, category: 'snacks' },
    { id: 17, name: 'Dark Chocolate', image: '🍫', macros: 'Fats, Carbs', calories: 150, protein: 2, fats: 9, carbs: 18, category: 'snacks' },

    // Vegetables
    { id: 18, name: 'Broccoli', image: '🥦', macros: 'Fiber, Vitamins', calories: 55, protein: 3.7, fats: 0.6, carbs: 11.2, category: 'vegetable' },
    { id: 19, name: 'Spinach', image: '🥬', macros: 'Iron, Vitamins', calories: 23, protein: 2.9, fats: 0.4, carbs: 3.6, category: 'vegetable' },
    { id: 20, name: 'Carrots', image: '🥕', macros: 'Vitamin A, Fiber', calories: 41, protein: 0.9, fats: 0.2, carbs: 9.6, category: 'vegetable' },
    { id: 21, name: 'Bell Peppers', image: '🫑', macros: 'Vitamin C, Fiber', calories: 24, protein: 0.9, fats: 0.3, carbs: 6, category: 'vegetable' },
    { id: 22, name: 'Tomatoes', image: '🍅', macros: 'Vitamin C, Lycopene', calories: 18, protein: 0.9, fats: 0.2, carbs: 3.9, category: 'vegetable' },
    { id: 23, name: 'Cucumber', image: '🥒', macros: 'Hydration, Fiber', calories: 15, protein: 0.7, fats: 0.1, carbs: 3.6, category: 'vegetable' },
    { id: 24, name: 'Zucchini', image: '🥒', macros: 'Low Cal, Fiber', calories: 17, protein: 1.2, fats: 0.3, carbs: 3.1, category: 'vegetable' },
    { id: 25, name: 'Cauliflower', image: '🥬', macros: 'Vitamin C, Fiber', calories: 25, protein: 1.9, fats: 0.3, carbs: 5, category: 'vegetable' },
  ];

  const portionOptions = ['Small', 'Medium', 'Large'];
  const mealTypes = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
  
  // Group logged foods by meal type
  const meals = mealTypes.reduce((acc, mealType) => {
    acc[mealType] = loggedFoods.filter(food => food.mealType === mealType);
    return acc;
  }, {});

  const handleAddWater = (amount) => {
    updateWaterIntake(amount);
  };

  const handleLogFood = (food) => {
    const currentTime = timeInput || new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    // Calculate portion multiplier
    const portionMultiplier = selectedPortion === 'Small' ? 0.7 : selectedPortion === 'Medium' ? 1 : 1.3;
    
    const newFood = {
      name: food.name,
      image: food.image,
      macroType: food.macros.split(',')[0].trim(),
      portion: selectedPortion,
      time: currentTime,
      mealType: suggestedMealType,
      category: food.category,
      calories: Math.round(food.calories * portionMultiplier),
      protein: Math.round(food.protein * portionMultiplier * 10) / 10, // Round to 1 decimal
      fats: Math.round(food.fats * portionMultiplier * 10) / 10,
      carbs: Math.round(food.carbs * portionMultiplier * 10) / 10,
    };
    addFood(newFood);
  };

  const handleRemoveFood = (id) => {
    removeFood(id);
  };

  const getWaterFillPercentage = () => {
    return (waterIntake / 3) * 100;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        fontFamily: "'Chillax', sans-serif",
        overflow: 'hidden',
      }}
    >
      <AppSidebar activeKey="library" />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <AppTopBar
          brandProps={{ circleSize: 36, fontSize: 22, gap: 3 }}
          rightIcons={[
            {
              Icon: SearchIcon,
              backgroundColor: '#efeafd',
              hoverBackgroundColor: '#e2d6ff',
              boxShadow: '0 4px 16px rgba(188, 173, 255, 0.25)',
              iconColor: '#8b8fb4',
            },
            {
              Icon: SettingsIcon,
              backgroundColor: '#fdf0c3',
              hoverBackgroundColor: '#fde7a2',
              iconColor: '#f2a516',
            },
          ]}
        />

        <Box sx={{ flex: 1, overflow: 'auto', px: 5, py: 2 }}>
          <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ color: '#6b7280', fontSize: 18, mb: 1, fontFamily: 'Chillax, sans-serif' }}>
                Settings
              </Typography>
              <Typography variant="h3" sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>
                Daily Progress Log
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr 1fr' }, gap: 4 }}>
            {/* Left Column - Logging Inputs */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Quick Log Card */}
              <Card
                sx={{
                  backgroundColor: 'white',
                  p: 4,
                  borderRadius: 6,
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  background: 'linear-gradient(135deg,rgb(252, 241, 255) 0%, #ffffff 100%)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <AccessTime sx={{ color: '#6366f1', fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 600, color: '#1f2937' }}>
                    Quick Log
                  </Typography>
                </Box>

                {/* Time Input */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 1.5, fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>
                    What time are you eating?
                  </Typography>
                  <TextField
                    placeholder="e.g., 9:35 AM"
                    value={timeInput}
                    onChange={(e) => setTimeInput(e.target.value)}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 4,
                        fontSize: '14px',
                        fontFamily: 'Chillax, sans-serif',
                        backgroundColor: '#f9fafb',
                        '&:hover': { backgroundColor: '#f3f4f6' },
                      },
                    }}
                  />
                  {timeInput && (
                    <Box sx={{ mt: 1, p: 2, backgroundColor: '#f0f9ff', borderRadius: 3, border: '1px solid #e0f2fe' }}>
                      <Typography sx={{ fontSize: '12px', color: '#0369a1', fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>
                        💡 Suggested meal: <strong>{suggestedMealType}</strong>
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Serving Portion */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 1.5, fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>
                    Portion Size
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {portionOptions.map((portion) => (
                      <Button
                        key={portion}
                        variant={selectedPortion === portion ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() => setSelectedPortion(portion)}
                        sx={{
                          borderRadius: 6,
                          textTransform: 'none',
                          fontFamily: 'Chillax, sans-serif',
                          fontSize: '12px',
                          px: 3,
                          py: 1,
                          backgroundColor: selectedPortion === portion ? '#6366f1' : 'transparent',
                          borderColor: selectedPortion === portion ? '#6366f1' : '#e5e7eb',
                          color: selectedPortion === portion ? 'white' : '#374151',
                          fontWeight: selectedPortion === portion ? 600 : 400,
                          '&:hover': {
                            backgroundColor: selectedPortion === portion ? '#4f46e5' : '#f9fafb',
                            borderColor: selectedPortion === portion ? '#4f46e5' : '#e5e7eb',
                          },
                        }}
                      >
                        {portion}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </Card>

              {/* Water Intake Card */}
              <Card
                sx={{
                  backgroundColor: 'white',
                  p: 4,
                  borderRadius: 6,
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
                  height: 'fit-content',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <WaterDrop sx={{ color: '#0ea5e9', fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 600, color: '#1f2937' }}>
                    Water Intake
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                  {/* Water Glass Visual */}
                  <Box
                    sx={{
                      width: 80,
                      height: 120,
                      border: '3px solid #e0f2fe',
                      borderRadius: '0 0 20px 20px',
                      position: 'relative',
                      backgroundColor: '#f8fafc',
                      overflow: 'hidden',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    {/* Water Fill */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: `${getWaterFillPercentage()}%`,
                        background: 'linear-gradient(180deg, #0ea5e9 0%, #0284c7 100%)',
                        borderRadius: '0 0 21px 21px',
                        transition: 'height 0.5s ease',
                      }}
                    />
                    {/* Bubbles */}
                    {[25, 35, 45, 55].map((top, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: 'absolute',
                          top: `${top}%`,
                          left: `${25 + index * 15}%`,
                          width: `${2 + index}px`,
                          height: `${2 + index}px`,
                          backgroundColor: 'rgba(255,255,255,0.7)',
                          borderRadius: '50%',
                        }}
                      />
                    ))}
                  </Box>
                  
                  <Typography sx={{ mt: 3, fontSize: '16px', fontFamily: 'Chillax, sans-serif', fontWeight: 600, color: '#1f2937' }}>
                    {waterIntake.toFixed(1)} / 3.0 Liters
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#6b7280', fontFamily: 'Chillax, sans-serif' }}>
                    {Math.round((waterIntake / 3) * 100)}% of daily goal
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAddWater(0.25)}
                    sx={{
                      borderRadius: 6,
                      textTransform: 'none',
                      fontFamily: 'Chillax, sans-serif',
                      fontSize: '12px',
                      px: 3,
                      py: 1,
                      backgroundColor: '#0ea5e9',
                      fontWeight: 600,
                      '&:hover': { backgroundColor: '#0284c7' },
                    }}
                  >
                    + 250 ml
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAddWater(0.5)}
                    sx={{
                      borderRadius: 6,
                      textTransform: 'none',
                      fontFamily: 'Chillax, sans-serif',
                      fontSize: '12px',
                      px: 3,
                      py: 1,
                      backgroundColor: '#0ea5e9',
                      fontWeight: 600,
                      '&:hover': { backgroundColor: '#0284c7' },
                    }}
                  >
                    + 500 ml
                  </Button>
                </Box>
              </Card>
            </Box>

            {/* Middle Column - Food Database */}
            <Card
              sx={{
                backgroundColor: 'white',
                p: 4,
                borderRadius: 6,
                border: 'none',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                background: 'linear-gradient(135deg, #fefce8 0%, #ffffff 100%)',
                height: 'fit-content',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <LocalDining sx={{ color: '#eab308', fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 600, color: '#1f2937' }}>
                  Food Database
                </Typography>
              </Box>
              
              <Box sx={{ maxHeight: 600, overflowY: 'auto', pr: 1 }}>
                {foodDatabase.map((food) => (
                  <Box
                    key={food.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      p: 3,
                      borderRadius: 4,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      border: '1px solid transparent',
                      '&:hover': { 
                        backgroundColor: '#fefce8',
                        borderColor: '#eab308',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 2px 8px rgba(234, 179, 8, 0.15)',
                      },
                      mb: 2,
                    }}
                    onClick={() => handleLogFood(food)}
                  >
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: '#fef3c7',
                        fontSize: '24px',
                        border: '2px solid #fde047',
                      }}
                    >
                      {food.image}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 600, fontSize: '15px', color: '#1f2937' }}>
                        {food.name}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: '#6b7280', fontFamily: 'Chillax, sans-serif', mb: 0.5 }}>
                        {food.macros}
                      </Typography>
                      <Typography sx={{ fontSize: '11px', color: '#eab308', fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>
                        {food.calories} cal
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      sx={{
                        minWidth: 'auto',
                        px: 2,
                        py: 1,
                        borderRadius: 4,
                        textTransform: 'none',
                        fontFamily: 'Chillax, sans-serif',
                        fontSize: '12px',
                        backgroundColor: '#eab308',
                        color: 'white',
                        fontWeight: 600,
                        '&:hover': { backgroundColor: '#ca8a04' },
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                ))}
              </Box>
            </Card>

            {/* Right Column - Logged Details */}
            <Card
              sx={{
                backgroundColor: 'white',
                p: 4,
                borderRadius: 6,
                border: 'none',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
                height: 'fit-content',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Add sx={{ color: '#22c55e', fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 600, color: '#1f2937' }}>
                  Logged Details
                </Typography>
              </Box>
              
              <Box sx={{ maxHeight: 600, overflowY: 'auto', pr: 1 }}>
{loggedFoods.length === 0 ? (
  <Box sx={{ textAlign: 'center', py: 4 }}>
    <Typography sx={{ color: '#6b7280', fontFamily: 'Chillax, sans-serif', fontSize: '14px' }}>
      No food logged yet
    </Typography>
    <Typography sx={{ color: '#9ca3af', fontFamily: 'Chillax, sans-serif', fontSize: '12px', mt: 1 }}>
      Click on food items to add them
    </Typography>
  </Box>
) : (
  <Box sx={{ width: '100%' }}>
    {Object.entries(meals).map(([mealType, foods]) => (
      foods.length > 0 && (
        <Box key={mealType} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ 
            color: '#4b5563',
            fontSize: '1.125rem',
            fontWeight: 600,
            mb: 2,
            fontFamily: 'Chillax, sans-serif'
          }}>
            {mealType}
          </Typography>
          {foods.map((food) => (
            <Box
              key={food.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 3,
                mb: 2,
                borderRadius: 4,
                border: '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': { 
                  backgroundColor: '#f0fdf4',
                  borderColor: '#16a34a',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 8px rgba(22, 163, 74, 0.15)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  bgcolor: '#dcfce7', 
                  borderRadius: 4, 
                  border: '2px solid #86efac',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  {food.image || '🍽️'}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontFamily: 'Chillax, sans-serif', fontSize: '15px', color: '#166534' }}>
                    {food.name}
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#4ade80', fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>
                    {food.calories} cal • {food.portion} • {food.time || new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                  </Typography>
                </Box>
              </Box>
              <Button
                onClick={() => handleRemoveFood(food.id)}
                size="small"
                sx={{
                  minWidth: 'auto',
                  px: 2,
                  py: 1,
                  borderRadius: 4,
                  textTransform: 'none',
                  fontFamily: 'Chillax, sans-serif',
                  fontSize: '14px',
                  backgroundColor: '#4ade80',
                  color: 'white',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: '#22c55e' },
                }}
              >
                -
              </Button>
            </Box>
          ))}
        </Box>
      )
    ))}
  </Box>
)}
              </Box>
            </Card>

            
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DailyProgressLogPage;
