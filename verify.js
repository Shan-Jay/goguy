#!/usr/bin/env node

/**
 * GoGuy Database Setup Verification Script
 * Run this to verify your setup is correct
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 GoGuy Setup Verification\n');

const checks = [];

// Check 1: Node.js
console.log('✓ Node.js version:', process.version);
checks.push(true);

// Check 2: package.json
if (fs.existsSync('./package.json')) {
    console.log('✓ package.json found');
    checks.push(true);
} else {
    console.log('✗ package.json missing');
    checks.push(false);
}

// Check 3: server.js
if (fs.existsSync('./server.js')) {
    console.log('✓ server.js found');
    checks.push(true);
} else {
    console.log('✗ server.js missing');
    checks.push(false);
}

// Check 4: index.html
if (fs.existsSync('./index.html')) {
    console.log('✓ index.html found');
    checks.push(true);
} else {
    console.log('✗ index.html missing');
    checks.push(false);
}

// Check 5: .env
if (fs.existsSync('./.env')) {
    const envContent = fs.readFileSync('./.env', 'utf8');
    if (envContent.includes('MONGODB_URI')) {
        console.log('✓ .env file configured');
        checks.push(true);
    } else {
        console.log('⚠ .env file missing MONGODB_URI');
        checks.push(false);
    }
} else {
    console.log('✗ .env file missing');
    checks.push(false);
}

// Check 6: Dependencies
if (fs.existsSync('./node_modules')) {
    console.log('✓ Dependencies installed');
    checks.push(true);
} else {
    console.log('⚠ Dependencies not installed. Run: npm install');
    checks.push(false);
}

console.log('\n' + '='.repeat(40));
const passed = checks.filter(c => c).length;
const total = checks.length;
console.log(`Results: ${passed}/${total} checks passed`);
console.log('='.repeat(40) + '\n');

if (passed === total) {
    console.log('✅ Your setup looks good!');
    console.log('\nNext steps:');
    console.log('1. Ensure MongoDB URI is correct in .env');
    console.log('2. Run: npm start');
    console.log('3. Visit: http://localhost:5000\n');
} else {
    console.log('⚠️  Please fix the issues above before proceeding.\n');
    console.log('See SETUP_GUIDE.md for detailed instructions.\n');
}
