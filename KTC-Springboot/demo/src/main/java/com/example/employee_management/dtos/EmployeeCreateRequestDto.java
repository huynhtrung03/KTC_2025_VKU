// package com.example.employee_management.dtos;

// import java.time.LocalDate;

// import org.hibernate.validator.constraints.Length;

// import com.example.employee_management.enums.Gender;

// import jakarta.validation.constraints.Email;
// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// @Builder
// public class EmployeeCreateRequestDto {
//     @Length(min = 4, message = "Full name must be at least 4 characters long")
//     @Length(max = 160, message = "Full name must be at most 160 characters long")
//     private String fullName;
//     @Email(message = "Email should be valid")
//     private String email;
//     @Length(min = 10, max = 10, message = "Phone number must be exactly 10 digits")
//     private String phoneNumber;
//     private LocalDate dateOfBirth;
//     private Gender gender;
//     private String password;
// }

// File: src/main/java/com/example/employee_management/dtos/EmployeeCreateRequestDto.java

package com.example.employee_management.dtos;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import com.example.employee_management.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeCreateRequestDto {

    // Họ và tên không được trống và có độ dài hợp lệ
    @NotBlank(message = "Tên không được để trống")
    @Size(min = 4, max = 160, message = "Tên phải có từ 4 đến 160 ký tự")
    private String fullName;

    // Email không được trống và đúng định dạng
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String email;

    // Ngày sinh không được trống
    @NotNull(message = "Ngày sinh không được để trống")
    private LocalDate dateOfBirth;

    // Giới tính không được trống
    @NotNull(message = "Giới tính không được để trống")
    private Gender gender;

    // Số điện thoại không được trống và đủ 10 ký tự
    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 10, max = 10, message = "Số điện thoại phải có 10 ký tự")
    private String phoneNumber;

    // Mật khẩu không được trống
    @NotBlank(message = "Mật khẩu không được để trống")
    @Size(min = 6, message = "Mật khẩu phải có ít nhất 6 ký tự")
    private String password;
}
