// Direct MongoDB cleanup script
// Run this with: node clear-database.js (from backend folder)

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Define NutritionLog schema inline
const nutritionLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  foods: [{
    name: String,
    calories: Number,
    protein: Number,
    fats: Number,
    carbs: Number,
    _id: mongoose.Schema.Types.ObjectId
  }],
  waterIntake: { type: Number, default: 0 }
});

const NutritionLog = mongoose.model('NutritionLog', nutritionLogSchema);

async function clearDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/nutriwell';
    console.log('🔌 Connecting to MongoDB:', mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Get all users' nutrition logs
    const allLogs = await NutritionLog.find({});
    console.log(`\n📊 Found ${allLogs.length} total nutrition logs in database`);
    
    // Display all logs
    allLogs.forEach(log => {
      console.log(`\n📋 Log for user ${log.user}:`);
      console.log(`   Date: ${log.date}`);
      console.log(`   Foods: ${log.foods.length} items`);
      log.foods.forEach(food => {
        console.log(`      - ${food.name}: ${food.calories}cal, ${food.protein}g protein, ${food.fats}g fats`);
      });
      console.log(`   Water: ${log.waterIntake}L`);
    });

    // Ask for confirmation (for safety)
    console.log('\n⚠️  About to delete ALL nutrition logs from the database');
    console.log('🗑️  Deleting in 3 seconds... Press Ctrl+C to cancel');
    
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Delete ALL nutrition logs
    const deleteResult = await NutritionLog.deleteMany({});
    console.log(`\n✅ Successfully deleted ${deleteResult.deletedCount} nutrition logs from database`);

    // Verify deletion
    const remainingLogs = await NutritionLog.find({});
    console.log(`📊 Remaining nutrition logs: ${remainingLogs.length}`);

    if (remainingLogs.length === 0) {
      console.log('\n🎉 Database is now clean! All nutrition data has been removed.');
      console.log('💡 Now refresh your browser at http://localhost:3000/dashboard');
      console.log('   You should see 0g protein, 0g fats, 0 calories!');
    }

    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run the cleanup
clearDatabase();
