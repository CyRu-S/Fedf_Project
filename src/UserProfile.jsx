import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Switch,
  Avatar,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  FitnessCenter,
  Star,
  School,
  EmojiEvents,
  MenuBook,
} from "@mui/icons-material";
import AppSidebar from './components/AppSidebar';
import AppTopBar from './components/AppTopBar';
import { SearchRounded, SettingsRounded } from '@mui/icons-material';
import './UserProfile.css';
import { styled } from '@mui/material/styles';

const UserProfile = () => {
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);  const [diet, setDiet] = useState({
    vegan: true,
    glutenFree: true,
    noRedMeat: true,
    dairyFree: false,
    vegetarian: false,
  });

  const handleToggle = (key) => {
    setDiet((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateBMI = () => {
    if (!weight || weight <= 0) return;
    const heightM = 1.8796; // 6'2" in meters
    const calculatedBMI = parseFloat(weight) / (heightM * heightM);
    setBmi(calculatedBMI.toFixed(1));
  };

  const getBMIStatus = () => {
    if (!bmi) return "Enter weight to calculate";
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue <= 24.9) return "Healthy";
    if (bmiValue <= 29.9) return "Overweight";
    return "Obese";
  };

  const getBMIColor = () => {
    if (!bmi) return "#8e8e93";
    const bmiValue = parseFloat(bmi);
    if (bmiValue >= 18.5 && bmiValue <= 24.9) return "#34c759";
    return "#ff3b30";
  };

  // Dynamic Calendar
  const getCurrentCalendar = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const calendar = [];
    let date = 1;
    
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push("");
        } else if (date > daysInMonth) {
          week.push("");
        } else {
          week.push(date);
          date++;
        }
      }
      calendar.push(week);
    }
    
    return { calendar, today, month, year };
  };

  const { calendar, today, month, year } = getCurrentCalendar();

  // Appointments state (dialogs, no inline controls)
  const [appointments, setAppointments] = useState([]); // [{ day, note }]
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentNote, setAppointmentNote] = useState('');
  const [removeDate, setRemoveDate] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

  const addAppointment = () => {
    if (!appointmentDate) return;
    const d = new Date(appointmentDate);
    if (Number.isNaN(d.getTime())) return;
    if (d.getMonth() !== month || d.getFullYear() !== year) {
      // ignore if not current month/year
      setAddDialogOpen(false);
      setAppointmentDate('');
      setAppointmentNote('');
      return;
    }
    const day = d.getDate();
    setAppointments(prev => prev.some(a => a.day === day) ? prev : [...prev, { day, note: appointmentNote.trim() }]);
    setAddDialogOpen(false);
    setAppointmentDate('');
    setAppointmentNote('');
  };

  const removeAppointment = () => {
    if (!removeDate) return;
    const d = new Date(removeDate);
    if (Number.isNaN(d.getTime())) return;
    const day = d.getDate();
    setAppointments(prev => prev.filter(a => a.day !== day));
    setRemoveDialogOpen(false);
    setRemoveDate('');
  };

  // New: Styled switch similar to NotificationSettings.jsx
  const PurpleSwitch = styled(Switch)(({ theme }) => ({
    width: 58,
    height: 32,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 4,
      transition: theme.transitions.create(['transform', 'background-color'], {
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }),
      '&.Mui-checked': {
        transform: 'translateX(26px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#a78bfa',
          opacity: 1,
          transition: theme.transitions.create(['background-color', 'opacity'], {
            duration: 500,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }),
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#a78bfa',
        border: '6px solid #fff',
      },
    },
    '& .MuiSwitch-thumb': {
      width: 24,
      height: 24,
      boxShadow: 'none',
      transition: theme.transitions.create(['transform', 'box-shadow'], {
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16,
      backgroundColor: '#d5d9e5',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'opacity'], {
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }),
    },
  }));

  // New: Circular progress similar to DashboardPage.jsx
  const CircularProgress = ({ percentage = 85, color = '#10b981', label = 'Overall Wellness', valueText = '85 %' }) => {
    const radius = 68;
    const strokeWidth = 11;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const cappedPercentage = Math.min(100, Math.max(0, percentage));

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 0.5 }}>
        <Box sx={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
          <svg height={radius * 2} width={radius * 2} style={{ transform: 'rotate(-90deg)' }}>
            <circle stroke="#F3F4F6" fill="transparent" strokeWidth={strokeWidth} r={normalizedRadius} cx={radius} cy={radius} />
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
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h5" sx={{ fontFamily: 'Chillax, sans-serif' }}>{valueText}</Typography>
          </Box>
        </Box>
        <Typography sx={{ mt: 1, color: '#111827', fontSize: '14px', fontFamily: 'Chillax, sans-serif', textAlign: 'center', fontWeight: 600 }}>{label}</Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'Chillax, sans-serif' }}>
      <AppSidebar activeKey="profile" />
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
        
        {/* Main content area */}
        <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          {/* Header with title and subtitle */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', px: 5, pt: 3, pb: 2 }}>
            <Typography variant="h3" sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>
                User Profile
            </Typography>
            <Typography sx={{ fontFamily: 'Chillax, sans-serif', fontSize: 16, color: '#6b7280', fontWeight: 500, mt: 1 }}>
              Personal Health Information
            </Typography>
          </Box>          {/* Layout matching the image exactly */}
          <Box sx={{ px: 5, pb: 4, flex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '280px 1fr 360px' }, gap: 3, alignItems: 'stretch' }}>            {/* Left column: Profile stretched to bottom */}
            <Box sx={{ gridColumn: { xs: '1', lg: '1' }, gridRow: '1 / -1', alignSelf: 'stretch' }}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 6, backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid rgba(0, 0, 0, 0.15)', background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ width: 100, height: 100, bgcolor: '#cbb7ff', color: '#111827', fontWeight: 700, fontSize: 34 }}>JS</Avatar>
                  <Typography sx={{ fontWeight: 700, fontSize: 18, mt: 1 }}>John Smith</Typography>
                  <Typography sx={{ color: '#6b7280', fontSize: 13 }}>Wellness Enthusiast</Typography>
                  <Box sx={{ height: 1, width: '100%', background: '#e5e7eb', my: 2 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%' }}>
                    <Button variant="text" sx={{ justifyContent: 'flex-start', color: '#1a1a1a', textTransform: 'none', fontWeight: 600, fontSize: 14 }}>📋 Profile</Button>
                    <Button variant="text" sx={{ justifyContent: 'flex-start', color: '#1a1a1a', textTransform: 'none', fontWeight: 600, fontSize: 14 }}>🏃 Habits</Button>
                  </Box>
                </Box>
              </Paper>
            </Box>

            {/* Middle column: make it a vertical stack, keep cards in same logical column */}
            <Box sx={{ gridColumn: { xs: '1', lg: '2' }, display: 'flex', flexDirection: 'column', gap: 2.5, alignSelf: 'stretch' }}>
              {/* Row 1: Info + Dietary in same row, equal height */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, alignItems: 'stretch' }}>
                {/* Info Card (unchanged content) */}
                {/* just ensure display:flex so it stretches nicely */}
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: 6, backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid rgba(0, 0, 0, 0.15)', background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)', display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontFamily: 'Chillax', fontSize: 20, fontWeight: 600, color: '#1a1a1a', mb: 2 }}>Info</Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 1.25, columnGap: 2 }}>
                    <Typography sx={{ color: '#6b7280' }}>Gender</Typography>
                    <Typography sx={{ fontWeight: 600 }}>Male</Typography>
                    <Typography sx={{ color: '#6b7280' }}>Age</Typography>
                    <Typography sx={{ fontWeight: 600 }}>32</Typography>
                    <Typography sx={{ color: '#6b7280' }}>Language</Typography>
                    <Typography sx={{ fontWeight: 600 }}>English</Typography>
                    <Typography sx={{ color: '#6b7280' }}>Height</Typography>
                    <Typography sx={{ fontWeight: 600 }}>6'2</Typography>
                  </Box>
                </Paper>

                {/* Dietary Preferences Card (unchanged content) */}
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: 6, backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid rgba(0, 0, 0, 0.15)', background: 'linear-gradient(135deg, #fefce8 0%, #ffffff 100%)', display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontFamily: 'Chillax', fontSize: 20, fontWeight: 600, color: '#1a1a1a', mb: 2 }}>Dietary Preferences</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography>Vegan</Typography>
                      <PurpleSwitch size="medium" checked={diet.vegan} onChange={() => handleToggle('vegan')} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography>Gluten Free</Typography>
                      <PurpleSwitch size="medium" checked={diet.glutenFree} onChange={() => handleToggle('glutenFree')} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography>No Red Meat</Typography>
                      <PurpleSwitch size="medium" checked={diet.noRedMeat} onChange={() => handleToggle('noRedMeat')} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography>Dairy Free</Typography>
                      <PurpleSwitch size="medium" checked={diet.dairyFree} onChange={() => handleToggle('dairyFree')} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography>Vegetarian</Typography>
                      <PurpleSwitch size="medium" checked={diet.vegetarian} onChange={() => handleToggle('vegetarian')} />
                    </Box>
                  </Box>
                </Paper>
              </Box>

              {/* Row 2: BMI + Achievements in same row, with Bio only under BMI side */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, alignItems: 'stretch' }}>
                {/* Left: BMI + User Bio stacked */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.0 }}>
                  {/* BMI Card (unchanged content) */}
                  <Paper elevation={0} sx={{ p: 2.5, borderRadius: 6, backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid rgba(0, 0, 0, 0.15)', background: 'linear-gradient(135deg, #fcf5fe 0%, #ffffff 100%)', display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontFamily: 'Chillax', fontSize: 18, fontWeight: 600, color: '#1a1a1a', mb: 1.5 }}>Calculate your BMI</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField size="small" placeholder="Enter your weight" value={weight} onChange={(e) => setWeight(e.target.value)} type="number" sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#f9fafb' } }} />
                      <Button variant="contained" onClick={calculateBMI} disabled={!weight} sx={{ backgroundColor: '#6366f1', textTransform: 'none', fontWeight: 700 }}>Submit</Button>
                    </Box>
                    <Box sx={{ mt: 1.25, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography sx={{ color: '#6b7280', fontSize: 13 }}>Your Current BMI :</Typography>
                      <Typography sx={{ fontWeight: 700, color: getBMIColor(), fontSize: 14 }}>{bmi ? `${bmi} (${getBMIStatus()})` : getBMIStatus()}</Typography>
                    </Box>
                  </Paper>

                  {/* User Bio Card: ONLY under BMI column */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 6,
                      backgroundColor: '#fff',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                      border: '1px solid rgba(0, 0, 0, 0.15)',
                      background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
                    }}
                  >
                    <Typography sx={{ fontFamily: 'Chillax', fontSize: 20, fontWeight: 600, color: '#1a1a1a', mb: 1.5 }}>User Bio</Typography>
                    <Typography sx={{ color: '#374151', fontSize: 14 }}>
                      Passionate health enthusiast focused on balanced nutrition, daily workouts, and mindful living. Loves meal-prepping, tracking macros, and exploring evidence-based wellness tips to boost energy and longevity.
                    </Typography>
                  </Paper>
                </Box>

                {/* Right: Achievements fills full height of its column */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 6,
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0, 0, 0, 0.15)',
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                  }}
                >
                  <Typography sx={{ fontFamily: 'Chillax', fontSize: 20, fontWeight: 600, color: '#1a1a1a', mb: 2 }}>Achievements</Typography>
                  <List sx={{ p: 0 }}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><FitnessCenter sx={{ color: '#8b5cf6' }} /></ListItemIcon>
                      <ListItemText primary="Sustainable 20 kg weight loss." />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><Star sx={{ color: '#fde047' }} /></ListItemIcon>
                      <ListItemText primary="6-month workout streak." />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><School sx={{ color: '#22c55e' }} /></ListItemIcon>
                      <ListItemText primary="Consistent 10k daily step goal." />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><EmojiEvents sx={{ color: '#f59e0b' }} /></ListItemIcon>
                      <ListItemText primary="Reduced body fat by 8%." />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><MenuBook sx={{ color: '#0ea5e9' }} /></ListItemIcon>
                      <ListItemText primary="Built 1200+ healthy recipes." />
                    </ListItem>
                  </List>
                </Paper>
              </Box>
            </Box>

            {/* Right column: Weekly Review + Daily Condition remain stacked; Daily Condition stretches to bottom */}
            <Box sx={{ gridColumn: { xs: '1', lg: '3' }, display: 'flex', flexDirection: 'column', gap: 3, alignSelf: 'stretch' }}>
              {/* Weekly Review (Calendar) */}
              <Paper elevation={0} sx={{ p: 3, borderRadius: 6, backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid rgba(0, 0, 0, 0.15)', background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)' }}>
                <Typography sx={{ fontFamily: 'Chillax', fontSize: 20, fontWeight: 600, color: '#1a1a1a', mb: 2 }}>📅 Weekly Review</Typography>
                <table className="calendar-grid">
                  <thead>
                    <tr>
                      <th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calendar.map((week, weekIndex) => (
                      <tr key={weekIndex}>
                        {week.map((day, dayIndex) => (
                          <td
                            key={dayIndex}
                            className={day && appointments.some(a => a.day === day) ? 'active-day' : ''}
                            title={(day && (appointments.find(a => a.day === day)?.note)) || ''}
                          >
                            {day}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Bottom actions: open dialogs */}
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 1.5 }}>
                  <Button onClick={() => { setAddDialogOpen(true); setAppointmentDate(''); setAppointmentNote(''); }} sx={{ backgroundColor: '#22c55e', color: '#fff', textTransform: 'none', fontWeight: 700, borderRadius: '10px' }}>Add appointment</Button>
                  <Button onClick={() => { setRemoveDialogOpen(true); setRemoveDate(''); }} sx={{ backgroundColor: '#ef4444', color: '#fff', textTransform: 'none', fontWeight: 700, borderRadius: '10px' }}>Remove appointment</Button>
                </Box>
              </Paper>

              {/* Daily Condition with circular bar like dashboard */}
              <Paper elevation={0} sx={{ p: 3, borderRadius: 6, backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid rgba(0, 0, 0, 0.15)', background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                <Typography sx={{ fontFamily: 'Chillax', fontSize: 20, fontWeight: 600, color: '#1a1a1a', mb: 2 }}>Daily Condition</Typography>
                <CircularProgress percentage={85} color="#10b981" valueText="85 %" label="Overall Wellness Score" />
              </Paper>
            </Box>
          </Box>          {/* Dialog: Add appointment */}
          <Dialog 
            open={addDialogOpen} 
            onClose={() => setAddDialogOpen(false)} 
            fullWidth 
            maxWidth="sm" 
            PaperProps={{ 
              sx: { 
                borderRadius: 6, 
                p: 2,
                background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
              } 
            }}
          >
            <DialogTitle sx={{ fontWeight: 700, fontSize: 24, fontFamily: 'Chillax, sans-serif', pb: 2 }}>
              Add Appointment
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2 }}>
              <Box>
                <Typography sx={{ mb: 1, fontWeight: 600, fontSize: 14 }}>Select Date</Typography>
                <TextField 
                  type="date" 
                  size="medium" 
                  fullWidth
                  value={appointmentDate} 
                  onChange={(e) => setAppointmentDate(e.target.value)} 
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: 3, 
                      backgroundColor: '#ffffff',
                      '&:hover fieldset': {
                        borderColor: '#22c55e',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#22c55e',
                      }
                    } 
                  }}
                />
              </Box>
              <Box>
                <Typography sx={{ mb: 1, fontWeight: 600, fontSize: 14 }}>Appointment Note</Typography>
                <TextField 
                  placeholder="e.g., Doctor checkup, Gym session" 
                  size="medium" 
                  fullWidth
                  multiline
                  rows={3}
                  value={appointmentNote} 
                  onChange={(e) => setAppointmentNote(e.target.value)} 
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: 3, 
                      backgroundColor: '#ffffff',
                      '&:hover fieldset': {
                        borderColor: '#22c55e',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#22c55e',
                      }
                    } 
                  }}
                />
              </Box>
              <Box sx={{ backgroundColor: '#fef3c7', p: 2, borderRadius: 3 }}>
                <Typography sx={{ color: '#92400e', fontSize: 13, fontWeight: 500 }}>
                  ℹ️ Only dates from the current month will be highlighted in the calendar.
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 1.5 }}>
              <Button 
                onClick={() => setAddDialogOpen(false)} 
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600, 
                  px: 3,
                  py: 1,
                  borderRadius: 3,
                  color: '#374151',
                  '&:hover': {
                    backgroundColor: '#f3f4f6'
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={addAppointment} 
                variant="contained"
                sx={{ 
                  backgroundColor: '#22c55e', 
                  color: '#fff', 
                  textTransform: 'none', 
                  fontWeight: 700,
                  px: 4,
                  py: 1,
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                  '&:hover': {
                    backgroundColor: '#16a34a',
                    boxShadow: '0 6px 16px rgba(34, 197, 94, 0.4)'
                  }
                }}
              >
                Save Appointment
              </Button>
            </DialogActions>
          </Dialog>

          {/* Dialog: Remove appointment */}
          <Dialog 
            open={removeDialogOpen} 
            onClose={() => setRemoveDialogOpen(false)} 
            fullWidth 
            maxWidth="sm" 
            PaperProps={{ 
              sx: { 
                borderRadius: 6, 
                p: 2,
                background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
              } 
            }}
          >
            <DialogTitle sx={{ fontWeight: 700, fontSize: 24, fontFamily: 'Chillax, sans-serif', pb: 2 }}>
              Remove Appointment
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2 }}>
              <Box>
                <Typography sx={{ mb: 1, fontWeight: 600, fontSize: 14 }}>Select Date to Remove</Typography>
                <TextField 
                  type="date" 
                  size="medium" 
                  fullWidth
                  value={removeDate} 
                  onChange={(e) => setRemoveDate(e.target.value)} 
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: 3, 
                      backgroundColor: '#ffffff',
                      '&:hover fieldset': {
                        borderColor: '#ef4444',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ef4444',
                      }
                    } 
                  }}
                />
              </Box>
              <Box sx={{ backgroundColor: '#fee2e2', p: 2, borderRadius: 3 }}>
                <Typography sx={{ color: '#991b1b', fontSize: 13, fontWeight: 500 }}>
                  ⚠️ This will remove the appointment from the selected date.
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 1.5 }}>
              <Button 
                onClick={() => setRemoveDialogOpen(false)} 
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600, 
                  px: 3,
                  py: 1,
                  borderRadius: 3,
                  color: '#374151',
                  '&:hover': {
                    backgroundColor: '#f3f4f6'
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={removeAppointment} 
                variant="contained"
                sx={{ 
                  backgroundColor: '#ef4444', 
                  color: '#fff', 
                  textTransform: 'none', 
                  fontWeight: 700,
                  px: 4,
                  py: 1,
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                  '&:hover': {
                    backgroundColor: '#dc2626',
                    boxShadow: '0 6px 16px rgba(239, 68, 68, 0.4)'
                  }
                }}
              >
                Remove Appointment
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;