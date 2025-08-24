// package com.example.employee_management.dtos;

// import java.time.LocalDate;

// import com.example.employee_management.enums.Gender;

// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// @Builder
// public class EmployeeResponseDto {
//     private Long id;
//     private String fullName;
//     private String email;
//     private LocalDate dateOfBirth;
//     private Gender gender;
//     private String phoneNumber;
//     private Boolean active;

// }

// File: src/main/java/com/example/employee_management/dtos/EmployeeResponseDto.java

package com.example.employee_management.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.employee_management.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeResponseDto {
    private Long id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private Gender gender;
    private Boolean active;
    private LocalDateTime createdDate;
    private LocalDateTime updatedAt;
}
