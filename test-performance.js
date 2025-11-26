const http = require('http');

// Test the GET endpoint performance
const start = Date.now();

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/students/students',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  
  res.on('end', () => {
    const end = Date.now();
    const duration = end - start;
    console.log(`Response time: ${duration}ms`);
    console.log(`Status: ${res.statusCode}`);
    console.log(`Student count: ${JSON.parse(data).length}`);
  });
});

req.on('error', error => {
  console.error('Error:', error);
});

req.end();