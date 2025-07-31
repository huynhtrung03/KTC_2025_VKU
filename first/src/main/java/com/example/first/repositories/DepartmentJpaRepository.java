package com.example.first.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.first.entities.Department;

public interface DepartmentJpaRepository extends JpaRepository<Department, Long> {

}
