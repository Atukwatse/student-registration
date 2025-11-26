# Student Registration System with Java Integration

This is a full-stack student registration system with both Node.js and Java backends. The system allows administrators to manage student registrations and teachers to view student information.

## System Architecture

- **Frontend**: React.js application
- **Primary Backend**: Node.js with Express and MongoDB
- **Secondary Backend**: Java Spring Boot with MongoDB
- **Database**: MongoDB

## Features

1. **Admin Functionality** (Node.js backend):
   - Admin login
   - Student registration management
   - Approve/reject student applications
   - View all students

2. **Teacher Functionality** (Java backend):
   - Teacher login
   - View registered students

## Project Structure

```
student-registration/
├── backend/              # Node.js backend (port 5000)
├── frontend/             # React frontend (port 3000)
├── java-backend/         # Java Spring Boot backend (port 8080)
```

## Setup Instructions

### Prerequisites
- Node.js and npm
- Java 17 or higher
- Maven 3.6 or higher
- MongoDB

### Initial Setup
1. Install dependencies for all parts of the system:
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

### Running the System

You can start the entire system with a single command:

**Option 1: Using npm (recommended)**
```bash
npm start
```

**Option 2: Using the batch file (Windows)**
```bash
start-all.bat
```

**Option 3: Using the PowerShell script (Windows)**
```bash
.\start-all.ps1
```

This will automatically start:
1. Node.js backend (port 5000)
2. Java backend (port 8080)
3. React frontend (port 3000)

The frontend will automatically open in your browser at http://localhost:3000

### Manual Startup (Alternative)
If you prefer to start each service manually:

1. **Start MongoDB**
   Make sure MongoDB is running on your system.

2. **Start Node.js Backend**
   ```bash
   cd backend
   npm start
   ```

3. **Start Java Backend**
   ```bash
   cd java-backend
   mvn spring-boot:run
   ```

4. **Start Frontend**
   ```bash
   cd frontend
   npm start
   ```

## Testing the Integration

To verify that all components are properly integrated, run:
```bash
node test-integration.js
```

This will check if all required tools are available and provide instructions for starting the system.

## Accessing the System

- **Frontend**: http://localhost:3000
- **Admin Login**: 
  - Username: Blessing
  - Password: 12345
- **Teacher Login**:
  - Username: teacher
  - Password: teacher123

## API Endpoints

### Node.js Backend (Port 5000)
- Admin Login: POST `/api/students/login`
- Student Management: GET/POST/PUT/DELETE `/api/students/students`

### Java Backend (Port 8080)
- Teacher Login: POST `/api/teachers/login`
- View Students: GET `/api/teachers/students`

## How It Works

The system uses both Node.js and Java backends:
- Admin users interact with the Node.js backend
- Teacher users interact with the Java backend
- Both backends connect to the same MongoDB database
- The frontend determines which backend to call based on the user's role

This architecture allows you to gradually migrate functionality to Java while keeping the existing Node.js system operational.