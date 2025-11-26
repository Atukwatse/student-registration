# Java Backend for Student Registration System

This is a Java Spring Boot application that provides teacher login functionality and student data access for the student registration system.

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MongoDB (same instance as the Node.js backend)

## Setup

1. Make sure MongoDB is running and accessible
2. Update the MongoDB connection string in `src/main/resources/application.properties` if needed

## Running the Application

1. Navigate to the java-backend directory:
   ```
   cd java-backend
   ```

2. Build the application:
   ```
   mvn clean package
   ```

3. Run the application:
   ```
   java -jar target/java-backend-1.0.0.jar
   ```

   Or using Maven:
   ```
   mvn spring-boot:run
   ```

## API Endpoints

- Teacher Login: `POST http://localhost:8080/api/teachers/login`
- Get All Students: `GET http://localhost:8080/api/teachers/students`

## Teacher Login Credentials

- Username: `teacher`
- Password: `teacher123`

## Integration with Existing System

This Java backend works alongside the existing Node.js backend:
- Node.js backend runs on port 5000
- Java backend runs on port 8080
- Both connect to the same MongoDB database
- Frontend can access both backends based on user role