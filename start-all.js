#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('==========================================');
console.log('Student Registration System');
console.log('==========================================\n');

console.log('Starting all services...\n');
console.log('Please ensure MongoDB is running before proceeding.');
console.log('Press Ctrl+C to stop all services.\n');

// Keep track of running processes
let processes = [];

// Function to start a service
function startService(command, cwd, name) {
  console.log(`Starting ${name}...`);
  
  const service = spawn(command, {
    cwd: cwd,
    shell: true,
    stdio: 'inherit'
  });
  
  service.name = name;
  
  service.on('error', (error) => {
    console.error(`Error starting ${name}:`, error);
  });
  
  service.on('close', (code) => {
    console.log(`${name} exited with code ${code}`);
    // Remove from processes array
    const index = processes.indexOf(service);
    if (index > -1) {
      processes.splice(index, 1);
    }
    
    // If this is the frontend and it exited normally, that's okay
    if (name === 'Frontend' && code === 0) {
      console.log('Frontend started successfully and is running in the background.');
      return;
    }
    
    // If any critical service exits unexpectedly, terminate all
    if (code !== 0 && processes.length > 0) {
      console.log(`\n${name} exited unexpectedly. Terminating all services...`);
      processes.forEach(proc => {
        if (!proc.killed) {
          proc.kill('SIGTERM');
        }
      });
    }
  });
  
  processes.push(service);
  return service;
}

// Change to the project root directory
process.chdir(__dirname);

// Start Node.js backend
const nodeBackend = startService(
  'npm run start:backend',
  __dirname,
  'Node.js Backend (Port 5000)'
);

// Start Java backend (if Maven is available)
const javaBackend = startService(
  'npm run start:java',
  __dirname,
  'Java Backend (Port 8080)'
);

// Start frontend almost immediately
setTimeout(() => {
  const frontend = startService(
    'npm run start:frontend',
    __dirname,
    'Frontend (Port 3000)'
  );
}, 1000);

console.log('\nServices starting:');
console.log('- Node.js Backend: http://localhost:5000');
console.log('- Java Backend: http://localhost:8080 (if Maven is installed)');
console.log('- Frontend: http://localhost:3000');
console.log('\nThe frontend will automatically open in your browser once ready.');
console.log('Use Ctrl+C to stop all services.\n');

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\nReceived SIGINT. Shutting down gracefully...');
  processes.forEach(proc => {
    if (!proc.killed) {
      console.log(`Terminating ${proc.name}...`);
      proc.kill('SIGTERM');
    }
  });
  
  // Give processes time to shut down
  setTimeout(() => {
    console.log('All services terminated.');
    process.exit(0);
  }, 2000);
});