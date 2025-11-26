package com.studentregistration.controller;

import com.studentregistration.model.Student;
import com.studentregistration.model.LoginRequest;
import com.studentregistration.model.LoginResponse;
import com.studentregistration.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController {

    @Autowired
    private StudentService studentService;

    // Teacher login endpoint
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> teacherLogin(@RequestBody LoginRequest loginRequest) {
        // For demonstration, we'll use hardcoded teacher credentials
        // In a real application, you would check against a database
        if ("teacher".equals(loginRequest.getUsername()) && "teacher123".equals(loginRequest.getPassword())) {
            LoginResponse response = new LoginResponse();
            response.setSuccess(true);
            response.setMessage("Login successful");
            response.setRole("teacher");
            return ResponseEntity.ok(response);
        } else {
            LoginResponse response = new LoginResponse();
            response.setSuccess(false);
            response.setMessage("Invalid username or password");
            return ResponseEntity.ok(response);
        }
    }

    // Get all students for teachers
    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }
}