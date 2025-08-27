package com.example.employee_management.dtos;

import java.time.LocalDate;

import com.example.employee_management.enums.Gender;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeUpdateRequestDto {

    @NotBlank(message = "Full name is mandatory")
    @Size(min = 4, max = 100, message = "Full name must be between 4 and 100 characters")
    private String fullName;

    @NotBlank(message = "Phone number is mandatory")
    @Size(min = 10, max = 10, message = "Phone number must be 10 characters")
    private String phoneNumber;

    @NotNull(message = "Date of birth is mandatory")
    private LocalDate dateOfBirth;

    @NotNull(message = "Gender is mandatory")
    private Gender gender;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

}
