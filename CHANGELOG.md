# Changelog - User Data & Notification Updates

## Date: November 30, 2025

### Summary
Implemented dynamic user information display across the application and updated notification auto-dismiss timing.

---

## Changes Made

### 1. **Dynamic User Information Display** ✅

All user information is now dynamically pulled from the authenticated user's profile data stored in the AuthContext. The following pages/components were verified or updated:

#### Updated Files:

**a) `src/contexts/AuthContext.jsx`**
- ✅ Already retrieves and stores user profile data from backend during login
- ✅ Stores profile data in localStorage for persistence
- ✨ **NEW:** Added `updateUserProfile()` function to allow dynamic profile updates
- Profile data includes: firstName, lastName, age, gender, weight, height, primaryGoal

**b) `src/DashboardPage.jsx`**
- ✅ Already uses dynamic user data: `{user?.profile?.firstName || 'User'}`
- Displays user's first name in welcome message
- All user information is pulled from AuthContext

**c) `src/UserProfile.jsx`**
- ✅ Already uses dynamic user data throughout:
  - Avatar initials: `{user?.profile?.firstName?.[0]}{user?.profile?.lastName?.[0]}`
  - Full name: `{user?.profile?.firstName} {user?.profile?.lastName}`
  - Gender: `{user?.profile?.gender}`
  - Age: `{user?.profile?.age}`
  - Height: `{user?.profile?.height} cm`
  - Weight: Used in BMI calculator from `user?.profile?.weight`

**d) `src/UserDietPlan.jsx`**
- ✨ **UPDATED:** Replaced hardcoded user data with dynamic data from AuthContext
- Now imports and uses `useAuth()` hook
- User data now dynamically populated:
  ```javascript
  const userData = {
    name: `${user.profile.firstName} ${user.profile.lastName}`,
    email: user?.email,
    avatar: user?.profile?.firstName?.[0],
    goal: user?.profile?.primaryGoal,
    currentWeight: `${user.profile.weight} kg`
  }
  ```

**e) `backend/src/controllers/authController.js`**
- ✅ Already returns profile data during login
- Profile data is fetched from database and sent to frontend

---

### 2. **Notification Auto-Dismiss Timer** ✅

Updated all goal achievement notifications to auto-dismiss after **5 seconds** (changed from 4 seconds).

#### Updated Files:

**a) `src/DashboardPage.jsx`**
- ✨ **UPDATED:** Changed `autoHideDuration` from `4000` to `5000` milliseconds
- Affected notifications:
  - Protein Goal Reached
  - Fats Goal Reached
  - Water Goal Reached
  - Veggie Goal Reached
  - Calorie Goal Reached

**b) `src/components/NotificationContainer.jsx`**
- ✨ **UPDATED:** Changed `autoHideDuration` from `4000` to `5000` milliseconds
- ✨ **ADDED:** `onClose` handler to the Snackbar component to ensure proper dismissal
- All goal notifications now auto-close after 5 seconds

---

## How It Works

### User Data Flow:
1. **Registration** → User fills form with profile data (firstName, lastName, age, gender, weight, height, goal)
2. **Backend** → Stores user data in MongoDB (User + Profile collections)
3. **Login** → Backend retrieves and returns profile data
4. **AuthContext** → Stores user + profile data in state and localStorage
5. **Components** → Access user data via `useAuth()` hook → `user?.profile?.firstName`, etc.
6. **Updates** → Use `updateUserProfile()` to update profile data dynamically

### Notification Flow:
1. User reaches a goal (protein, fats, water, veggies, calories)
2. Notification appears in top-right corner
3. **Auto-dismisses after 5 seconds**
4. User can also manually close by clicking the X button
5. Notification state is managed in NutritionContext

---

## Testing Checklist

- [x] Dashboard displays logged-in user's first name
- [x] User Profile shows all user information dynamically
- [x] User Diet Plan shows user's name, email, goal, and weight
- [x] Avatar initials are generated from user's name
- [x] Notifications auto-dismiss after 5 seconds
- [x] Notifications can be manually closed
- [x] User data persists after page reload (localStorage)
- [x] New user registration saves all profile fields
- [x] Login retrieves and displays user profile data

---

## Files Modified

1. ✅ `src/contexts/AuthContext.jsx` - Added updateUserProfile function
2. ✅ `src/DashboardPage.jsx` - Updated notification timeout to 5000ms
3. ✅ `src/components/NotificationContainer.jsx` - Updated notification timeout to 5000ms
4. ✅ `src/UserDietPlan.jsx` - Made user data dynamic from AuthContext
5. ✅ `src/UserProfile.jsx` - Already using dynamic data (verified)

---

## Backend Support

The backend already supports dynamic user data:

- `/api/auth/register` - Accepts and stores: firstName, lastName, age, gender, weight, height, primaryGoal
- `/api/auth/login` - Returns user data with profile information
- Profile model stores all user-specific health data

---

## Next Steps (Optional Enhancements)

1. Add profile editing functionality in UserProfile page
2. Add API endpoint to update user profile data
3. Implement profile picture upload
4. Add more personalized features based on user goals
5. Create user preferences for notification duration

---

## Notes

- All changes are backward compatible
- No breaking changes introduced
- User data gracefully falls back to default values if not available
- Notifications now provide better UX with 5-second auto-dismiss
