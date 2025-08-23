// package com.example.first.services;

// import org.springframework.stereotype.Service;

// import com.example.first.entities.Employee;
// import com.example.first.repositories.EmployeeJpaRepository;

// @Service
// public class EmployeeService {
//     private final EmployeeJpaRepository employeeJpaRepository;

//     public EmployeeService(EmployeeJpaRepository employeeJpaRepository) {
//         this.employeeJpaRepository = employeeJpaRepository;
//     }

//     public Employee createEmployee(Employee employee) {
//         return this.employeeJpaRepository.save(employee);
//     }

//     public Employee getEmployeeById(Long id) {
//         return this.employeeJpaRepository.findById(id).orElseThrow();
//     }

// }

package com.example.first.services;

import com.example.first.entities.Employee;
import com.example.first.repositories.EmployeeJpaRepository;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    private final EmployeeJpaRepository employeeJpaRepository;

    public EmployeeService(EmployeeJpaRepository employeeJpaRepository) {
        this.employeeJpaRepository = employeeJpaRepository;
    }

    public Employee createEmployee(Employee employee) {
        return employeeJpaRepository.save(employee);
    }
}