import React, { useEffect, useMemo, useState } from 'react';
import { Snackbar, Alert, Box } from '@mui/material';
import { useNutrition } from '../contexts/NutritionContext';
import NutriWellBrand from './NutriWellBrand';

const NotificationContainer = () => {
  const { notificationStates, closeNotification } = useNutrition();
  const [localOpen, setLocalOpen] = useState({});

  // Mirror context state to localOpen to ensure UI can close independently
  useEffect(() => {
    if (!notificationStates) return;
    setLocalOpen(prev => {
      const next = { ...prev };
      Object.entries(notificationStates).forEach(([key, open]) => {
        next[key] = !!open; // coerce to boolean
      });
      return next;
    });
  }, [notificationStates]);

  // Auto-hide after 5 seconds
  useEffect(() => {
    const timers = [];
    Object.entries(localOpen).forEach(([key, open]) => {
      if (open) {
        const t = setTimeout(() => {
          // Close locally to guarantee hide
          setLocalOpen(lo => ({ ...lo, [key]: false }));
          // Inform context if available
          closeNotification?.(key);
        }, 5000);
        timers.push(t);
      }
    });
    return () => timers.forEach(clearTimeout);
  }, [localOpen, closeNotification]);

  if (!notificationStates) return null;

  const handleClose = (key, event, reason) => {
    if (reason === 'clickaway') return;
    // Close locally
    setLocalOpen(lo => ({ ...lo, [key]: false }));
    // Close in context
    closeNotification?.(key);
  };

  return (
    <Box sx={{ position: 'fixed', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 1, zIndex: 1300 }}>
      {Object.keys(notificationStates).map((key) => (
        localOpen[key] ? (
          <Snackbar
            key={key}
            open
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={(event, reason) => handleClose(key, event, reason)}
          >
            <Alert
              onClose={(event, reason) => handleClose(key, event, reason)}
              severity="success"
              sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
            >
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
        ) : null
      ))}
    </Box>
  );
};

export default NotificationContainer;
