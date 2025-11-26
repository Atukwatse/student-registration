const http = require('http');

// Test the approve endpoint
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/students/students/690a3e5b48e3d961fd46409b/approve',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, res => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', error => {
  console.error('Error:', error);
});

req.end();