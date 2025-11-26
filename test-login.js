// Using built-in fetch instead of node-fetch
async function testLogin() {
  try {
    const response = await fetch('http://localhost:5000/api/students/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'Blessing', password: '12345' })
    });
    
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testLogin();