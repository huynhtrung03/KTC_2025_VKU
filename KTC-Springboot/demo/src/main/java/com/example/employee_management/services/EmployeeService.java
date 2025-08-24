// package com.example.employee_management.services;

// import java.util.List;
// import java.util.stream.Collectors;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import com.example.employee_management.dtos.EmployeeCreateRequestDto;
// import com.example.employee_management.dtos.EmployeeResponseDto;
// import com.example.employee_management.dtos.EmployeeUpdateRequestDto;
// import com.example.employee_management.dtos.Paging;
// import com.example.employee_management.entities.Employee;
// import com.example.employee_management.repositories.EmployeeJpaRepository;

// @Service
// public class EmployeeService {

//     @Autowired
//     private EmployeeJpaRepository employeeRepository;
//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     public EmployeeResponseDto convertToDto(Employee employee) {
//         if (employee == null) {
//             return null;
//         }

//         return EmployeeResponseDto.builder()
//                 .id(employee.getId())
//                 .fullName(employee.getFullName())
//                 .email(employee.getEmail())
//                 .dateOfBirth(employee.getDateOfBirth())
//                 .gender(employee.getGender())
//                 .phoneNumber(employee.getPhoneNumber())
//                 .active(employee.isActive())
//                 .build();
//     }

//     private boolean isEmailUnique(String email) {
//         return employeeRepository.findByEmail(email) == null;
//     }

//     public EmployeeResponseDto save(EmployeeCreateRequestDto createRequestDto) {
//         if (!isEmailUnique(createRequestDto.getEmail())) {
//             throw new IllegalArgumentException("Email already exists");
//         }

//         Employee employee = Employee.builder()
//                 .fullName(createRequestDto.getFullName())
//                 .email(createRequestDto.getEmail())
//                 .dateOfBirth(createRequestDto.getDateOfBirth())
//                 .gender(createRequestDto.getGender())
//                 .phoneNumber(createRequestDto.getPhoneNumber())
//                 .hashedPassword(passwordEncoder.encode(createRequestDto.getPassword()))
//                 .active(true)
//                 .build();
//         employee = employeeRepository.save(employee);
//         return convertToDto(employee);
//     }

//     public Paging<EmployeeResponseDto> getAllEmployees(int page, int size) {
//         Page<Employee> employeePage = employeeRepository.findAll(PageRequest.of(page, size));
//         List<EmployeeResponseDto> content = employeePage.getContent().stream()
//                 .map(this::convertToDto)
//                 .collect(Collectors.toList());
//         return Paging.<EmployeeResponseDto>builder()
//                 .data(content)
//                 .pageNumber(employeePage.getNumber())
//                 .pageSize(employeePage.getSize())
//                 .totalRecords(employeePage.getTotalElements())
//                 .totalPages(employeePage.getTotalPages())
//                 .hasNext(employeePage.hasNext())
//                 .hasPrevious(employeePage.hasPrevious())
//                 .build();
//     }

//     public EmployeeResponseDto getEmployeeById(Long id) {
//         Employee employee = employeeRepository.findById(id)
//                 .orElseThrow(() -> new IllegalArgumentException("Employee not found"));
//         return convertToDto(employee);
//     }

//     public EmployeeResponseDto update(Long id, EmployeeUpdateRequestDto requestDto) {
//         Employee employee = employeeRepository.findById(id)
//                 .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

//         employee.setFullName(requestDto.getFullName());
//         employee.setPhoneNumber(requestDto.getPhoneNumber());
//         employee.setDateOfBirth(requestDto.getDateOfBirth());
//         employee.setGender(requestDto.getGender());
//         if (requestDto.getPassword() != null) {
//             employee.setHashedPassword(passwordEncoder.encode(requestDto.getPassword()));
//         }

//         employee = employeeRepository.save(employee);
//         return convertToDto(employee);
//     }

//     public EmployeeResponseDto delete(Long id) {
//         Employee employee = employeeRepository.findById(id)
//                 .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

//         employeeRepository.delete(employee);
//         return convertToDto(employee);
//     }
// }

// File: src/main/java/com/example/employee_management/services/EmployeeService.java

package com.example.employee_management.services;

import com.example.employee_management.dtos.EmployeeCreateRequestDto;
import com.example.employee_management.dtos.EmployeeResponseDto;
import com.example.employee_management.dtos.EmployeeUpdateRequestDto;
import com.example.employee_management.dtos.Pagination;
import com.example.employee_management.entities.Employee;
import com.example.employee_management.repositories.EmployeeJpaRepository;
// import com.example.employee_management.exceptions.GlobalExceptionHandler.CustomErrorResponse;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeJpaRepository employeeRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    // File:
    // src/main/java/com/example/employee_management/services/EmployeeService.java
    // (Tiếp theo)

    // Phương thức chuyển đổi Entity sang DTO để không trả về mật khẩu
    // và đảm bảo cấu trúc trả về đúng như yêu cầu.
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
                .createdDate(employee.getCreatedDate())
                .updatedAt(employee.getUpdatedAt())
                .build();
    }

    // Phương thức lấy danh sách nhân viên có phân trang
    public Pagination<EmployeeResponseDto> getAllEmployees(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Employee> employeePage = employeeRepository.findAll(pageRequest);

        List<EmployeeResponseDto> employeeDtos = employeePage.getContent().stream()
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

    // Phương thức lấy thông tin một nhân viên theo ID
    public EmployeeResponseDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));
        return convertToDto(employee);
    }

    // Phương thức lưu nhân viên mới từ DTO đầu vào
    public EmployeeResponseDto save(EmployeeCreateRequestDto requestDto) {
        // Kiểm tra xem email đã tồn tại hay chưa
        if (employeeRepository.findByEmail(requestDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email đã tồn tại");
        }

        Employee employee = Employee.builder()
                .fullName(requestDto.getFullName())
                .email(requestDto.getEmail())
                .phoneNumber(requestDto.getPhoneNumber())
                .dateOfBirth(requestDto.getDateOfBirth())
                .gender(requestDto.getGender())
                .active(true) // Mặc định là active
                .hashedPassword(passwordEncoder.encode(requestDto.getPassword()))
                .build();

        employee = employeeRepository.save(employee);
        return convertToDto(employee);
    }

    // Phương thức cập nhật thông tin nhân viên
    public EmployeeResponseDto update(Long id, EmployeeUpdateRequestDto requestDto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

        employee.setFullName(requestDto.getFullName());
        employee.setPhoneNumber(requestDto.getPhoneNumber());
        employee.setDateOfBirth(requestDto.getDateOfBirth());
        employee.setGender(requestDto.getGender());
        if (requestDto.getPassword() != null && !requestDto.getPassword().isEmpty()) {
            employee.setHashedPassword(passwordEncoder.encode(requestDto.getPassword()));
        }

        employee = employeeRepository.save(employee);
        return convertToDto(employee);
    }

    // Phương thức xóa nhân viên
    public EmployeeResponseDto delete(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

        employeeRepository.delete(employee);
        return convertToDto(employee);
    }

}
