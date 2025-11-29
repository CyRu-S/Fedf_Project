import React from 'react';
import { Snackbar, Alert, Box } from '@mui/material';
import { useNutrition } from '../contexts/NutritionContext';
import NutriWellBrand from './NutriWellBrand';

const NotificationContainer = () => {
  const { notificationStates, setNotificationStates, shownNotifications, setShownNotifications } = useNutrition();

  const handleClose = (key) => {
    setNotificationStates(prev => ({ ...prev, [key]: false }));
    setShownNotifications(prev => ({ ...prev, [key]: true }));
  };

  return (
    <Box sx={{ position: 'fixed', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 1, zIndex: 1300 }}>
      {Object.entries(notificationStates).map(([key, open]) => (
        <Snackbar
          key={key}
          open={open}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={() => handleClose(key)} severity="success" sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <NutriWellBrand circleSize={24} fontSize={16} gap={1.5} />
            <Box sx={{ ml: 2 }}>
              {key === 'protein' && ' Protein Goal Reached!'}
              {key === 'fats' && ' Fats Goal Reached!'}
              {key === 'water' && ' Water Goal Reached!'}
              {key === 'veggies' && ' Veggie Goal Reached!'}
              {key === 'calories' && ' Calorie Goal Reached!'}
            </Box>
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};

export default NotificationContainer;
