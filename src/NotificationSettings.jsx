import React, { useState } from 'react';
import { Box, Typography, Paper, Switch, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppSidebar from './components/AppSidebar';
import AppTopBar from './components/AppTopBar';
import { useNavigate } from 'react-router-dom';
import { SearchRounded, SettingsRounded } from '@mui/icons-material';
import { useNutrition } from './contexts/NutritionContext';

/**
 * NotificationSettings Component
 * Styled to match the attached image exactly and font/spacing from DashboardPage
 */
function NotificationSettings() {
  const navigate = useNavigate();
  const { notificationSettings, updateNotificationSetting } = useNutrition();
  
  // Local state for temporary settings
  const [localSettings, setLocalSettings] = React.useState(notificationSettings);

  // Update local settings when context updates
  React.useEffect(() => {
    setLocalSettings(notificationSettings);
  }, [notificationSettings]);

  // Handlers for toggles - update local state only
  const handleSettingChange = (setting) => (event) => {
    setLocalSettings(prev => ({
      ...prev,
      [setting]: event.target.checked
    }));
  };

  // Save settings handler - update context with local settings
  const handleSaveSettings = () => {
    // Update each setting in the context
    Object.entries(localSettings).forEach(([key, value]) => {
      updateNotificationSetting(key, value);
    });
    
    // Show success message
    alert('Notification settings saved!');
  };

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

  // Helper to render rows with divider except last
  const renderRowsWithDivider = (items, settings, onChangeHandler) => {
    return items.map((item, index) => {
      const isLast = index === items.length - 1;
      return (
        <Box key={item.name}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1.75,
            }}
          >
            <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#1b1d29', fontFamily: "'Chillax', sans-serif" }}>
              {item.label}
            </Typography>
            <PurpleSwitch
              checked={settings[item.name] || false}
              onChange={onChangeHandler(item.name)}
              name={item.name}
            />
          </Box>
          {!isLast && <Divider sx={{ borderColor: '#e3e6f4' }} />}
        </Box>
      );
    });
  };

  const remindersItems = [
    { name: 'dailyWaterIntake', label: 'Daily Water Intake' },
    { name: 'mealAlerts', label: 'Meal Alerts' },
    { name: 'medicineReminder', label: 'Medicine Reminder' },
  ];

  const plansAdminItems = [
    { name: 'newDietPlan', label: 'New Diet Plan' },
    { name: 'planReminder', label: 'Plan Reminder' },
    { name: 'planExpiry', label: 'Plan Expiry' },
    { name: 'adminMessage', label: 'Admin Message' },
  ];

  const additionalSettingsItems = [
    { name: 'stepAlerts', label: 'Step Alerts' },
    { name: 'morningRun', label: 'Morning Run' },
    { name: 'syncWearables', label: 'Sync Wearables' },
    { name: 'smsAlerts', label: 'SMS Alerts' },
    { name: 'playSound', label: 'Play Sound' },
    { name: 'vibrate', label: 'Vibrate' },
    { name: 'priorityOnly', label: 'Priority Only' },
  ];

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
      <AppSidebar activeKey="notifications" />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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

        <Box sx={{ flex: 1, overflow: 'auto', px: 5, py: 2 }}>
          <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ color: '#6b7280', fontSize: 18, mb: 1, fontFamily: 'Chillax, sans-serif' }}>
                Settings
              </Typography>
              <Typography variant="h3" sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>
                Notification Settings
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
              gap: 4,
              alignItems: 'stretch',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: 6,
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
                }}
              >
                <Typography sx={{ fontFamily: 'Chillax', fontSize: 24, fontWeight: 600, color: '#1a1a1d', mb: 2 }}>
                  Reminders
                </Typography>
                {renderRowsWithDivider(remindersItems, localSettings, handleSettingChange)}
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: 6,
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  background: 'linear-gradient(135deg, #fefce8 0%, #ffffff 100%)',
                }}
              >
                <Typography sx={{ fontFamily: 'Chillax', fontSize: 24, fontWeight: 600, color: '#1a1a1d', mb: 2 }}>
                  Plans & Admin
                </Typography>
                {renderRowsWithDivider(plansAdminItems, localSettings, handleSettingChange)}
              </Paper>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 3.5,
                borderRadius: 6,
                backgroundColor: '#fff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 3,
              }}
            >
              <Box>
                <Typography sx={{ fontFamily: 'Chillax', fontSize: 24, fontWeight: 600, color: '#1a1a1d', mb: 2 }}>
                  Additional Settings
                </Typography>
                {renderRowsWithDivider(additionalSettingsItems, localSettings, handleSettingChange)}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={handleSaveSettings}
                  sx={{
                    backgroundColor: '#22c55e',
                    color: '#ffffff',
                    textTransform: 'none',
                    fontSize: 16,
                    fontWeight: 600,
                    borderRadius: 3,
                    px: 4,
                    py: 1.25,
                    boxShadow: '0 8px 18px rgba(34, 197, 94, 0.35)',
                    '&:hover': { backgroundColor: '#16a34a' },
                  }}
                >
                  Save Settings
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default NotificationSettings;
