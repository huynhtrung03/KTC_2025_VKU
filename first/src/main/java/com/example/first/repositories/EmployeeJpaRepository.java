package com.example.first.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.first.entities.Employee;

@Repository
public interface EmployeeJpaRepository extends JpaRepository<Employee, Long> {

}