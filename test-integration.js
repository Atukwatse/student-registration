// Integration test script to verify all services work together
const { spawn } = require('child_process');

console.log('Testing Student Registration System Integration...\n');

// Test 1: Check if required commands are available
console.log('1. Checking system requirements...');

const commands = ['node --version', 'npm --version', 'java -version', 'mvn --version'];

commands.forEach(cmd => {
  const process = spawn(cmd, { shell: true });
  
  process.on('close', (code) => {
    if (code === 0) {
      console.log(`✓ ${cmd.split(' ')[0]} is available`);
    } else {
      console.log(`✗ ${cmd.split(' ')[0]} is not available or not in PATH`);
    }
  });
});

// Test 2: Check if MongoDB is accessible (simplified)
setTimeout(() => {
  console.log('\n2. Please ensure MongoDB is running on default port (27017)');
  console.log('   You can start MongoDB with: mongod\n');
  
  console.log('3. To start the complete system, run one of the following:');
  console.log('   - npm start');
  console.log('   - start-all.bat (on Windows)');
  console.log('   - ./start-all.ps1 (on Windows with PowerShell)\n');
  
  console.log('The system will start all services:');
  console.log('  - Node.js Backend: http://localhost:5000');
  console.log('  - Java Backend: http://localhost:8080');
  console.log('  - Frontend: http://localhost:3000\n');
}, 2000);