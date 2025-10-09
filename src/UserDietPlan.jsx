import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
  LinearProgress,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
} from '@mui/material';
import {
  Apps,
  DashboardOutlined,
  NotificationsNone,
  RemoveRedEye,
  Chat,
  ViewModule,
  Search,
  EmojiEmotions,
  CheckCircle,
  Schedule,
  CalendarToday,
  Restaurant,
  LocalDining,
  FreeBreakfast,
  ExpandMore,
  Download,
  Share,
  Feedback,
  Timer,
  TrendingUp,
  Assignment,
  Check,
  Close,
} from '@mui/icons-material';
import './UserDietPlanPage.css';
import AppSidebar from './components/AppSidebar';
import AppTopBar from './components/AppTopBar';
import { SearchRounded, SettingsRounded } from '@mui/icons-material';

const UserDietPlanPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [completedMeals, setCompletedMeals] = useState({});
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState({ rating: 0, comment: '' });
  const [progress] = useState({
    today: 65,
    week: 78,
    calories: 1450,
    targetCalories: 2000
  });

  // Mock user data
  const userData = {
    name: 'Cyrus Johnson',
    email: 'cyrus@email.com',
    avatar: '👨‍💻',
    nutritionist: 'Dr. Sarah Wilson',
    goal: 'Weight Loss',
    startDate: '2024-10-01',
    targetWeight: '70 kg',
    currentWeight: '75 kg'
  };

  // Mock diet plans data
  const dietPlans = [
    {
      id: 1,
      title: 'Weight Loss Plan - Week 1',
      status: 'active',
      startDate: '2024-10-07',
      endDate: '2024-10-14',
      nutritionist: 'Dr. Sarah Wilson',
      goal: 'Weight Loss',
      targetCalories: 2000,
      duration: '1 week',
      notes: 'Focus on portion control and regular meal timing. Drink plenty of water throughout the day.',
      meals: {
        breakfast: {
          foods: [
            { id: 1, name: 'Oatmeal with berries', calories: 300, quantity: '1 bowl', notes: 'Use almond milk', completed: true },
            { id: 2, name: 'Greek yogurt', calories: 150, quantity: '1 cup', notes: 'Plain, no sugar', completed: false }
          ],
          totalCalories: 450,
          notes: 'Eat between 7:00-8:00 AM. Add cinnamon for flavor.'
        },
        lunch: {
          foods: [
            { id: 3, name: 'Grilled chicken salad', calories: 400, quantity: '1 large bowl', notes: 'Light olive oil dressing', completed: false },
            { id: 4, name: 'Quinoa', calories: 200, quantity: '1/2 cup', notes: 'Cooked with herbs', completed: false }
          ],
          totalCalories: 600,
          notes: 'Eat between 12:00-1:00 PM. Include plenty of vegetables.'
        },
        dinner: {
          foods: [
            { id: 5, name: 'Grilled salmon', calories: 350, quantity: '150g', notes: 'With lemon and herbs', completed: false },
            { id: 6, name: 'Steamed broccoli', calories: 50, quantity: '1 cup', notes: 'Light seasoning', completed: false },
            { id: 7, name: 'Brown rice', calories: 150, quantity: '1/2 cup', notes: 'Well cooked', completed: false }
          ],
          totalCalories: 550,
          notes: 'Eat between 6:00-7:00 PM. Avoid eating 3 hours before bed.'
        }
      }
    },
    {
      id: 2,
      title: 'Weight Loss Plan - Week 2',
      status: 'upcoming',
      startDate: '2024-10-14',
      endDate: '2024-10-21',
      nutritionist: 'Dr. Sarah Wilson',
      goal: 'Weight Loss',
      targetCalories: 1950,
      duration: '1 week',
      notes: 'Slightly reduced calories with increased protein focus.',
      meals: {
        breakfast: {
          foods: [
            { id: 8, name: 'Protein smoothie', calories: 280, quantity: '1 glass', notes: 'Banana, spinach, protein powder' },
            { id: 9, name: 'Whole grain toast', calories: 120, quantity: '1 slice', notes: 'With avocado spread' }
          ],
          totalCalories: 400,
          notes: 'Drink smoothie first, then toast after 30 minutes.'
        },
        lunch: {
          foods: [
            { id: 10, name: 'Turkey sandwich', calories: 380, quantity: '1 sandwich', notes: 'Whole grain bread, lean turkey' },
            { id: 11, name: 'Mixed greens salad', calories: 100, quantity: '1 bowl', notes: 'Vinaigrette dressing' }
          ],
          totalCalories: 480,
          notes: 'Light lunch to balance dinner calories.'
        },
        dinner: {
          foods: [
            { id: 12, name: 'Lean beef stir-fry', calories: 420, quantity: '200g', notes: 'With mixed vegetables' },
            { id: 13, name: 'Cauliflower rice', calories: 25, quantity: '1 cup', notes: 'Low-carb alternative' }
          ],
          totalCalories: 445,
          notes: 'Higher protein dinner to support metabolism.'
        }
      }
    },
    {
      id: 3,
      title: 'Maintenance Plan - Week 3',
      status: 'completed',
      startDate: '2024-09-23',
      endDate: '2024-09-30',
      nutritionist: 'Dr. Sarah Wilson',
      goal: 'Maintenance',
      targetCalories: 2200,
      duration: '1 week',
      notes: 'Great progress! Maintained weight successfully.',
      feedback: {
        rating: 5,
        comment: 'Loved this plan! Felt energetic throughout the week.'
      },
      meals: {
        breakfast: {
          foods: [
            { id: 14, name: 'Scrambled eggs', calories: 200, quantity: '2 eggs', notes: 'With spinach', completed: true },
            { id: 15, name: 'Whole grain toast', calories: 160, quantity: '2 slices', notes: 'With butter', completed: true }
          ],
          totalCalories: 360,
          notes: 'Perfect breakfast combination.'
        },
        lunch: {
          foods: [
            { id: 16, name: 'Mediterranean bowl', calories: 500, quantity: '1 large bowl', notes: 'Chickpeas, feta, olives', completed: true }
          ],
          totalCalories: 500,
          notes: 'Balanced and satisfying.'
        },
        dinner: {
          foods: [
            { id: 17, name: 'Grilled chicken', calories: 300, quantity: '150g', notes: 'Herb seasoned', completed: true },
            { id: 18, name: 'Roasted vegetables', calories: 150, quantity: '1.5 cups', notes: 'Mixed seasonal vegetables', completed: true }
          ],
          totalCalories: 450,
          notes: 'Light but nutritious dinner.'
        }
      }
    }
  ];

  useEffect(() => {
    // Set the active plan as default
    const activePlan = dietPlans.find(plan => plan.status === 'active');
    if (activePlan) {
      setSelectedPlan(activePlan);
    }
  }, []);

  const handleMealComplete = (mealType, foodId) => {
    const key = `${selectedPlan.id}-${mealType}-${foodId}`;
    setCompletedMeals(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isMealCompleted = (mealType, foodId) => {
    const key = `${selectedPlan.id}-${mealType}-${foodId}`;
    return completedMeals[key] || false;
  };

  const getMealProgress = (meal) => {
    const totalFoods = meal.foods.length;
    const completedFoods = meal.foods.filter(food => 
      isMealCompleted(getCurrentMealType(meal), food.id)
    ).length;
    return (completedFoods / totalFoods) * 100;
  };

  const getCurrentMealType = (meal) => {
    if (selectedPlan && selectedPlan.meals) {
      return Object.keys(selectedPlan.meals).find(key => selectedPlan.meals[key] === meal);
    }
    return '';
  };

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', currentFeedback);
    setFeedbackDialog(false);
    setCurrentFeedback({ rating: 0, comment: '' });
    alert('Thank you for your feedback! 🙏');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'upcoming': return '#f59e0b';
      case 'completed': return '#6366f1';
      default: return '#8e8e93';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle />;
      case 'upcoming': return <Schedule />;
      case 'completed': return <Assignment />;
      default: return <Schedule />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'Chillax, sans-serif' }}>
      <AppSidebar activeKey="library" />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AppTopBar
          brandProps={{ circleSize: 36, fontSize: 22, gap: 3 }}
          rightIcons={[
            {
              Icon: SearchRounded,
              backgroundColor: '#efeafd',
              hoverBackgroundColor: '#e2d6ff',
              boxShadow: '0 4px 16px rgba(188, 173, 255, 0.25)',
              iconColor: '#8b8fb4',
            },
            {
              Icon: SettingsRounded,
              backgroundColor: '#fdf0c3',
              hoverBackgroundColor: '#fde7a2',
              iconColor: '#f2a516',
            },
          ]}
        />

        {/* Main Content (scrollable like other pages) */}
        <Box sx={{ flex: 1, overflow: 'auto', px: 5, py: 2 }}>
          {/* Header */}
          <Box sx={{ mb: 6 }}>
            <Typography sx={{ color: '#6b7280', fontSize: 18, mb: 1, fontFamily: 'Chillax, sans-serif' }}>
              Overview
            </Typography>
            <Typography variant="h3" sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>
              My Diet Plans
            </Typography>
            <Typography sx={{ color: '#6b7280', mt: 0.5, fontFamily: 'Chillax, sans-serif' }}>
              Track your personalized meal plans and progress
            </Typography>
          </Box>

          {/* Two-column layout matching other pages */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
              gap: 4,
              alignItems: 'stretch',
            }}
          >
            <Box>
              <Paper className="plans-overview-panel">
                <Box className="panel-header">
                  <Typography className="panel-title">Diet Plans Overview</Typography>
                  <Chip 
                    label={`Nutritionist: ${userData.nutritionist}`} 
                    className="nutritionist-chip"
                    avatar={<Avatar sx={{ width: 24, height: 24 }}>👩‍⚕️</Avatar>}
                  />
                </Box>

                {/* Progress Summary */}
                <Box className="progress-summary">
                  <Typography className="summary-title">Today's Progress</Typography>
                  <Box className="progress-stats">
                    <Box className="stat-item">
                      <Typography className="stat-label">Daily Progress</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={progress.today} 
                        className="progress-bar daily"
                      />
                      <Typography className="stat-value">{progress.today}%</Typography>
                    </Box>
                    <Box className="stat-item">
                      <Typography className="stat-label">Weekly Progress</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={progress.week} 
                        className="progress-bar weekly"
                      />
                      <Typography className="stat-value">{progress.week}%</Typography>
                    </Box>
                    <Box className="stat-item">
                      <Typography className="stat-label">Calories Today</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={(progress.calories / progress.targetCalories) * 100} 
                        className="progress-bar calories"
                      />
                      <Typography className="stat-value">{progress.calories} / {progress.targetCalories}</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Plans List */}
                <Box className="plans-list">
                  <Typography className="list-title">Available Plans</Typography>
                  {dietPlans.map((plan) => (
                    <Card 
                      key={plan.id} 
                      className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''} ${plan.status}`}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      <CardContent className="plan-card-content">
                        <Box className="plan-header">
                          <Box className="plan-title-section">
                            <Typography className="plan-title">{plan.title}</Typography>
                            <Typography className="plan-duration">{plan.duration}</Typography>
                          </Box>
                          <Chip 
                            label={plan.status} 
                            className={`status-chip ${plan.status}`}
                            icon={getStatusIcon(plan.status)}
                            sx={{ color: getStatusColor(plan.status) }}
                          />
                        </Box>
                        <Box className="plan-details">
                          <Typography className="plan-dates">
                            📅 {plan.startDate} - {plan.endDate}
                          </Typography>
                          <Typography className="plan-calories">
                            🔥 {plan.targetCalories} calories/day
                          </Typography>
                        </Box>
                        {plan.status === 'completed' && plan.feedback && (
                          <Box className="plan-feedback">
                            <Rating value={plan.feedback.rating} size="small" readOnly />
                            <Typography className="feedback-text">"{plan.feedback.comment}"</Typography>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Box>

                {/* Quick Actions */}
                <Box className="quick-actions">
                  <Button 
                    startIcon={<Download />} 
                    className="action-btn download"
                  >
                    Download Plan
                  </Button>
                  <Button 
                    startIcon={<Share />} 
                    className="action-btn share"
                  >
                    Share Progress
                  </Button>
                  <Button 
                    startIcon={<Feedback />} 
                    className="action-btn feedback"
                    onClick={() => setFeedbackDialog(true)}
                  >
                    Give Feedback
                  </Button>
                </Box>
              </Paper>
            </Box>

            <Box>
              <Paper className="plan-details-panel">
                {selectedPlan ? (
                  <>
                    <Box className="details-header">
                      <Typography className="details-title">{selectedPlan.title}</Typography>
                      <Box className="details-meta">
                        <Chip label={selectedPlan.goal} className="goal-chip" />
                        <Typography className="target-calories">
                          Target: {selectedPlan.targetCalories} cal/day
                        </Typography>
                      </Box>
                    </Box>

                    {selectedPlan.notes && (
                      <Alert severity="info" className="plan-notes">
                        <Typography className="notes-text">{selectedPlan.notes}</Typography>
                      </Alert>
                    )}

                    {/* Meal Tabs */}
                    <Tabs 
                      value={activeTab} 
                      onChange={(e, newValue) => setActiveTab(newValue)}
                      className="meal-tabs"
                    >
                      <Tab label="🍳 Breakfast" />
                      <Tab label="🍽️ Lunch" />
                      <Tab label="🍽️ Dinner" />
                    </Tabs>

                    {/* Meal Content */}
                    <Box className="meal-content">
                      {activeTab === 0 && (
                        <Box className="meal-section">
                          <Box className="meal-header">
                            <Typography className="meal-title">Breakfast</Typography>
                            <Typography className="meal-calories">
                              {selectedPlan.meals.breakfast.totalCalories} calories
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={getMealProgress(selectedPlan.meals.breakfast)} 
                              className="meal-progress"
                            />
                          </Box>

                          <Box className="foods-list">
                            {selectedPlan.meals.breakfast.foods.map((food) => (
                              <Box key={food.id} className="food-item">
                                <Box className="food-checkbox">
                                  <IconButton
                                    onClick={() => handleMealComplete('breakfast', food.id)}
                                    className={`check-btn ${isMealCompleted('breakfast', food.id) ? 'completed' : ''}`}
                                  >
                                    {isMealCompleted('breakfast', food.id) ? <Check /> : <Close />}
                                  </IconButton>
                                </Box>
                                <Box className="food-info">
                                  <Typography className={`food-name ${isMealCompleted('breakfast', food.id) ? 'completed' : ''}`}>
                                    {food.name}
                                  </Typography>
                                  <Typography className="food-details">
                                    {food.quantity} • {food.calories} cal
                                  </Typography>
                                  {food.notes && (
                                    <Typography className="food-notes">{food.notes}</Typography>
                                  )}
                                </Box>
                              </Box>
                            ))}
                          </Box>

                          {selectedPlan.meals.breakfast.notes && (
                            <Box className="meal-notes">
                              <Typography className="notes-title">💡 Tips:</Typography>
                              <Typography className="notes-text">{selectedPlan.meals.breakfast.notes}</Typography>
                            </Box>
                          )}
                        </Box>
                      )}

                      {activeTab === 1 && (
                        <Box className="meal-section">
                          <Box className="meal-header">
                            <Typography className="meal-title">Lunch</Typography>
                            <Typography className="meal-calories">
                              {selectedPlan.meals.lunch.totalCalories} calories
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={getMealProgress(selectedPlan.meals.lunch)} 
                              className="meal-progress"
                            />
                          </Box>

                          <Box className="foods-list">
                            {selectedPlan.meals.lunch.foods.map((food) => (
                              <Box key={food.id} className="food-item">
                                <Box className="food-checkbox">
                                  <IconButton
                                    onClick={() => handleMealComplete('lunch', food.id)}
                                    className={`check-btn ${isMealCompleted('lunch', food.id) ? 'completed' : ''}`}
                                  >
                                    {isMealCompleted('lunch', food.id) ? <Check /> : <Close />}
                                  </IconButton>
                                </Box>
                                <Box className="food-info">
                                  <Typography className={`food-name ${isMealCompleted('lunch', food.id) ? 'completed' : ''}`}>
                                    {food.name}
                                  </Typography>
                                  <Typography className="food-details">
                                    {food.quantity} • {food.calories} cal
                                  </Typography>
                                  {food.notes && (
                                    <Typography className="food-notes">{food.notes}</Typography>
                                  )}
                                </Box>
                              </Box>
                            ))}
                          </Box>

                          {selectedPlan.meals.lunch.notes && (
                            <Box className="meal-notes">
                              <Typography className="notes-title">💡 Tips:</Typography>
                              <Typography className="notes-text">{selectedPlan.meals.lunch.notes}</Typography>
                            </Box>
                          )}
                        </Box>
                      )}

                      {activeTab === 2 && (
                        <Box className="meal-section">
                          <Box className="meal-header">
                            <Typography className="meal-title">Dinner</Typography>
                            <Typography className="meal-calories">
                              {selectedPlan.meals.dinner.totalCalories} calories
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={getMealProgress(selectedPlan.meals.dinner)} 
                              className="meal-progress"
                            />
                          </Box>

                          <Box className="foods-list">
                            {selectedPlan.meals.dinner.foods.map((food) => (
                              <Box key={food.id} className="food-item">
                                <Box className="food-checkbox">
                                  <IconButton
                                    onClick={() => handleMealComplete('dinner', food.id)}
                                    className={`check-btn ${isMealCompleted('dinner', food.id) ? 'completed' : ''}`}
                                  >
                                    {isMealCompleted('dinner', food.id) ? <Check /> : <Close />}
                                  </IconButton>
                                </Box>
                                <Box className="food-info">
                                  <Typography className={`food-name ${isMealCompleted('dinner', food.id) ? 'completed' : ''}`}>
                                    {food.name}
                                  </Typography>
                                  <Typography className="food-details">
                                    {food.quantity} • {food.calories} cal
                                  </Typography>
                                  {food.notes && (
                                    <Typography className="food-notes">{food.notes}</Typography>
                                  )}
                                </Box>
                              </Box>
                            ))}
                          </Box>

                          {selectedPlan.meals.dinner.notes && (
                            <Box className="meal-notes">
                              <Typography className="notes-title">💡 Tips:</Typography>
                              <Typography className="notes-text">{selectedPlan.meals.dinner.notes}</Typography>
                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>
                  </>
                ) : (
                  <Box className="no-plan-selected">
                    <Restaurant className="empty-icon" />
                    <Typography className="empty-title">No Plan Selected</Typography>
                    <Typography className="empty-text">
                      Select a diet plan from the left panel to view details and track your progress.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
          </Box>
        </Box>

        {/* Feedback Dialog */}
        <Dialog open={feedbackDialog} onClose={() => setFeedbackDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontSize: '24px', fontFamily: 'Chillax', fontWeight: 700 }}>
            Share Your Feedback
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Typography className="feedback-label">How would you rate this plan?</Typography>
              <Rating
                value={currentFeedback.rating}
                onChange={(event, newValue) => setCurrentFeedback({...currentFeedback, rating: newValue})}
                size="large"
                sx={{ my: 2 }}
              />
              
              <TextField
                label="Comments (optional)"
                multiline
                rows={4}
                value={currentFeedback.comment}
                onChange={(e) => setCurrentFeedback({...currentFeedback, comment: e.target.value})}
                fullWidth
                sx={{ mt: 2 }}
                placeholder="Share your thoughts about this diet plan..."
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setFeedbackDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleFeedbackSubmit} 
              variant="contained"
              disabled={currentFeedback.rating === 0}
              sx={{ 
                background: '#b39ddb',
                '&:hover': { background: '#9c27b0' }
              }}
            >
              Submit Feedback
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default UserDietPlanPage;