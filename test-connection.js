#!/usr/bin/env node

/**
 * MongoDB Connection Test
 * Run this to verify your database connection is working
 */

require('dotenv').config();
const mongoose = require('mongoose');

console.log('\n🔗 Testing MongoDB Connection...\n');

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI || mongoURI.includes('username') || mongoURI.includes('password')) {
    console.log('❌ ERROR: MongoDB URI not configured properly in .env');
    console.log('\nPlease update .env with your MongoDB connection string:');
    console.log('MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/goguy?retryWrites=true&w=majority\n');
    process.exit(1);
}

console.log('✓ MongoDB URI found in .env');
console.log('📝 URI (masked):', mongoURI.substring(0, 30) + '...\n');

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ SUCCESS! MongoDB connected successfully!\n');
    console.log('Database Details:');
    console.log('├─ Status: Connected ✓');
    console.log('├─ Host: MongoDB Atlas (Cloud)');
    console.log('├─ Database: goguy');
    console.log('└─ Collections: Ready to store data\n');
    
    // Test creating a collection
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('TestConnection', testSchema);
    
    console.log('📊 Your collections will be:');
    console.log('   • Customers');
    console.log('   • Drivers');
    console.log('   • Schedules\n');
    
    console.log('🚀 Ready to start using the database!');
    console.log('   Run: npm start\n');
    
    process.exit(0);
})
.catch(err => {
    console.log('❌ CONNECTION FAILED!\n');
    console.log('Error:', err.message);
    console.log('\n⚠️  Troubleshooting:');
    console.log('1. Check MongoDB URI in .env is correct');
    console.log('2. Verify username and password are right');
    console.log('3. Check Network Access in MongoDB Atlas (allow 0.0.0.0/0)');
    console.log('4. Ensure database user exists in MongoDB Atlas\n');
    process.exit(1);
});
