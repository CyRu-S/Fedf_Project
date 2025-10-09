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

const UserProfile = () => {
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const [diet, setDiet] = useState({
    vegan: true,
    glutenFree: true,
    noRedMeat: true,
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
    
    return { calendar, today };
  };

  const { calendar, today } = getCurrentCalendar();

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
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {/* Header with title and subtitle */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', px: 5, pt: 3, pb: 2 }}>
            <Typography variant="h3" sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 600, fontSize: 36, color: '#1d1d1f' }}>
              User Profile
            </Typography>
            <Typography sx={{ fontFamily: 'Chillax, sans-serif', fontSize: 16, color: '#6b7280', fontWeight: 500, mt: 1 }}>
              Personal Health Information
            </Typography>
          </Box>

          {/* Main content grid exactly like reference */}
          <Box sx={{ px: 5, pb: 4, display: 'flex', gap: 3, alignItems: 'stretch', minHeight: 'calc(100vh - 200px)' }}>            {/* Column 1: Profile Card (leftmost) */}
            <Box sx={{ width: '280px', flexShrink: 0 }}>
              <Paper className="profile-vertical-box" elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <Avatar className="user-avatar" alt="John Smith">
                    <Box className="avatar-face">👤</Box>
                  </Avatar>
                  <Typography className="user-name">John Smith</Typography>
                  <Typography className="user-role">Wellness Enthusiast</Typography>
                  
                  <Box className="profile-nav" sx={{ mt: 3 }}>
                    <Button className="profile-nav-btn active">📊 Profile</Button>
                    <Button className="profile-nav-btn">🏃 Habits</Button>
                  </Box>
                </Box>
              </Paper>
            </Box>

            {/* Column 2: Info Card */}
            <Box sx={{ width: '300px', flexShrink: 0 }}>
              <Paper className="info-card" elevation={0} sx={{ height: '100%' }}>
                <Typography className="card-header">Info</Typography>
                <Box className="info-grid">
                  <Box className="info-line">
                    <Typography className="info-key">Gender</Typography>
                    <Typography className="info-val">Male</Typography>
                  </Box>
                  <Box className="info-line">
                    <Typography className="info-key">Age</Typography>
                    <Typography className="info-val">32</Typography>
                  </Box>
                  <Box className="info-line">
                    <Typography className="info-key">Language</Typography>
                    <Typography className="info-val">English</Typography>
                  </Box>
                  <Box className="info-line">
                    <Typography className="info-key">Height</Typography>
                    <Typography className="info-val">6'2</Typography>
                  </Box>
                </Box>
                
                {/* BMI Section within Info Card */}
                <Box sx={{ mt: 4 }}>
                  <Typography className="card-header">Calculate your BMI</Typography>
                  <Box className="bmi-inputs">
                    <TextField
                      size="small"
                      placeholder="Enter your weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="weight-input"
                      type="number"
                    />
                    <Button 
                      variant="contained" 
                      className="submit-button" 
                      onClick={calculateBMI}
                      disabled={!weight}
                    >
                      Submit
                    </Button>
                  </Box>
                  <Box className="bmi-display">
                    <Typography className="bmi-text">Your Current BMI :</Typography>
                    <Typography 
                      className="bmi-result" 
                      sx={{ color: getBMIColor() }}
                    >
                      {bmi ? `${bmi} (${getBMIStatus()})` : getBMIStatus()}
                    </Typography>
                  </Box>
                </Box>

                {/* User Bio Section */}
                <Box sx={{ mt: 4 }}>
                  <Typography className="card-header">User Bio</Typography>
                  <Typography className="bio-description">
                    Passionate health enthusiast focused on balanced nutrition, daily workouts, and mindful living. 
                    Loves meal-prepping, tracking macros, and exploring evidence-based wellness tips to boost energy and longevity.
                  </Typography>
                </Box>
              </Paper>
            </Box>

            {/* Column 3: Dietary Preferences */}
            <Box sx={{ width: '300px', flexShrink: 0 }}>
              <Paper className="dietary-card" elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography className="card-header">Dietary Preferences</Typography>
                <Box className="dietary-grid">
                  <Box className="dietary-line">
                    <Typography className="dietary-text">Vegan</Typography>
                    <Switch 
                      size="small" 
                      checked={diet.vegan} 
                      onChange={() => handleToggle("vegan")} 
                      className="toggle-switch" 
                    />
                  </Box>
                  <Box className="dietary-line">
                    <Typography className="dietary-text">Gluten Free</Typography>
                    <Switch 
                      size="small" 
                      checked={diet.glutenFree} 
                      onChange={() => handleToggle("glutenFree")} 
                      className="toggle-switch" 
                    />
                  </Box>
                  <Box className="dietary-line">
                    <Typography className="dietary-text">No Red Meat</Typography>
                    <Switch 
                      size="small" 
                      checked={diet.noRedMeat} 
                      onChange={() => handleToggle("noRedMeat")} 
                      className="toggle-switch" 
                    />
                  </Box>
                </Box>

                {/* Achievements within same card */}
                <Box sx={{ mt: 4, flex: 1 }}>
                  <Typography className="card-header">Achievements</Typography>
                  <List className="achievements-grid">
                    <ListItem className="achievement-line">
                      <ListItemIcon><FitnessCenter className="achievement-icon" /></ListItemIcon>
                      <ListItemText primary="Sustainable 20 kg weight loss." className="achievement-text" />
                    </ListItem>
                    <ListItem className="achievement-line">
                      <ListItemIcon><Star className="achievement-icon" /></ListItemIcon>
                      <ListItemText primary="6-month workout streak." className="achievement-text" />
                    </ListItem>
                    <ListItem className="achievement-line">
                      <ListItemIcon><School className="achievement-icon" /></ListItemIcon>
                      <ListItemText primary="Consistent 10k daily step goal." className="achievement-text" />
                    </ListItem>
                    <ListItem className="achievement-line">
                      <ListItemIcon><EmojiEvents className="achievement-icon" /></ListItemIcon>
                      <ListItemText primary="Reduced body fat by 8%." className="achievement-text" />
                    </ListItem>
                    <ListItem className="achievement-line">
                      <ListItemIcon><MenuBook className="achievement-icon" /></ListItemIcon>
                      <ListItemText primary="Built 1200+ healthy recipes." className="achievement-text" />
                    </ListItem>
                  </List>
                </Box>
              </Paper>
            </Box>

            {/* Column 4: Calendar & Wellness (rightmost) */}
            <Box sx={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Calendar */}
              <Paper className="calendar-card" elevation={0}>
                <Typography className="health-card-header">📅 Weekly Review</Typography>
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
                            className={day === today ? "active-day" : ""}
                          >
                            {day}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Paper>

              {/* Daily Condition */}
              <Paper className="wellness-card" elevation={0}>
                <Typography className="health-card-header">Daily Condition</Typography>
                <Box className="wellness-display">
                  <Box className="wellness-ring">
                    <Typography className="wellness-percent">85 %</Typography>
                  </Box>
                  <Typography className="wellness-label">Overall Wellness Score</Typography>
                </Box>              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;