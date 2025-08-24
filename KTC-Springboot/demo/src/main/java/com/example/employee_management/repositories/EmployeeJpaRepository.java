// package com.example.employee_management.repositories;

// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import com.example.employee_management.entities.Employee;

// @Repository
// public interface EmployeeJpaRepository extends JpaRepository<Employee, Long> {

//     Employee findByEmail(String email);

//     Page<Employee> findAll(Pageable pageable);

// }

// File: src/main/java/com/example/employee_management/repositories/EmployeeJpaRepository.java

package com.example.employee_management.repositories;

import com.example.employee_management.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeJpaRepository extends JpaRepository<Employee, Long> {

    // Spring Data JPA sẽ tự động tạo phương thức này
    // để kiểm tra xem một email đã tồn tại hay chưa.
    // Việc kiểm tra này giúp ta tránh được lỗi trùng lặp dữ liệu.
    Optional<Employee> findByEmail(String email);
}
