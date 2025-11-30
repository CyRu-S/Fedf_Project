import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useNutrition } from './contexts/NutritionContext';

function UserIsolationTest() {
  const { user } = useAuth();
  const { loggedFoods, waterIntake, dailyStats, notificationSettings } = useNutrition();
  const [localStorageData, setLocalStorageData] = useState({});

  useEffect(() => {
    // Load all localStorage keys
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes('nutriwell_')) {
        try {
          data[key] = JSON.parse(localStorage.getItem(key));
        } catch (e) {
          data[key] = localStorage.getItem(key);
        }
      }
    }
    setLocalStorageData(data);
  }, [loggedFoods, waterIntake, notificationSettings]);

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '20px', fontFamily: 'monospace' }}>
      <h1 style={{ color: '#8b5cf6' }}>👥 User Data Isolation Test</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Current User Info */}
        <div style={{ backgroundColor: '#e0f2fe', padding: '20px', borderRadius: '8px' }}>
          <h2>👤 Current Logged-In User</h2>
          <pre style={{ fontSize: '12px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(user, null, 2)}
          </pre>
          {user && (
            <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#fff', borderRadius: '4px' }}>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>LocalStorage Key:</strong> <code>nutriwell_{user.id}</code></p>
            </div>
          )}
        </div>

        {/* Current User's Data */}
        <div style={{ backgroundColor: '#dcfce7', padding: '20px', borderRadius: '8px' }}>
          <h2>📊 Current User's Nutrition Data</h2>
          <div style={{ fontSize: '12px' }}>
            <h3>Daily Stats:</h3>
            <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
              {JSON.stringify(dailyStats, null, 2)}
            </pre>
            
            <h3>Logged Foods ({loggedFoods.length}):</h3>
            <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto', maxHeight: '200px' }}>
              {JSON.stringify(loggedFoods, null, 2)}
            </pre>
            
            <h3>Water Intake:</h3>
            <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px' }}>
              {waterIntake} L
            </pre>
          </div>
        </div>
      </div>

      {/* All LocalStorage Data */}
      <div style={{ backgroundColor: '#fef3c7', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>💾 All User-Specific LocalStorage Data</h2>
        <p style={{ fontSize: '14px', color: '#92400e' }}>
          This shows ALL nutrition data stored in localStorage for ALL users. 
          Each user should have their own separate keys.
        </p>
        
        {Object.keys(localStorageData).length === 0 ? (
          <p style={{ color: '#dc2626', fontWeight: 'bold' }}>⚠️ No user-specific data found in localStorage!</p>
        ) : (
          <div>
            <h3>Found {Object.keys(localStorageData).length} user-specific localStorage items:</h3>
            {Object.entries(localStorageData).map(([key, value]) => (
              <details key={key} style={{ marginBottom: '10px', backgroundColor: '#fff', padding: '10px', borderRadius: '4px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#7c2d12' }}>
                  🔑 {key}
                </summary>
                <pre style={{ fontSize: '11px', marginTop: '10px', overflow: 'auto', maxHeight: '200px' }}>
                  {JSON.stringify(value, null, 2)}
                </pre>
              </details>
            ))}
          </div>
        )}
      </div>

      {/* Test Instructions */}
      <div style={{ backgroundColor: '#fee2e2', padding: '20px', borderRadius: '8px' }}>
        <h2>🧪 How to Test User Isolation</h2>
        <ol style={{ lineHeight: '1.8' }}>
          <li><strong>Create two test users:</strong>
            <ul>
              <li>User A: test1@example.com / password123</li>
              <li>User B: test2@example.com / password123</li>
            </ul>
          </li>
          <li><strong>Log in as User A</strong> and add some food items + water intake</li>
          <li><strong>Check this page</strong> - you should see User A's data and localStorage keys starting with <code>nutriwell_[User_A_ID]</code></li>
          <li><strong>Log out</strong> and <strong>log in as User B</strong></li>
          <li><strong>Add DIFFERENT food items</strong> + water intake for User B</li>
          <li><strong>Check this page again</strong> - you should see:
            <ul>
              <li>User B's data in the "Current User's Data" section</li>
              <li>TWO sets of localStorage keys: one for User A and one for User B</li>
              <li>Each user's data should be separate and NOT overlap</li>
            </ul>
          </li>
          <li><strong>Switch back to User A</strong> - their original data should still be there!</li>
        </ol>
        
        <h3 style={{ color: '#991b1b', marginTop: '20px' }}>✅ Success Criteria:</h3>
        <ul>
          <li>✅ Each user has their own <code>nutriwell_[userID]_logged_foods</code> key</li>
          <li>✅ Each user has their own <code>nutriwell_[userID]_water_intake</code> key</li>
          <li>✅ Each user has their own <code>nutriwell_[userID]_notification_settings</code> key</li>
          <li>✅ When switching users, the data changes to match that user</li>
          <li>✅ User A's food items DON'T appear in User B's account</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <a href="/" style={{ color: '#2563eb', fontSize: '16px', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}

export default UserIsolationTest;
