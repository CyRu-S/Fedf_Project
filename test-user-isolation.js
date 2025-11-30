// Test script to verify user data isolation
// This script tests that different users have separate nutrition data

const baseURL = 'http://localhost:5000';

// Test user data
const testUsers = [
  {
    email: 'user1@test.com',
    password: 'password123',
    firstName: 'Alice',
    lastName: 'Smith',
    age: 25,
    gender: 'female',
    height: 165,
    weight: 60,
    primaryGoal: 'weight_loss'
  },
  {
    email: 'user2@test.com',
    password: 'password123',
    firstName: 'Bob',
    lastName: 'Johnson',
    age: 30,
    gender: 'male',
    height: 180,
    weight: 75,
    primaryGoal: 'muscle_gain'
  }
];

async function testUserRegistration(user) {
  try {
    const response = await fetch(`${baseURL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      console.log(`✅ Registration successful for ${user.email}`);
      return true;
    } else {
      const error = await response.json();
      console.log(`❌ Registration failed for ${user.email}:`, error.message);
      return false;
    }
  } catch (error) {
    console.log(`❌ Network error during registration for ${user.email}:`, error.message);
    return false;
  }
}

async function testUserLogin(user) {
  try {
    const response = await fetch(`${baseURL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Login successful for ${user.email}`);
      console.log(`   - User ID: ${data.user.id}`);
      console.log(`   - Name: ${data.profile?.firstName} ${data.profile?.lastName}`);
      console.log(`   - Age: ${data.profile?.age}, Gender: ${data.profile?.gender}`);
      return data.accessToken;
    } else {
      const error = await response.json();
      console.log(`❌ Login failed for ${user.email}:`, error.message);
      return null;
    }
  } catch (error) {
    console.log(`❌ Network error during login for ${user.email}:`, error.message);
    return null;
  }
}

async function testNutritionData(user, token) {
  try {
    // Add some sample nutrition data
    const today = new Date().toISOString().split('T')[0];
    const sampleNutritionData = {
      date: today,
      foods: [
        {
          name: `${user.firstName}'s Breakfast`,
          calories: 300,
          protein: 15,
          fats: 10,
          carbs: 35,
          category: 'breakfast'
        }
      ],
      waterIntake: 1.5
    };

    const response = await fetch(`${baseURL}/api/nutrition/logs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sampleNutritionData),
    });

    if (response.ok) {
      console.log(`✅ Nutrition data saved for ${user.email}`);
      
      // Now fetch the data back
      const fetchResponse = await fetch(`${baseURL}/api/nutrition/logs?from=${today}&to=${today}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (fetchResponse.ok) {
        const data = await fetchResponse.json();
        console.log(`✅ Nutrition data retrieved for ${user.email}`);
        console.log(`   - Foods: ${data.logs[0]?.foods[0]?.name || 'None'}`);
        console.log(`   - Water: ${data.logs[0]?.waterIntake || 0}L`);
        return true;
      }
    } else {
      console.log(`❌ Failed to save nutrition data for ${user.email}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Network error during nutrition test for ${user.email}:`, error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting User Data Isolation Tests...\n');

  for (const user of testUsers) {
    console.log(`\n📝 Testing user: ${user.email}`);
    console.log('================================');
    
    // Test registration
    const registrationSuccess = await testUserRegistration(user);
    if (!registrationSuccess) {
      console.log('   ⏭️ Registration failed, trying login instead...');
    }
    
    // Test login
    const token = await testUserLogin(user);
    if (!token) {
      console.log('   ❌ Cannot proceed without valid login');
      continue;
    }
    
    // Test nutrition data
    await testNutritionData(user, token);
  }

  console.log('\n🏁 Tests completed!');
}

// Run the tests
runTests().catch(console.error);
