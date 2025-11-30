import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NutritionContext = createContext();

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};

export const NutritionProvider = ({ children }) => {
  const { user } = useAuth();

  const calculateStats = (foods) => {
    return foods.reduce((acc, food) => {
      acc.totalCalories += food.calories || 0;
      acc.totalProtein += food.protein || 0;
      acc.totalFats += food.fats || 0;
      acc.totalCarbs += food.carbs || 0;
      return acc;
    }, { totalCalories: 0, totalProtein: 0, totalFats: 0, totalCarbs: 0 });
  };

  // Initialize state synchronously from localStorage to prevent flash of zero values
  const [loggedFoods, setLoggedFoods] = useState(() => {
    if (!user?.id) return [];
    try {
      const userKey = `nutriwell_${user.id}`;
      const savedFoods = localStorage.getItem(`${userKey}_logged_foods`);
      return savedFoods ? JSON.parse(savedFoods) : [];
    } catch (error) {
      console.error('Failed to load logged foods from localStorage', error);
      return [];
    }
  });

  const [waterIntake, setWaterIntake] = useState(() => {
    if (!user?.id) return 0;
    try {
      const userKey = `nutriwell_${user.id}`;
      const savedWater = localStorage.getItem(`${userKey}_water_intake`);
      return savedWater ? parseFloat(savedWater) || 0 : 0;
    } catch (error) {
      console.error('Failed to load water intake from localStorage', error);
      return 0;
    }
  });

  const [dailyStats, setDailyStats] = useState(() => {
    // Calculate initial stats based on the synchronously loaded foods
    if (!user?.id) return { totalCalories: 0, totalProtein: 0, totalFats: 0, totalCarbs: 0, waterGoal: 3.0 };
    try {
      const userKey = `nutriwell_${user.id}`;
      const savedFoods = localStorage.getItem(`${userKey}_logged_foods`);
      const foods = savedFoods ? JSON.parse(savedFoods) : [];
      const stats = calculateStats(foods);
      return { ...stats, waterGoal: 3.0 };
    } catch (error) {
      return { totalCalories: 0, totalProtein: 0, totalFats: 0, totalCarbs: 0, waterGoal: 3.0 };
    }
  });

  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showCongratulation, setShowCongratulation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [notificationStates, setNotificationStates] = useState({
    protein: false,
    fats: false,
    water: false,
    veggies: false,
    calories: false,
  });

  const [shownNotifications, setShownNotifications] = useState({
    protein: false,
    fats: false,
    water: false,
    veggies: false,
    calories: false,
  });

  function getDefaultNotificationSettings() {
    return {
      // Reminders group
      dailyWaterIntake: true,
      mealAlerts: true,
      medicineReminder: true,
      // Plans & Admin group
      newDietPlan: true,
      planReminder: true,
      planExpiry: true,
      adminMessage: true,
      // Additional Settings group
      stepAlerts: true,
      morningRun: true,
      syncWearables: true,
      smsAlerts: true,
      playSound: true,
      vibrate: true,
      priorityOnly: true,
    };
  }

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState(() => {
    if (!user?.id) return getDefaultNotificationSettings();
    
    const userKey = `nutriwell_${user.id}`;
    const savedSettings = localStorage.getItem(`${userKey}_notification_settings`);
    return savedSettings ? JSON.parse(savedSettings) : getDefaultNotificationSettings();
  });

  // This master useEffect handles state changes when the user logs in or out.
  useEffect(() => {
    console.log('🔄 NutritionContext: User changed:', user?.id, user?.email);
    
    // If no user, reset everything.
    if (!user?.id) {
      console.log('❌ No user - resetting all data');
      setLoggedFoods([]);
      setWaterIntake(0);
      setDailyStats({ totalCalories: 0, totalProtein: 0, totalFats: 0, totalCarbs: 0, waterGoal: 3.0 });
      setNotificationSettings(getDefaultNotificationSettings());
      return;
    }

    // When user changes, re-initialize state from their specific localStorage.
    // This handles switching between user accounts without mixing data.
    const userKey = `nutriwell_${user.id}`;
    console.log('🔑 Loading data for user key:', userKey);
    
    // Clear old localStorage keys from previous implementation (one-time cleanup)
    // Remove non-user-specific keys that might be causing conflicts
    if (localStorage.getItem('logged_foods')) {
      localStorage.removeItem('logged_foods');
      localStorage.removeItem('water_intake');
      console.log('🧹 Cleaned up old non-user-specific localStorage keys');
    }
    
    try {
      const savedFoods = localStorage.getItem(`${userKey}_logged_foods`);
      const foods = savedFoods ? JSON.parse(savedFoods) : [];
      console.log('💾 Loaded foods from localStorage:', foods.length, 'items');
      setLoggedFoods(foods);

      const savedWater = localStorage.getItem(`${userKey}_water_intake`);
      const water = savedWater ? parseFloat(savedWater) : 0;
      console.log('💧 Loaded water from localStorage:', water, 'L');
      setWaterIntake(water);
      
      const savedSettings = localStorage.getItem(`${userKey}_notification_settings`);
      setNotificationSettings(savedSettings ? JSON.parse(savedSettings) : getDefaultNotificationSettings());

      const stats = calculateStats(foods);
      setDailyStats(prev => ({ ...prev, ...stats }));
    } catch (error) {
      console.error('Failed to re-initialize nutrition state from localStorage', error);
    }

    // Asynchronously fetch latest data from the backend to supplement localStorage.
    const loadTodaysNutrition = async () => {
      if (!user.token) return;
      setIsLoading(true);
      try {
        const today = new Date().toISOString().split('T')[0];
        console.log('🌐 Fetching backend data for user:', user.email, 'date:', today);
        const response = await fetch(`http://localhost:5000/api/nutrition/logs?from=${today}&to=${today}`, {
          headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          console.log('📡 Backend response:', data);
          if (data.logs && data.logs.length > 0) {
            const todaysLog = data.logs[0];
            console.log('✅ Loading backend data for', user.email, ':', todaysLog);
            setLoggedFoods(todaysLog.foods || []);
            setWaterIntake(todaysLog.waterIntake || 0);
          } else {
            console.log('✨ No backend data found for', user.email);
          }
        }
      } catch (error) {
        console.error('Failed to load nutrition data from backend:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodaysNutrition();
  }, [user?.id, user?.token]);


  // Save to user-specific localStorage and backend
  useEffect(() => {
    if (!user?.id) return;
    
    const userKey = `nutriwell_${user.id}`;
    console.log('💾 Saving logged foods for:', userKey, loggedFoods.length, 'items');
    localStorage.setItem(`${userKey}_logged_foods`, JSON.stringify(loggedFoods));
    
    // Debounce API calls to avoid too many requests
    const timeoutId = setTimeout(() => {
      saveTodaysNutrition();
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [loggedFoods]);

  useEffect(() => {
    if (!user?.id) return;
    
    const userKey = `nutriwell_${user.id}`;
    console.log('💧 Saving water intake for:', userKey, waterIntake, 'L');
    localStorage.setItem(`${userKey}_water_intake`, waterIntake.toString());

    const timeoutId = setTimeout(() => {
      saveTodaysNutrition();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [waterIntake]);

  const saveTodaysNutrition = async () => {
    if (!user?.token) return;
    
    try {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      await fetch('http://localhost:5000/api/nutrition/logs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: today,
          foods: loggedFoods,
          waterIntake: waterIntake,
        }),
      });
    } catch (error) {
      console.error('Failed to save nutrition data:', error);
    }
  };

  // Save notification settings to user-specific localStorage when they change
  useEffect(() => {
    if (!user?.id) return;
    
    const userKey = `nutriwell_${user.id}`;
    localStorage.setItem(`${userKey}_notification_settings`, JSON.stringify(notificationSettings));
  }, [notificationSettings, user?.id]);

  // Calculate daily stats whenever logged foods changes.
  useEffect(() => {
    const stats = calculateStats(loggedFoods);
    setDailyStats(prev => ({
      ...prev,
      ...stats,
    }));
  }, [loggedFoods]);

  // Check for goal achievements whenever stats or water intake change
  useEffect(() => {
    const proteinGoal = 75;
    const fatsGoal = 50;
    const waterGoal = 3.0;
    const veggieGoal = 5;
    const calorieGoal = 2000;

    if (dailyStats.totalProtein >= proteinGoal && !notificationStates.protein && !shownNotifications.protein) {
      setNotificationStates(prev => ({ ...prev, protein: true }));
    }

    if (dailyStats.totalFats >= fatsGoal && !notificationStates.fats && !shownNotifications.fats) {
      setNotificationStates(prev => ({ ...prev, fats: true }));
    }

    if (waterIntake >= waterGoal && !notificationStates.water && !shownNotifications.water) {
      setNotificationStates(prev => ({ ...prev, water: true }));
    }

    const veggieCount = loggedFoods.filter(food => food.category === 'vegetable').length;
    if (veggieCount >= veggieGoal && !notificationStates.veggies && !shownNotifications.veggies) {
      setNotificationStates(prev => ({ ...prev, veggies: true }));
    }

    if (dailyStats.totalCalories >= calorieGoal && !notificationStates.calories && !shownNotifications.calories) {
      setNotificationStates(prev => ({ ...prev, calories: true }));
    }
  }, [dailyStats, waterIntake, loggedFoods, notificationStates, shownNotifications]);

  const addFood = (food) => {
    food.id = food.id || `food_${Date.now()}`;
    food.loggedAt = food.loggedAt || new Date().toISOString();
    setLoggedFoods(prevFoods => [...prevFoods, food]);
  };

  const removeFood = (foodId) => {
    setLoggedFoods(prevFoods => prevFoods.filter(f => f.id !== foodId));
  };

  const addWater = (amount) => {
    setWaterIntake(prev => Math.max(0, prev + amount));
  };

  const resetNotifications = (type) => {
    setNotificationStates(prev => ({ ...prev, [type]: false }));
    setShownNotifications(prev => ({ ...prev, [type]: true }));
  };

  const value = {
    loggedFoods,
    addFood,
    removeFood,
    waterIntake,
    addWater,
    dailyStats,
    selectedPeriod,
    setSelectedPeriod,
    showCongratulation,
    setShowCongratulation,
    notificationStates,
    resetNotifications,
    notificationSettings,
    setNotificationSettings,
    isLoading,
  };

  return (
    <NutritionContext.Provider value={value}>
      {children}
    </NutritionContext.Provider>
  );
};
