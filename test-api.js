// Use built-in fetch if available (Node.js 18+)
async function testAPI() {
  try {
    // Test GET request
    console.log('Testing GET request...');
    const getResponse = await fetch('http://localhost:5000/api/students/students');
    const getData = await getResponse.json();
    console.log('GET response:', getData);

    // Test POST request
    console.log('\nTesting POST request...');
    const postData = {
      name: 'Test Student',
      regNo: 'TEST' + Date.now(),
      course: 'Computer Science',
      email: 'test@example.com',
      phone: '1234567890'
    };

    const postResponse = await fetch('http://localhost:5000/api/students/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    console.log('POST status:', postResponse.status);
    const postDataResponse = await postResponse.json();
    console.log('POST response:', postDataResponse);
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();