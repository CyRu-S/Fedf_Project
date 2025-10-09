import React, { createContext, useContext, useState, useEffect } from 'react';

const NutritionContext = createContext();

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};

export const NutritionProvider = ({ children }) => {
  const [loggedFoods, setLoggedFoods] = useState([]);
  const [waterIntake, setWaterIntake] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showCongratulation, setShowCongratulation] = useState(false);
  const [dailyStats, setDailyStats] = useState({
    totalCalories: 0,
    totalProtein: 0,
    totalFats: 0,
    totalCarbs: 0,
    waterGoal: 3.0,
  });

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

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState(() => {
    const savedSettings = localStorage.getItem('nutriwell_notification_settings');
    return savedSettings ? JSON.parse(savedSettings) : {
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
  });

  // Load data from localStorage on mount
  // Removed to reset data on manual page refresh
  /*
  useEffect(() => {
    const savedFoods = localStorage.getItem('nutriwell_logged_foods');
    const savedWater = localStorage.getItem('nutriwell_water_intake');
    if (savedFoods) {
      setLoggedFoods(JSON.parse(savedFoods));
    }
    if (savedWater) {
      setWaterIntake(parseFloat(savedWater));
    }
  }, []);
  */

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('nutriwell_logged_foods', JSON.stringify(loggedFoods));
  }, [loggedFoods]);

  useEffect(() => {
    localStorage.setItem('nutriwell_water_intake', waterIntake.toString());
  }, [waterIntake]);

  // Save notification settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('nutriwell_notification_settings', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  // Calculate daily stats whenever logged foods change or water intake changes
  useEffect(() => {
    const stats = loggedFoods.reduce((acc, food) => {
      acc.totalCalories += food.calories || 0;
      acc.totalProtein += food.protein || 0;
      acc.totalFats += food.fats || 0;
      acc.totalCarbs += food.carbs || 0;

      return acc;
    }, {
      totalCalories: 0,
      totalProtein: 0,
      totalFats: 0,
      totalCarbs: 0,
    });

    setDailyStats(prev => ({
      ...prev,
      ...stats,
    }));

    // Check for goal achievements
    const proteinGoal = 75;
    const fatsGoal = 50;
    const waterGoal = 3.0;
    const veggieGoal = 5;
    const calorieGoal = 2000;

    if (stats.totalProtein >= proteinGoal && !notificationStates.protein && !shownNotifications.protein) {
      setNotificationStates(prev => ({ ...prev, protein: true }));
    }

    if (stats.totalFats >= fatsGoal && !notificationStates.fats && !shownNotifications.fats) {
      setNotificationStates(prev => ({ ...prev, fats: true }));
    }

    if (waterIntake >= waterGoal && !notificationStates.water && !shownNotifications.water) {
      setNotificationStates(prev => ({ ...prev, water: true }));
    }

    const veggieCount = loggedFoods.filter(food => food.category === 'vegetable').length;
    if (veggieCount >= veggieGoal && !notificationStates.veggies && !shownNotifications.veggies) {
      setNotificationStates(prev => ({ ...prev, veggies: true }));
    }

    if (stats.totalCalories >= calorieGoal && !notificationStates.calories && !shownNotifications.calories) {
      setNotificationStates(prev => ({ ...prev, calories: true }));
    }
  }, [loggedFoods, waterIntake, notificationStates, shownNotifications]);

  // Function to update notification settings
  const updateNotificationSetting = (setting, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const addFood = (food) => {
    const newFood = {
      ...food,
      id: Date.now(),
      loggedAt: new Date().toISOString(),
    };
    setLoggedFoods(prev => [...prev, newFood]);

    // Show congratulations if this is the 5th veggie
    if (food.category === 'vegetable') {
      const newVeggieCount = loggedFoods.filter(f => f.category === 'vegetable').length + 1;
      if (newVeggieCount >= 5) {
        setShowCongratulation(true);
        setTimeout(() => setShowCongratulation(false), 5000);
      }
    }
  };

  const removeFood = (id) => {
    setLoggedFoods(prev => prev.filter(food => food.id !== id));
  };

  const updateWaterIntake = (amount) => {
    setWaterIntake(prev => Math.min(prev + amount, 3.0));
  };

  const resetDailyData = () => {
    setLoggedFoods([]);
    setWaterIntake(0);
  };

  const veggiesConsumed = loggedFoods.filter(food => food.category === 'vegetable').length;

  const value = {
    loggedFoods,
    waterIntake,
    dailyStats,
    notificationStates,
    setNotificationStates,
    shownNotifications,
    setShownNotifications,
    addFood,
    removeFood,
    updateWaterIntake,
    resetDailyData,
    veggiesConsumed,
    selectedPeriod,
    setSelectedPeriod,
    notificationSettings,
    updateNotificationSetting,
    showCongratulation,
    setShowCongratulation,
  };

  return (
    <NutritionContext.Provider value={value}>
      {children}
    </NutritionContext.Provider>
  );
};
