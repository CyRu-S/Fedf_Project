import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Button,
  LinearProgress,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  IconButton,
  TextField,
  Fade,
} from '@mui/material';
import {
  SearchRounded,
  SettingsRounded,
  CalendarToday,
  KeyboardArrowDown,
  Favorite,
  DirectionsRun,
  Spa,
  Check,
  WaterDrop,
  SelfImprovement,
  LocalFireDepartment,
  Cloud,
  Star,
  Nightlight,
  LocationOn,
  ChevronRight,
  TimerOutlined,
  CloseRounded, // added
} from '@mui/icons-material';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { motion, AnimatePresence, color } from 'framer-motion';
import AppSidebar from './components/AppSidebar';
import AppTopBar from './components/AppTopBar';
import { useNutrition } from './contexts/NutritionContext';
import { useAuth } from './contexts/AuthContext';

/**
 * DashboardPage Component
 * User dashboard with nutrition tracking, habits, and activity monitoring
 */
function DashboardPage() {
  const { user } = useAuth();
  const { 
    dailyStats, 
    waterIntake, 
    loggedFoods, 
    notificationStates,
    veggieCount,
    selectedPeriod,
    setSelectedPeriod 
  } = useNutrition();
  
  const [hoveredBar, setHoveredBar] = useState(null);

  // Dialog state for meditation and running
  const [meditationDialogOpen, setMeditationDialogOpen] = useState(false);
  const [runningDialogOpen, setRunningDialogOpen] = useState(false);

  // Meditation dialog options (removed guided + soundscapes per request)
  const [selectedMode, setSelectedMode] = useState('Stress Relief');
  const [meditationDuration, setMeditationDuration] = useState(10); // minutes target
  const [meditationPhase, setMeditationPhase] = useState('setup'); // 'setup' | 'active'

  // Timer states for running and meditation (in seconds)
  const [runningTimerTime, setRunningTimerTime] = useState(0);
  const [runningTimerRunning, setRunningTimerRunning] = useState(false);
  const [meditationTimerTime, setMeditationTimerTime] = useState(0);
  const [meditationTimerRunning, setMeditationTimerRunning] = useState(false);

  // Timer effects
  useEffect(() => {
    let interval;
    if (runningTimerRunning) {
      interval = setInterval(() => {
        setRunningTimerTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [runningTimerRunning]);

  useEffect(() => {
    let interval;
    if (meditationTimerRunning) {
      interval = setInterval(() => {
        setMeditationTimerTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [meditationTimerRunning]);

  // Time tracking state for meditation and running (in minutes)
  const [meditationTime, setMeditationTime] = useState(0); // accumulated completed minutes
  const [runningTime, setRunningTime] = useState(0);

  // Handlers to open dialogs
  const openMeditationDialog = () => { setMeditationDialogOpen(true); setMeditationPhase('setup'); };
  const closeMeditationDialog = () => {
    // If active session open, treat closing as ending session gracefully
    if (meditationPhase === 'active') {
      handleMeditationSessionEnd();
      return;
    }
    setMeditationDialogOpen(false);
  };

  const openRunningDialog = () => setRunningDialogOpen(true);
  const closeRunningDialog = () => {
    setRunningDialogOpen(false);
    setRunningTime(prev => prev + Math.floor(runningTimerTime / 60));
    setRunningTimerTime(0);
    setRunningTimerRunning(false);
  };

  // Meditation handlers
  const handleMeditationSessionStart = () => {
    setMeditationTimerTime(0);
    setMeditationTimerRunning(true);
    setMeditationPhase('active');
  };
  const handleMeditationStartPause = () => setMeditationTimerRunning(r => !r);
  const handleMeditationSessionEnd = () => {
    setMeditationTime(prev => prev + Math.floor(meditationTimerTime / 60));
    setMeditationTimerTime(0);
    setMeditationTimerRunning(false);
    setMeditationPhase('setup'); // stay open, return to setup
  };
  const handleMeditationReset = () => { setMeditationTimerTime(0); setMeditationTimerRunning(false); };

  // Auto-finish when reaching target duration
  useEffect(() => {
    if (meditationPhase === 'active' && meditationTimerTime >= meditationDuration * 60) {
      setMeditationTimerRunning(false);
      // brief visual completion before closing
      const t = setTimeout(() => handleMeditationSessionEnd(), 800);
      return () => clearTimeout(t);
    }
  }, [meditationTimerTime, meditationPhase, meditationDuration]);

  // Displayed meditation minutes (live) for habit card
  const displayedMeditationMinutes = meditationTime + Math.floor(meditationTimerTime / 60);
  // Displayed running minutes (live) for habit card
  const displayedRunningMinutes = runningTime + Math.floor(runningTimerTime / 60);

  // Timer handlers for running
  const handleRunningStartPause = () => setRunningTimerRunning(!runningTimerRunning);
  const handleRunningReset = () => {
    setRunningTimerTime(0);
    setRunningTimerRunning(false);
  };

  // Helper to get last N days as array of date strings
  const getLastNDays = (n) => {
    const days = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().slice(0, 10));
    }
    return days;
  };

  // Generate chart data based on selectedPeriod
  const generateChartData = () => {
    if (!Array.isArray(loggedFoods) || loggedFoods.length === 0) return [];

    if (selectedPeriod === 'month') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.map((month, index) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (11 - index));
        const monthKey = d.toISOString().slice(0, 7); // YYYY-MM
        const calories = loggedFoods
          .filter(food => typeof food.loggedAt === 'string' && food.loggedAt.startsWith(monthKey))
          .reduce((acc, food) => acc + (food.calories || 0), 0);
        return { month, calories };
      });
    } else if (selectedPeriod === 'week') {
      const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return weekDays.map((day, index) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - index));
        const dayKey = d.toISOString().slice(0, 10);
        const calories = loggedFoods
          .filter(food => typeof food.loggedAt === 'string' && food.loggedAt.startsWith(dayKey))
          .reduce((acc, food) => acc + (food.calories || 0), 0);
        return { day, calories };
      });
    }
    return [];
  };

  const chartData = generateChartData();

  // YAxis ticks and max based on period
  const yAxisConfig = {
    month: { ticks: [0, 15000, 30000, 45000, 60000], max: 60000 },
    week: { ticks: [0, 500, 1000, 1500, 2000], max: 2000 },
  };

  // Circular Progress Component
  const CircularProgress = ({ percentage, color, label, value, total, unit, pushTextDown }) => {
    const radius = 68; // compact size for side-by-side layout
    const strokeWidth = 11;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const cappedPercentage = percentage > 100 ? 100 : percentage;
    const excess = percentage > 100 ? percentage - 100 : 0;

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 0.5, minWidth: 150 }}>
        <Box sx={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
          <svg height={radius * 2} width={radius * 2} style={{ transform: 'rotate(-90deg)' }}>
            <circle
              stroke="#F3F4F6"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke={color}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              style={{ strokeDashoffset: circumference - (cappedPercentage / 100) * circumference, transition: 'stroke-dashoffset 0.5s ease' }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeLinecap="round"
            />
          </svg>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontFamily: 'Chillax, sans-serif' }}>
              {cappedPercentage}%
            </Typography>
            {excess > 0 && (
              <Typography sx={{ fontSize: '12px', color: '#16a34a', fontFamily: 'Chillax, sans-serif', mt: 0.5 }}>
                {'+' + excess}
              </Typography>
            )}
          </Box>
        </Box>
        <Typography sx={{ mt: 1, color: '#111827', fontSize: '14px', fontFamily: 'Chillax, sans-serif', textAlign: 'center', fontWeight: 600, marginTop: pushTextDown ? 4 : 1 }}>
          {label}
        </Typography>
        <Typography sx={{ mt: 0.3, fontSize: '12px', fontFamily: 'Chillax, sans-serif', textAlign: 'center', color: '#6b7280', marginTop: pushTextDown ? 0.5 : 0.3 }}>
          {value} / {total} {unit}
        </Typography>
      </Box>
    );
  };

  // Habit Card Component
  const HabitCard = ({ icon, title, progress, isCompleted, bgColor, sx = {} }) => {
    return (
      <Card
        sx={{
          backgroundColor: bgColor,
          p: 2,
          borderRadius: 3,
          border: 'none',
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          minWidth: 0,
          flexGrow: 1,
          ...sx, // Spread the sx prop to allow for custom styles
        }}
      >
        <Box sx={{ fontSize: '36px', mb: 0.75 }}>{icon}</Box>
        <Typography sx={{ textAlign: 'center', mb: 0.75, fontSize: '14px', fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>
          {title}
        </Typography>
        {isCompleted ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: '#16a34a',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Check sx={{ fontSize: 12, color: 'white' }} />
            </Box>
            <Typography sx={{ fontSize: '14px', color: '#16a34a', fontFamily: 'Chillax, sans-serif' }}>
              Completed
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ fontSize: '14px', color: '#6b7280', fontFamily: 'Chillax, sans-serif' }}>
            {progress}
          </Typography>
        )}
      </Card>
    );
  };

  // Activity Metric Component
  const ActivityMetric = ({ icon, label, value, bgColor }) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            backgroundColor: bgColor,
            width: 48,
            height: 48,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ color: '#6b7280', fontSize: '14px', mb: 0.5, fontFamily: 'Chillax, sans-serif' }}>
            {label}
          </Typography>
          <Typography sx={{ fontFamily: 'Chillax, sans-serif' }}>{value}</Typography>
        </Box>
      </Box>
    );
  };

  // Custom Tooltip for Chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'white',
            px: 2,
            py: 1,
            borderRadius: 2,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
          }}
        >
          <Typography sx={{ fontSize: '14px', fontFamily: 'Chillax, sans-serif' }}>
            {payload[0].value} cal
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const transitionSpring = { type: 'spring', stiffness: 260, damping: 28 };
  const fadeVariants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.4,0.0,0.2,1] } },
    exit: { opacity: 0, y: -12, filter: 'blur(4px)', transition: { duration: 0.3 } }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'Chillax, sans-serif' }}>
      <AppSidebar activeKey="dashboard" />

      {/* Main Content */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {/* Header */}
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

        {/* Dashboard Content */}
        <Box sx={{ px: 5, py: 2 }}>
          {/* Welcome Section */}
          <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ color: '#6b7280', fontSize: 18, mb: 1, fontFamily: 'Chillax, sans-serif' }}>
                Dashboard
              </Typography>
              <Typography variant="h3" sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>
                Welcome back, {user?.profile?.firstName || 'User'}!
              </Typography>
            </Box>
            </Box>

          {/* Activity Buttons */}
          <Box sx={{ mb: 3, display: 'flex', gap: 2, width: 'fit-content', marginLeft: 'auto' }}>
            <Button
              onClick={openRunningDialog}
              sx={{
                backgroundColor: '#e0dfff',
                borderRadius: 16,
                px: 2,
                py: 0.5,
                fontFamily: 'Chillax, sans-serif',
                fontWeight: 600,
                color: '#1a1a1a',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#cbb7ff' },
              }}
              startIcon={<DirectionsRun sx={{ fontSize: 16, color: '#fde11a' }} />}
            >
              Run 
            </Button>
            <Button
              onClick={openMeditationDialog}
              sx={{
                backgroundColor: '#e0dfff',
                borderRadius: 16,
                px: 2,
                py: 0.5,
                fontFamily: 'Chillax, sans-serif',
                fontWeight: 600,
                color: '#1a1a1a',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#cbb7ff' },
              }}
              startIcon={<SelfImprovement sx={{ fontSize: 16, color: '#8b5cf6' }} />}
            >
              Meditate
            </Button>
          </Box>

          {/* Grid Layout */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' }, gap: 3, mb: 3 }}>
            {/* Daily Nutrition Overview */}
            <Card
              sx={{
                backgroundColor: '#fff',
                p: 3,
                borderRadius: 6,
                border: 'none',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                background: 'linear-gradient(135deg,rgb(232, 253, 239) 0%, #ffffff 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6" sx={{ mb: 1.5, fontFamily: "'Chillax', sans-serif", fontWeight: 600, color: '#1a1a1a' }}>
                Daily Nutrition Overview
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                <CircularProgress 
                  percentage={Math.round((dailyStats.totalProtein / 75) * 100)} 
                  color="#cbb7ff" 
                  label="Protein" 
                  value={Math.round(dailyStats.totalProtein)} 
                  total={75} 
                  unit="grams" 
                  pushTextDown
                />
                <CircularProgress 
                  percentage={Math.round((dailyStats.totalFats / 50) * 100)} 
                  color="#7ef0ff" 
                  label="Fats" 
                  value={Math.round(dailyStats.totalFats)} 
                  total={50} 
                  unit="grams" 
                  pushTextDown 
                />
              </Box>
            </Card>

            {/* Calories Chart */}
            <Card
              sx={{
                backgroundColor: '#fff',
                p: 3,
                borderRadius: 6,
                border: 'none',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                background: 'linear-gradient(135deg, #fefce8 0%, #ffffff 100%)',
                gridColumn: { xs: '1', lg: 'span 2' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontFamily: "'Chillax', sans-serif", fontWeight: 600, color: '#1a1a1a' }}>
                  Calories
                </Typography>
                <Select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  sx={{
                    backgroundColor: '#e0dfff',
                    borderRadius: 16,
                    px: 1,
                    py: 0.05,
                    fontFamily: 'Chillax, sans-serif',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    '& .MuiSelect-icon': { color: '#1a1a1a' },
                  }}
                >
                  <MenuItem value="month">Month</MenuItem>
                  <MenuItem value="week">Week</MenuItem>
                </Select>
              </Box>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={chartData}
                  onMouseMove={(state) => {
                    if (state.isTooltipActive) {
                      setHoveredBar(state.activeTooltipIndex);
                    } else {
                      setHoveredBar(null);
                    }
                  }}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbb7ff" vertical={false} />
                  <XAxis
                    dataKey={selectedPeriod === 'month' ? 'month' : 'day'}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#1a1a1a', fontSize: 13, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#1a1a1a', fontSize: 13, fontWeight: 600 }}
                    ticks={yAxisConfig[selectedPeriod].ticks}
                    domain={[0, yAxisConfig[selectedPeriod].max]}
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="calories" radius={[10, 10, 0, 0]} maxBarSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          hoveredBar === index ? '#cbb7ff' : // Highlight hovered bar in purple
                          '#fde68a'
                        } 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Box>

          {/* Habit Tracker and Activity */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
          {/* Habit Tracker */}
          <Card
            sx={{
              backgroundColor: '#fff',
              p: 3,
              borderRadius: 6,
              border: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid rgba(0, 0, 0, 0.15)',
              background: 'linear-gradient(135deg,rgb(252, 245, 254) 0%, #ffffff 100%)',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h6" sx={{ mb: 1.5, fontFamily: "'Chillax', sans-serif", fontWeight: 600, color: '#1a1a1a' }}>
              Habit Tracker
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
                gap: 2,
                alignItems: 'stretch',
                height: '100%',
              }}
            >
              <HabitCard
                icon={<WaterDrop sx={{ fontSize: 48, color: '#0ea5e9' }} />}
                title="Drink 3L Water"
                progress={`${waterIntake.toFixed(1)} /3 Liter`}
                isCompleted={waterIntake >= 3}
                bgColor="#d9f9ff"
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              />
              <HabitCard
                icon={<DirectionsRun sx={{ fontSize: 48, color: '#fDE11A' }} />}
                title="Morning Run"
                progress={`${Math.round(displayedRunningMinutes)} min`}
                isCompleted={displayedRunningMinutes >= 30}
                bgColor="#ffffd9"
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              />
              <HabitCard
                icon={<SelfImprovement sx={{ fontSize: 48, color: '#8b5cf6' }} />}
                title="Meditate 10min"
                progress={`${displayedMeditationMinutes} /10 min`}
                isCompleted={displayedMeditationMinutes >= 10}
                bgColor="#f5f3ff"
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              />
              <HabitCard
                icon={<Spa sx={{ fontSize: 48, color: '#2ade80' }} />}
                title="Eat 5 Veggies"
                progress={`${veggieCount} / 5 Veggies`}
                isCompleted={veggieCount >= 5}
                bgColor="#e1fae5"
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              />
            </Box>
          </Card>
            <Card
              sx={{
                backgroundColor: '#fff',
                p: 3,
                borderRadius: 6,
                border: 'none',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontFamily: "'Chillax', sans-serif", fontWeight: 600, color: '#1a1a1a' }}>
                  Activity
                </Typography>
                <Button
                  sx={{
                    color: '#1a1a1a',
                    textTransform: 'none',
                    fontFamily: "'Chillax', sans-serif",
                    fontWeight: 500,
                    backgroundColor: '#e0dfff',
                    borderRadius: 12,
                    px: 2,
                    py: 0.5,
                    '&:hover': { backgroundColor: '#cbb7ff' },
                  }}
                  endIcon={<KeyboardArrowDown sx={{ fontSize: 16 }} />}
                >
                  Week
                </Button>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2.5, mb: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <ActivityMetric
                  icon={<Favorite sx={{ fontSize: 24, color: '#ef4444' }} />}
                  label="Heart rate"
                  value="130 bpm"
                  bgColor="#fee2e2"
                />
                <ActivityMetric
                  icon={<DirectionsRun sx={{ fontSize: 24, color: '#22c55e' }} />}
                  label="Total steps"
                  value="5500"
                  bgColor="#dcfce7"
                />
                <ActivityMetric
                  icon={<LocalFireDepartment sx={{ fontSize: 24, color: '#f97316' }} />}
                  label="Kcal burn"
                  value="503 kCal"
                  bgColor="#ffedd5"
                />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
                <Box>
                  <Typography sx={{ fontSize: '14px', color: '#1a1a1a', mb: 1, fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                    Move
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#e6e6f0',
                      '& .MuiLinearProgress-bar': { backgroundColor: '#ef4444', borderRadius: 5 },
                    }}
                  />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '14px', color: '#1a1a1a', mb: 1, fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                    Exercise
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={65}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#e6e6f0',
                      '& .MuiLinearProgress-bar': { backgroundColor: '#fde047', borderRadius: 5 },
                    }}
                  />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '14px', color: '#1a1a1a', mb: 1, fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                    Steps
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#e6e6f0',
                      '& .MuiLinearProgress-bar': { backgroundColor: '#22c55e', borderRadius: 5 },
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Timer Dialogs (fixed, unified dynamic sizing) */}
      <Dialog
        open={runningDialogOpen}
        onClose={(e, reason) => { if (reason === 'backdropClick') return; closeRunningDialog(); }}
        disableEscapeKeyDown
        maxWidth={false}
        PaperProps={{
          sx: {
            borderRadius: 6,
            boxShadow: '0 18px 60px rgba(0,0,0,0.15)',
            background: 'linear-gradient(135deg,#ffffff 0%, #ffffd9 100%)',
            overflow: 'hidden',
            transition: 'height .6s cubic-bezier(0.4,0,0.2,1), width .6s cubic-bezier(0.4,0,0.2,1)',
            width: (runningTimerRunning || runningTimerTime > 0) ? 560 : 420,
            maxWidth: (runningTimerRunning || runningTimerTime > 0) ? 560 : 420,
            height: (runningTimerRunning || runningTimerTime > 0) ? 580 : 420,
          }
        }}
      >
        <DialogContent sx={{ p: 4, pt: 3, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          <IconButton aria-label="close" onClick={closeRunningDialog} sx={{ position: 'absolute', top: 8, right: 8, color: '#6b7280', '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)', color: 'rgb(255, 0, 0)'} }}>
            <CloseRounded />
          </IconButton>
          <Typography variant="h5" sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 600, color: '#111827', textAlign: 'center', mb: 2, letterSpacing: '-0.5px' }}>Running Session</Typography>
          <Box sx={{ flex: 1, position: 'relative', display: 'flex' }}>
            <AnimatePresence mode="wait" initial={false}>
              {(runningTimerRunning || runningTimerTime > 0) ? (
                <motion.div key="run-active" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ flex: 1, display: 'flex' }}>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                      <Typography sx={{ fontFamily: 'Chillax, sans-serif', fontSize: 18, fontWeight: 500, color: '#fDE11A', mb: 1 }}>
                        {runningTimerRunning ? 'Running Active' : 'Paused'}
                      </Typography>
                      <Typography sx={{ fontFamily: 'Chillax, sans-serif', fontSize: 14, color: '#6b7280' }}>Keep your pace steady and breathe</Typography>
                    </Box>
                    <Box sx={{ position: 'relative', width: 200, height: 280, flexShrink: 0 }}>
                      <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                        <motion.circle
                          cx="50" cy="50" r="45" stroke="#fDE11A" strokeWidth="6" fill="none" strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 45}
                          animate={{ strokeDashoffset: (2 * Math.PI * 45) - (2 * Math.PI * 45) * ((runningTimerTime % (5 * 60)) / (5 * 60)) }}
                          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                        />
                      </svg>
                      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ fontFamily: 'Chillax, sans-serif', fontSize: 40, fontWeight: 600, color: '#111827', lineHeight: 1 }}>
                          {Math.floor(runningTimerTime / 60)}:{String(runningTimerTime % 60).padStart(2, '0')}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 'auto', width: '100%', display: 'flex', gap: 2, flexShrink: 0 }}>
                      <Button
                        onClick={handleRunningStartPause}
                        fullWidth
                        variant="outlined"
                        sx={{ borderColor: '#fDE11A', color: '#fDE11A', fontFamily: 'Chillax, sans-serif', fontWeight: 600, textTransform: 'none', py: 1.05, borderRadius: 20, '&:hover': { backgroundColor: '#ffffd9' } }}>
                        {runningTimerRunning ? 'Pause' : (runningTimerTime ? 'Resume' : 'Start')}
                      </Button>
                      <Button
                        onClick={handleRunningReset}
                        fullWidth
                        variant="contained"
                        sx={{ background: '#dc2626', '&:hover': { background: '#b91c1c' }, color: 'white', fontFamily: 'Chillax, sans-serif', fontWeight: 600, textTransform: 'none', py: 1.05, borderRadius: 20 }}>
                        Reset
                      </Button>
                    </Box>
                  </Box>
                </motion.div>
              ) : (
                <motion.div key="run-idle" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ flex: 1, display: 'flex' }}>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 3 }}>
                    <Box sx={{ width: 140, height: 140, borderRadius: 30, background: 'linear-gradient(135deg,#ffffd9 0%, #fefce8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DirectionsRun sx={{ fontSize: 80, color: '#fDE11A' }} />
                    </Box>
                    <Typography sx={{ fontFamily: 'Chillax, sans-serif', fontSize: 14, color: '#6b7280' }}>Start tracking your running session</Typography>
                    <Button variant="contained" onClick={handleRunningStartPause} sx={{ background: '#fDE11A', '&:hover': { background: '#fde047' }, color: '#111827', fontFamily: 'Chillax, sans-serif', fontWeight: 600, textTransform: 'none', px: 5, py: 1, borderRadius: 20 }}>Begin</Button>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={meditationDialogOpen}
        onClose={(e, reason) => { if (reason === 'backdropClick') return; closeMeditationDialog(); }}
        disableEscapeKeyDown
        maxWidth={false}
        PaperProps={{
          sx: {
            borderRadius: 6,
            boxShadow: '0 18px 60px rgba(0,0,0,0.15)',
            background: 'linear-gradient(135deg,#ffffff 0%, #ecfdf5 100%)', // updated gradient similar style
            overflow: 'hidden',
            transition: 'height .6s cubic-bezier(0.4,0,0.2,1), width .6s cubic-bezier(0.4,0,0.2,1)',
            width: meditationPhase === 'active' ? 560 : 420,
            maxWidth: meditationPhase === 'active' ? 560 : 420,
            height: meditationPhase === 'active' ? 560 : 420,
          }
        }}
      >
        <DialogContent sx={{ p: 4, pt: 3, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          <IconButton aria-label="close" onClick={closeMeditationDialog} sx={{ position: 'absolute', top: 8, right: 8, color: '#6b7280', '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)', color: 'rgb(255, 0, 0)'} }}>
            <CloseRounded />
          </IconButton>
          <Typography variant="h5" sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 600, color: '#111827', textAlign: 'center', mb: 2, letterSpacing: '-0.5px' }}>Mindful Moment</Typography>
          <Box sx={{ flex: 1, position: 'relative', display: 'flex' }}>
            <AnimatePresence mode="wait" initial={false}>
              {meditationPhase === 'active' ? (
                <motion.div key="med-active" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ flex: 1, display: 'flex' }}>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                      <Typography sx={{ fontFamily: 'Chillax, sans-serif', fontSize: 18, fontWeight: 500, color: '#059669', mb: 1 }}>{selectedMode}</Typography>
                      <Typography sx={{ fontFamily: 'Chillax, sans-serif', fontSize: 14, color: '#6b7280' }}>Breathe and stay present</Typography>
                    </Box>
                    <Box sx={{ position: 'relative', width: 200, height: 280, flexShrink: 0 }}>
                      <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                        <motion.circle cx="50" cy="50" r="45" stroke="#10b981" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray={2 * Math.PI * 45} animate={{ strokeDashoffset: (2 * Math.PI * 45) - (2 * Math.PI * 45) * (meditationTimerTime / (meditationDuration * 60)) }} transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }} />
                      </svg>
                      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ fontFamily: 'Chillax, sans-serif', fontSize: 36, fontWeight: 600, color: '#111827', lineHeight: 1 }}>{Math.floor(meditationTimerTime / 60)}:{String(meditationTimerTime % 60).padStart(2, '0')}</Typography>
                        <Typography sx={{ mt: 1, fontFamily: 'Chillax, sans-serif', fontSize: 12, letterSpacing: 1, color: '#6b7280' }}>of {String(meditationDuration).padStart(2, '0')}:00</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 'auto', width: '100%', display: 'flex', gap: 2, flexShrink: 0 }}>
                      <Button onClick={handleMeditationStartPause} fullWidth variant="outlined" sx={{ borderColor: '#10b981', color: '#059669', fontFamily: 'Chillax, sans-serif', fontWeight: 600, textTransform: 'none', py: 1.05, borderRadius: 20, '&:hover': { backgroundColor: '#ecfdf5' } }}>{meditationTimerRunning ? 'Pause' : 'Resume'}</Button>
                      <Button onClick={handleMeditationSessionEnd} fullWidth variant="contained" sx={{ background: '#dc2626', '&:hover': { background: '#b91c1c' }, color: 'white', fontFamily: 'Chillax, sans-serif', fontWeight: 600, textTransform: 'none', py: 1.05, borderRadius: 20 }}>Reset</Button>
                    </Box>
                  </Box>
                </motion.div>
              ) : (
                <motion.div key="med-setup" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ flex: 1, display: 'flex' }}>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 3 }}>
                    <Box sx={{ width: 140, height: 140, borderRadius: 30, background: 'linear-gradient(135deg,#ecfdf5 0%, #d1fae5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <SelfImprovement sx={{ fontSize: 80, color: '#10b981' }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Typography sx={{ fontFamily: 'Chillax, sans-serif', fontSize: 15, fontWeight: 500, color: '#111827' }}>Duration</Typography>
                      <Select value={meditationDuration} onChange={(e) => setMeditationDuration(e.target.value)} size="small" sx={{ backgroundColor: '#ffffff', fontFamily: 'Chillax, sans-serif', fontWeight: 500, borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981' }, minWidth: 100 }} renderValue={(val) => `${String(val).padStart(2, '0')}:00`}>
                        {[5, 10, 15, 20, 30].map(m => <MenuItem key={m} value={m}>{`${String(m).padStart(2, '0')}:00`}</MenuItem>)}
                      </Select>
                      <TimerOutlined sx={{ color: '#9ca3af', fontSize: 20 }} />
                    </Box>
                    <Button variant="contained" onClick={handleMeditationSessionStart} sx={{ background: 'linear-gradient(90deg,#10b981 0%, #059669 100%)', '&:hover': { background: 'linear-gradient(90deg,#059669 0%, #047857 100%)' }, color: 'white', fontFamily: 'Chillax, sans-serif', fontWeight: 600, textTransform: 'none', px: 5, py: 1.1, borderRadius: 20, boxShadow: '0 4px 14px rgba(16,185,129,0.35)' }}>Start</Button>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default DashboardPage;
