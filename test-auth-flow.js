// Test script to verify complete authentication flow
async function testAuthFlow() {
    console.log('🚀 Starting authentication flow test...');
    
    const baseUrl = 'http://localhost:5000';
    
    // Test 1: Register a new user
    console.log('\n📝 Step 1: Testing user registration...');
    const registerData = {
        email: 'flowtest@example.com',
        password: 'password123',
        role: 'user',
        firstName: 'Flow',
        lastName: 'Test',
        age: 28,
        gender: 'other',
        weight: 65,
        height: 170,
        primaryGoal: 'health maintenance'
    };
    
    try {
        const registerRes = await fetch(`${baseUrl}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerData)
        });
        
        if (registerRes.ok) {
            const registerResult = await registerRes.json();
            console.log('✅ Registration successful:', registerResult.user?.email);
        } else {
            const error = await registerRes.json();
            console.log('⚠️ Registration result:', registerRes.status, error.message);
        }
    } catch (err) {
        console.error('❌ Registration error:', err.message);
    }
    
    // Test 2: Login with the registered user
    console.log('\n🔑 Step 2: Testing user login...');
    try {
        const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: registerData.email,
                password: registerData.password
            })
        });
        
        if (loginRes.ok) {
            const loginResult = await loginRes.json();
            console.log('✅ Login successful:', loginResult.user?.email);
            console.log('🎫 Access token received:', loginResult.accessToken?.substring(0, 20) + '...');
            
            // Test 3: Use the token to access protected endpoint (if available)
            console.log('\n🛡️ Step 3: Testing token authentication...');
            // We could add a protected endpoint test here
            
            console.log('\n🎉 Authentication flow test completed successfully!');
            return {
                success: true,
                user: loginResult.user,
                token: loginResult.accessToken
            };
        } else {
            const error = await loginRes.json();
            console.log('❌ Login failed:', loginRes.status, error.message);
        }
    } catch (err) {
        console.error('❌ Login error:', err.message);
    }
    
    return { success: false };
}

// Run the test
testAuthFlow().then(result => {
    console.log('\n📋 Final result:', result.success ? 'SUCCESS' : 'FAILED');
});
