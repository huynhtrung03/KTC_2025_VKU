package com.example.employee_management.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.employee_management.dtos.EmployeeCreateRequestDto;
import com.example.employee_management.dtos.EmployeeResponseDto;
import com.example.employee_management.dtos.EmployeeUpdateRequestDto;
import com.example.employee_management.dtos.Pagination;
import com.example.employee_management.entities.Employee;
import com.example.employee_management.repositories.EmployeeJpaRepository;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeJpaRepository employeeJpaRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public EmployeeResponseDto convertToDto(Employee employee) {
        if (employee == null) {
            return null;
        }
        return EmployeeResponseDto.builder()
                .id(employee.getId())
                .fullName(employee.getFullName())
                .email(employee.getEmail())
                .dateOfBirth(employee.getDateOfBirth())
                .gender(employee.getGender())
                .phoneNumber(employee.getPhoneNumber())
                .active(employee.getActive())
                // .createdAt(employee.getCreatedAt())
                // .updatedAt(employee.getUpdatedAt())
                .build();
    }

    public EmployeeResponseDto save(EmployeeCreateRequestDto requestDto) {
        if (employeeJpaRepository.findByEmail(requestDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");

        }
        Employee employee = Employee.builder()
                .fullName(requestDto.getFullName())
                .email(requestDto.getEmail())
                .dateOfBirth(requestDto.getDateOfBirth())
                .gender(requestDto.getGender())
                .phoneNumber(requestDto.getPhoneNumber())
                .active(true)
                .hashedPassword(passwordEncoder.encode(requestDto.getPassword()))
                .build();
        employee = employeeJpaRepository.save(employee);
        return convertToDto(employee);
    }

    public Pagination<EmployeeResponseDto> getAllEmployees(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Employee> employeePage = employeeJpaRepository.findAll(pageRequest);

        List<EmployeeResponseDto> employeeDtos = employeePage.getContent()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return Pagination.<EmployeeResponseDto>builder()
                .data(employeeDtos)
                .pageNumber(employeePage.getNumber())
                .pageSize(employeePage.getSize())
                .totalRecords(employeePage.getTotalElements())
                .totalPages(employeePage.getTotalPages())
                .hasNext(employeePage.hasNext())
                .hasPrevious(employeePage.hasPrevious())
                .build();
    }

    public EmployeeResponseDto getEmployeeById(Long id) {
        Employee employee = employeeJpaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));
        return convertToDto(employee);
    }

    public EmployeeResponseDto update(Long id, EmployeeUpdateRequestDto requestDto) {
        Employee employee = employeeJpaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

        employee.setFullName(requestDto.getFullName());
        employee.setDateOfBirth(requestDto.getDateOfBirth());
        employee.setGender(requestDto.getGender());
        employee.setPhoneNumber(requestDto.getPhoneNumber());
        if (requestDto.getPassword() != null && !requestDto.getPassword().isEmpty()) {
            employee.setHashedPassword(passwordEncoder.encode(requestDto.getPassword()));
        }

        employee = employeeJpaRepository.save(employee);
        return convertToDto(employee);
    }

    public EmployeeResponseDto delete(Long id) {
        Employee employee = employeeJpaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));
        employeeJpaRepository.delete(employee);
        return convertToDto(employee);
    }

}
