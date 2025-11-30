import React, { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useNutrition } from './contexts/NutritionContext';

function DebugNutritionPage() {
  const { user } = useAuth();
  const { loggedFoods, waterIntake, dailyStats } = useNutrition();
  const [backendData, setBackendData] = useState(null);
  const [localStorageData, setLocalStorageData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBackendData();
    loadLocalStorageData();
  }, []);

  const loadBackendData = async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(`http://localhost:5000/api/nutrition/logs?from=${today}&to=${today}`, {
        headers: { 
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json' 
        },
      });
      const data = await response.json();
      setBackendData(data);
      console.log('🔍 Backend Data:', data);
    } catch (error) {
      console.error('❌ Backend Error:', error);
      setBackendData({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const loadLocalStorageData = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        const value = localStorage.getItem(key);
        if (key.includes('nutriwell') || key.includes('logged') || key.includes('water')) {
          data[key] = JSON.parse(value);
        }
      } catch (e) {
        data[key] = localStorage.getItem(key);
      }
    }
    setLocalStorageData(data);
    console.log('💾 LocalStorage Data:', data);
  };

  const nukeEverything = async () => {
    console.log('💣 NUCLEAR OPTION: Deleting EVERYTHING...');
    
    // 1. Clear ALL localStorage
    localStorage.clear();
    console.log('✅ Cleared ALL localStorage');
    
    // 2. Delete ALL backend logs
    if (user?.token) {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`http://localhost:5000/api/nutrition/logs/${today}`, {
          method: 'DELETE',
          headers: { 
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json' 
          },
        });
        console.log('✅ Deleted backend data:', await response.json());
      } catch (error) {
        console.error('❌ Backend delete error:', error);
      }
    }
    
    // 3. Force reload
    alert('💥 Everything nuked! Reloading page...');
    window.location.href = '/';
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '20px', fontFamily: 'monospace' }}>
      <h1 style={{ color: '#ef4444' }}>🔍 Nutrition Debug Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Context Data */}
        <div style={{ backgroundColor: '#fef3c7', padding: '20px', borderRadius: '8px' }}>
          <h2>📊 NutritionContext Data</h2>
          <pre style={{ fontSize: '11px', overflow: 'auto' }}>
            {JSON.stringify({
              dailyStats,
              loggedFoods,
              waterIntake
            }, null, 2)}
          </pre>
        </div>

        {/* Backend Data */}
        <div style={{ backgroundColor: '#e0f2fe', padding: '20px', borderRadius: '8px' }}>
          <h2>🌐 Backend Data</h2>
          {loading ? <p>Loading...</p> : (
            <pre style={{ fontSize: '11px', overflow: 'auto' }}>
              {JSON.stringify(backendData, null, 2)}
            </pre>
          )}
          <button onClick={loadBackendData} style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}>
            🔄 Reload Backend Data
          </button>
        </div>

        {/* LocalStorage Data */}
        <div style={{ backgroundColor: '#f3e8ff', padding: '20px', borderRadius: '8px' }}>
          <h2>💾 LocalStorage Data</h2>
          <pre style={{ fontSize: '11px', overflow: 'auto' }}>
            {JSON.stringify(localStorageData, null, 2)}
          </pre>
          <button onClick={loadLocalStorageData} style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}>
            🔄 Reload LocalStorage
          </button>
        </div>

        {/* User Info */}
        <div style={{ backgroundColor: '#dcfce7', padding: '20px', borderRadius: '8px' }}>
          <h2>👤 User Info</h2>
          <pre style={{ fontSize: '11px', overflow: 'auto' }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ backgroundColor: '#fee2e2', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
        <h2>⚠️ DANGER ZONE</h2>
        <button 
          onClick={nukeEverything}
          style={{ 
            backgroundColor: '#ef4444', 
            color: 'white', 
            padding: '12px 24px', 
            fontSize: '16px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          💣 NUKE EVERYTHING (Clear All Data & Reload)
        </button>
        <p style={{ marginTop: '10px', fontSize: '12px', color: '#991b1b' }}>
          This will delete ALL localStorage and backend data, then reload the page
        </p>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <a href="/" style={{ color: '#2563eb', fontSize: '16px' }}>← Back to Dashboard</a>
      </div>
    </div>
  );
}

export default DebugNutritionPage;
