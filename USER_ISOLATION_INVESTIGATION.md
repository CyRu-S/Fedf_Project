# 🔍 USER DATA ISOLATION INVESTIGATION

## 🎯 Problem Report
**Issue**: Different users (different email/password combinations) are seeing the **same nutrition data** instead of their own separate data.

**Expected Behavior**: Each user should have completely isolated data:
- User A's food logs should NOT appear in User B's account
- User A's water intake should NOT appear in User B's account  
- User A's notification settings should NOT appear in User B's account

**Actual Behavior**: All users see the same data regardless of which account they're logged into.

---

## 🔍 Investigation Steps

### 1. **Check User ID Isolation**

The application uses a user-specific localStorage key pattern:
```javascript
const userKey = `nutriwell_${user.id}`;
```

**Where user.id comes from**:
- Backend returns `user._id` (MongoDB ObjectId) on login
- AuthContext stores this in `user.id`
- Each user gets a unique MongoDB ID like: `674b2f8e9c1234567890abcd`

### 2. **Check Backend Filtering**

The backend properly filters by user ID:
```javascript
// backend/src/controllers/nutritionController.js
exports.getLogs = async (req, res, next) => {
  const query = { user: req.user.userId }; // ✅ Filters by logged-in user
  const logs = await NutritionLog.find(query);
  res.json({ logs });
};
```

### 3. **Check Frontend State Management**

The `NutritionContext` loads data based on `user.id`:
```javascript
const userKey = `nutriwell_${user.id}`;
const savedFoods = localStorage.getItem(`${userKey}_logged_foods`);
```

---

## 🐛 Possible Root Causes

### Hypothesis 1: **User ID Not Changing**
**Symptom**: `user.id` is the same for all users  
**Check**: Look at console logs showing `user.id` for different logins

### Hypothesis 2: **LocalStorage Not Clearing Between Users**
**Symptom**: Old user's data persists in localStorage  
**Check**: Inspect `Application > LocalStorage` in DevTools

### Hypothesis 3: **Backend Token Not Refreshing**
**Symptom**: Old user's JWT token is still being used  
**Check**: Decode JWT token to see which user ID it contains

### Hypothesis 4: **Frontend Not Re-initializing on User Change**
**Symptom**: useEffect not triggering when user changes  
**Check**: Console logs should show "User changed: [userID]"

---

## 🔧 Debugging Tools Added

### 1. **Enhanced Console Logging**
Added comprehensive logging to `NutritionContext.jsx`:

```javascript
console.log('🔄 NutritionContext: User changed:', user?.id, user?.email);
console.log('🔑 Loading data for user key:', userKey);
console.log('💾 Loaded foods from localStorage:', foods.length, 'items');
console.log('💧 Loaded water from localStorage:', water, 'L');
console.log('🌐 Fetching backend data for user:', user.email);
console.log('📡 Backend response:', data);
console.log('💾 Saving logged foods for:', userKey, loggedFoods.length, 'items');
```

### 2. **User Isolation Test Page**
Created `/user-isolation-test` page that shows:
- ✅ Current logged-in user info
- ✅ Current user's nutrition data  
- ✅ ALL localStorage keys for ALL users
- ✅ Step-by-step testing instructions

---

## 🧪 Testing Protocol

### Step 1: Create Two Test Users
```bash
# User A
Email: test1@example.com
Password: password123

# User B  
Email: test2@example.com
Password: password123
```

### Step 2: Test User A
1. Log in as `test1@example.com`
2. Open browser console (F12)
3. Look for logs showing:
   ```
   🔄 NutritionContext: User changed: [UserA_ID] test1@example.com
   🔑 Loading data for user key: nutriwell_[UserA_ID]
   ```
4. Add some food items (e.g., Apple, Banana)
5. Add water intake (e.g., 0.5L)
6. Check console for:
   ```
   💾 Saving logged foods for: nutriwell_[UserA_ID] 2 items
   💧 Saving water intake for: nutriwell_[UserA_ID] 0.5 L
   ```
7. Go to `/user-isolation-test` and verify User A's data is shown

### Step 3: Test User B
1. **Log out** from User A
2. Log in as `test2@example.com`
3. Check console logs:
   ```
   🔄 NutritionContext: User changed: [UserB_ID] test2@example.com
   🔑 Loading data for user key: nutriwell_[UserB_ID]
   ```
4. **IMPORTANT**: UserB_ID should be DIFFERENT from UserA_ID
5. Add DIFFERENT food items (e.g., Orange, Grapes)
6. Add DIFFERENT water intake (e.g., 1.0L)
7. Go to `/user-isolation-test` 

### Step 4: Verify Isolation
On the `/user-isolation-test` page, you should see:
- ✅ Current user shows User B's email and ID
- ✅ Current User's Data shows Orange, Grapes (NOT Apple, Banana)
- ✅ Water intake shows 1.0L (NOT 0.5L)
- ✅ LocalStorage section shows TWO sets of keys:
  - `nutriwell_[UserA_ID]_logged_foods` containing Apple, Banana
  - `nutriwell_[UserB_ID]_logged_foods` containing Orange, Grapes

### Step 5: Switch Back to User A
1. Log out from User B
2. Log in as User A again
3. **Expected**: Should see Apple, Banana and 0.5L water (original User A data)
4. **Problem if**: Seeing Orange, Grapes or mixed data

---

## 🚨 Diagnosis Checklist

Run through this checklist to identify the issue:

| Check | Expected | How to Verify | Status |
|-------|----------|---------------|--------|
| User IDs are different | Each user has unique MongoDB ObjectId | Console: `user?.id` | ⬜ |
| LocalStorage keys are different | Each user has `nutriwell_[differentID]_*` | Application tab in DevTools | ⬜ |
| Backend returns user-specific data | API response filtered by user ID | Network tab: `/api/nutrition/logs` response | ⬜ |
| JWT token changes on login | Token payload contains correct user ID | Decode token at jwt.io | ⬜ |
| useEffect triggers on user change | Console shows "User changed" log | Browser console | ⬜ |
| Data clears when logging out | State resets to empty | Dashboard shows 0 values after logout | ⬜ |

---

## 🔑 Key Files to Check

1. **`src/contexts/AuthContext.jsx`** - User login and storage
2. **`src/contexts/NutritionContext.jsx`** - Data loading and storage
3. **`backend/src/controllers/nutritionController.js`** - Backend filtering
4. **`backend/src/middleware/auth.js`** - JWT token validation

---

## 📊 What to Look For in Console

When testing, you should see logs like this:

```
// User A logs in
🔄 NutritionContext: User changed: 674b2f8e9c1234567890abcd test1@example.com
🔑 Loading data for user key: nutriwell_674b2f8e9c1234567890abcd
💾 Loaded foods from localStorage: 0 items
💧 Loaded water from localStorage: 0 L
🌐 Fetching backend data for user: test1@example.com
📡 Backend response: { logs: [] }

// User A adds food
💾 Saving logged foods for: nutriwell_674b2f8e9c1234567890abcd 1 items

// User A logs out, User B logs in
🔄 NutritionContext: User changed: 674b3a1f8d9876543210fedc test2@example.com  // ← DIFFERENT ID!
🔑 Loading data for user key: nutriwell_674b3a1f8d9876543210fedc  // ← DIFFERENT KEY!
💾 Loaded foods from localStorage: 0 items  // ← SHOULD BE EMPTY FOR NEW USER
```

---

## ✅ Expected Behavior Summary

### Correct User Isolation:
```
User A (ID: abc123):
  localStorage: nutriwell_abc123_logged_foods = [Apple, Banana]
  localStorage: nutriwell_abc123_water_intake = "0.5"
  Backend: NutritionLog { user: "abc123", foods: [...], water: 0.5 }

User B (ID: def456):
  localStorage: nutriwell_def456_logged_foods = [Orange, Grapes]
  localStorage: nutriwell_def456_water_intake = "1.0"
  Backend: NutritionLog { user: "def456", foods: [...], water: 1.0 }
```

### ❌ Broken User Isolation (Current Issue):
```
User A logs in:
  Shows: Apple, Banana, 0.5L

User B logs in:
  Shows: Apple, Banana, 0.5L  ← WRONG! Should show their own data
```

---

## 🛠️ Debug Pages

1. **`/user-isolation-test`** - Comprehensive user isolation testing
2. **`/debug-nutrition`** - Shows current nutrition data state
3. **Browser DevTools > Application > LocalStorage** - See all stored data
4. **Browser DevTools > Console** - See all debug logs

---

## 📝 Next Steps

1. **Open browser console** (F12)
2. **Test with two users** following the protocol above
3. **Check console logs** for the patterns described
4. **Visit `/user-isolation-test`** to see the full picture
5. **Report findings** - which hypothesis matches the symptoms?

Once we see the console logs and test results, we can pinpoint exactly where the isolation is breaking down.
