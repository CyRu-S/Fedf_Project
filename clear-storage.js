// Run this script in your browser's console (F12 -> Console tab)
// Or copy-paste it into the console while on http://localhost:3000

console.log('🧹 Starting localStorage cleanup...');

// Get all keys before cleanup
const allKeys = [];
for (let i = 0; i < localStorage.length; i++) {
    allKeys.push(localStorage.key(i));
}

console.log('📋 Current localStorage keys:', allKeys);

// Remove all nutrition-related keys
let count = 0;
allKeys.forEach(key => {
    if (key.includes('nutriwell_') || 
        key === 'logged_foods' || 
        key === 'water_intake' ||
        key.includes('notification_settings') ||
        key.includes('migrated')) {
        console.log('🗑️ Removing:', key);
        localStorage.removeItem(key);
        count++;
    }
});

console.log(`✅ Cleared ${count} nutrition-related items`);
console.log('🔄 Remaining keys:', Object.keys(localStorage));

// Display current user
const user = localStorage.getItem('user');
if (user) {
    const userData = JSON.parse(user);
    console.log('👤 Current user:', userData);
    
    // Clear all data for this user
    const userKey = `nutriwell_${userData.id}`;
    localStorage.removeItem(`${userKey}_logged_foods`);
    localStorage.removeItem(`${userKey}_water_intake`);
    localStorage.removeItem(`${userKey}_notification_settings`);
    console.log(`✅ Cleared all data for user: ${userData.email}`);
}

console.log('✨ Cleanup complete! Refresh the page to see changes.');
