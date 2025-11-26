package com.studentregistration.repository;

import com.studentregistration.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    // Additional custom query methods can be added here if needed
}