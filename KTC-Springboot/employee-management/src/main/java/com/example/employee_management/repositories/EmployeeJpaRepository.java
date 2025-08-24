package com.example.employee_management.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.employee_management.entities.Employee;

@Repository
public interface EmployeeJpaRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
}
