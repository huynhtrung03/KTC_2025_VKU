package com.example.employee_management.entities;

// import java.time.LocalDate;
// import java.time.LocalDateTime;

// import org.springframework.data.annotation.CreatedDate;
// import org.springframework.data.annotation.LastModifiedDate;
// import org.springframework.data.jpa.domain.support.AuditingEntityListener;

// import com.example.employee_management.enums.Gender;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.EntityListeners;
// import jakarta.persistence.EnumType;
// import jakarta.persistence.Enumerated;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;
// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @Table(name = "employees")
// @EntityListeners(AuditingEntityListener.class)
// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// @Builder
// public class Employee {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
//     private String fullName;
//     @Column(unique = true)
//     private String email;
//     private String phoneNumber;
//     private LocalDate dateOfBirth;
//     @Enumerated(EnumType.STRING)
//     private Gender gender;
//     private boolean active;
//     private String hashedPassword;
//     @CreatedDate
//     private LocalDateTime createdDate;
//     @LastModifiedDate
//     private LocalDateTime updatedAt;
// }

// Tiếp theo trong file Employee.java

import com.example.employee_management.enums.Gender;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import jakarta.persistence.EntityListeners;

@Entity
@Table(name = "employees")
@EntityListeners(AuditingEntityListener.class)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Đảm bảo tên không trống và có độ dài hợp lệ
    @NotBlank(message = "Tên đầy đủ không được để trống")
    @Size(min = 4, max = 160, message = "Tên đầy đủ phải có từ 4 đến 160 ký tự")
    private String fullName;

    // Đảm bảo email duy nhất và đúng định dạng
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    @Column(unique = true)
    private String email;

    // Đảm bảo số điện thoại có đúng 10 chữ số
    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 10, max = 10, message = "Số điện thoại phải có đúng 10 ký tự")
    private String phoneNumber;

    @NotNull(message = "Ngày sinh không được để trống")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Giới tính không được để trống")
    private Gender gender;

    // Biến active phải có giá trị
    @NotNull(message = "Trạng thái active không được để trống")
    private Boolean active;

    private String hashedPassword;

    // Tự động thêm ngày tạo và cập nhật
    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
