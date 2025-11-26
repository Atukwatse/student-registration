// Test script for Java backend endpoints
async function testJavaEndpoints() {
  console.log('Testing Java Backend Endpoints...\n');
  
  // Test teacher login
  try {
    console.log('1. Testing Teacher Login...');
    const loginResponse = await fetch('http://localhost:8080/api/teachers/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: 'teacher', 
        password: 'teacher123' 
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login Response:', loginData);
    console.log('Login Success:', loginData.success);
    
    // Test get students
    console.log('\n2. Testing Get Students...');
    const studentsResponse = await fetch('http://localhost:8080/api/teachers/students');
    const studentsData = await studentsResponse.json();
    console.log('Students Count:', studentsData.length);
    console.log('First Student (if any):', studentsData[0]);
    
  } catch (error) {
    console.error('Error testing Java endpoints:', error);
  }
}

// Run the test
testJavaEndpoints();