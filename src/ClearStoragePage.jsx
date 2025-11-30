import React, { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';

function ClearStoragePage() {
  const { user } = useAuth();
  const [cleared, setCleared] = useState(false);
  const [removedKeys, setRemovedKeys] = useState([]);
  const [beforeData, setBeforeData] = useState({});
  const [afterData, setAfterData] = useState({});

  useEffect(() => {
    // Capture state BEFORE clearing
    captureLocalStorageState('before');
    // Auto-clear on component mount
    clearStorage();
  }, []);

  const captureLocalStorageState = (when) => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        const value = localStorage.getItem(key);
        data[key] = value;
      } catch (e) {
        data[key] = 'Error reading';
      }
    }
    
    if (when === 'before') {
      setBeforeData(data);
    } else {
      setAfterData(data);
    }
    
    console.log(`📸 LocalStorage snapshot (${when}):`, data);
  };  const clearStorage = async () => {
    console.log('🔍 Starting COMPLETE cleanup (localStorage + Backend)...');
    console.log('📊 Total localStorage items:', localStorage.length);
    console.log('👤 Current user:', user);
    
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i));
    }
    
    console.log('📋 All localStorage keys:', keys);
    
    const removed = [];
    
    // Step 1: Remove ALL nutrition-related localStorage keys (including user-specific ones)
    keys.forEach(key => {
      const value = localStorage.getItem(key);
      // Keep only 'user' and 'hasVisited' keys, remove EVERYTHING else including nutriwell_ prefixed keys
      if (key !== 'user' && key !== 'hasVisited' && key !== 'lastPath') {
        console.log('🗑️ Removing from localStorage:', key, '=', value?.substring(0, 50));
        removed.push(`${key} = ${value?.substring(0, 100) || 'empty'}...`);
        localStorage.removeItem(key);
      }
    });

    // Step 2: Delete nutrition data from backend if user is logged in
    if (user?.token) {
      console.log('🔄 Deleting nutrition data from backend...');
      try {
        const today = new Date().toISOString().split('T')[0];
        
        // Delete today's nutrition log from backend
        const deleteResponse = await fetch(`http://localhost:5000/api/nutrition/logs/${today}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (deleteResponse.ok) {
          console.log('✅ Successfully deleted nutrition data from backend');
          removed.push('Backend nutrition log deleted');
        } else {
          console.warn('⚠️ Could not delete from backend:', deleteResponse.status);
        }
      } catch (error) {
        console.error('❌ Error deleting from backend:', error);
      }
    }

    console.log('✅ Total items removed:', removed.length);
    console.log('📊 Remaining localStorage items:', localStorage.length);
    
    setRemovedKeys(removed);
    setCleared(true);
    
    // Capture state AFTER clearing
    setTimeout(() => {
      captureLocalStorageState('after');
      console.log('🔄 localStorage cleanup complete!');
      console.log('🎉 Now refresh the dashboard to see 0 values!');
    }, 100);
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '50px auto',
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#16a34a' }}>🧹 Storage Cleared!</h1>
      
      {cleared && (
        <div style={{
          padding: '15px',
          backgroundColor: '#dcfce7',
          borderRadius: '6px',
          marginBottom: '20px',
          color: '#16a34a'
        }}>
          <h3>✅ Successfully cleared {removedKeys.length} items</h3>
          {removedKeys.length > 0 && (
            <div>
              <p><strong>Removed keys:</strong></p>
              <ul style={{ textAlign: 'left' }}>
                {removedKeys.map((keyValue, index) => (
                  <li key={index} style={{ fontSize: '12px', fontFamily: 'monospace' }}>{keyValue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Show BEFORE localStorage state */}
      {Object.keys(beforeData).length > 0 && (
        <details style={{
          padding: '15px',
          backgroundColor: '#fff7ed',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            📊 LocalStorage BEFORE clearing ({Object.keys(beforeData).length} items)
          </summary>
          <pre style={{
            backgroundColor: '#f3f4f6',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '11px',
            marginTop: '10px'
          }}>
            {JSON.stringify(beforeData, null, 2)}
          </pre>
        </details>
      )}

      {/* Show AFTER localStorage state */}
      {Object.keys(afterData).length >= 0 && cleared && (
        <details style={{
          padding: '15px',
          backgroundColor: '#f0fdf4',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            📊 LocalStorage AFTER clearing ({Object.keys(afterData).length} items)
          </summary>
          <pre style={{
            backgroundColor: '#f3f4f6',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '11px',
            marginTop: '10px'
          }}>
            {JSON.stringify(afterData, null, 2)}
          </pre>
        </details>
      )}

      {user && (
        <div style={{
          padding: '15px',
          backgroundColor: '#e0f2fe',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          <p><strong>Current User:</strong> {user.email || user.id}</p>
        </div>
      )}

      <div style={{
        padding: '15px',
        backgroundColor: '#fef3c7',
        borderRadius: '6px',
        marginBottom: '20px'
      }}>
        <h3>⚠️ Next Steps:</h3>
        <ol style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li>Click the browser's <strong>Refresh button</strong> (F5 or Ctrl+R)</li>
          <li>Or <a href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>Click here to go back to Dashboard</a></li>
          <li>All nutrition values should now be <strong>0</strong> (zero)</li>
        </ol>
      </div>

      <button 
        onClick={() => window.location.href = '/'}
        style={{
          backgroundColor: '#16a34a',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          marginRight: '10px'
        }}
      >
        🏠 Go to Dashboard
      </button>

      <button 
        onClick={clearStorage}
        style={{
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        🗑️ Clear Again
      </button>
    </div>
  );
}

export default ClearStoragePage;
