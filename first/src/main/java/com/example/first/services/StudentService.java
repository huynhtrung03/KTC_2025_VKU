package com.example.first.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.first.dtos.CourseResponseDto;
import com.example.first.dtos.CreateStudentRequestDto;
import com.example.first.dtos.DepartmentResponseDto;
import com.example.first.dtos.StudentPageResponseDto;
import com.example.first.dtos.StudentResponseDto;
import com.example.first.dtos.UpdateStudentRequestDto;
import com.example.first.entities.Course;
import com.example.first.entities.Department;
import com.example.first.entities.Student;
import com.example.first.repositories.StudentJpaRepository;
import com.example.first.repositories.StudentProjection;

@Service
public class StudentService {
    private StudentJpaRepository studentJpaRepository;

    public StudentService(StudentJpaRepository studentJpaRepository) {
        this.studentJpaRepository = studentJpaRepository;
    }

    public CourseResponseDto toResponseDto(Course course) {
        return CourseResponseDto.builder()
                .id(course.getId())
                .name(course.getName())
                .build();
    }

    public DepartmentResponseDto toDepartmentResponseDto(Department department) {
        return DepartmentResponseDto.builder()
                .id(department.getId())
                .name(department.getName())
                .build();
    }

    public StudentResponseDto convertDto(Student student) {
        return StudentResponseDto.builder()
                .id(student.getId())
                .name(student.getName())
                .email(student.getEmail())
                .address(student.getAddress())
                .department(student.getDepartment() != null ? toDepartmentResponseDto(student.getDepartment()) : null)
                .courses(student.getCourses() != null ? student.getCourses().stream()
                        .map(this::toResponseDto)
                        .toList() : null)
                .build();
    }

    public List<StudentResponseDto> getAllStudents() {
        List<StudentResponseDto> students = studentJpaRepository.findAll().stream()
                .map(this::convertDto)
                .toList();

        return students;
    }

    public StudentResponseDto getStudentById(Long id) {
        return studentJpaRepository.findById(id)
                .map(this::convertDto)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    // public Student getStudentById(Long id) {
    // return studentJpaRepository.findById(id).orElse(null);
    // }.name(student.getName()).email(student.getEmail()).address(student.getAddress()).build()).toList();

    // }

    public StudentResponseDto createStudent(CreateStudentRequestDto createStudentRequestDto) {
        Student student = new Student();
        student.setName(createStudentRequestDto.getName());
        student.setEmail(createStudentRequestDto.getEmail());
        student.setAddress(createStudentRequestDto.getAddress());
        student.setPassword(createStudentRequestDto.getPassword());

        Student savedStudent = studentJpaRepository.save(student);
        return convertDto(savedStudent);
    }

    public StudentResponseDto updateStudent(Long id, UpdateStudentRequestDto student) {
        Student existingStudent = studentJpaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        existingStudent.setName(student.getName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setAddress(student.getAddress());
        existingStudent.setPassword(student.getPassword());
        return convertDto(studentJpaRepository.save(existingStudent));
    }

    public void deleteStudent(Long id) {
        studentJpaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        studentJpaRepository.deleteById(id);
    }

    public StudentProjection getStudentByEmail(String email) {
        StudentProjection student = studentJpaRepository.findByEmail(email);
        if (student == null) {
            throw new RuntimeException("Student not found with email: " + email);
        }
        return student;
    }

    public StudentResponseDto getStudentByName(String name) {
        Student student = studentJpaRepository.findByName(name);
        if (student == null) {
            throw new RuntimeException("Student not found with name: " + name);
        }
        return convertDto(student);
    }

    public StudentPageResponseDto getStudentPaginated(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Student> studentPage = studentJpaRepository.findAll(pageable);
        List<StudentResponseDto> studentDtos = studentPage.getContent().stream()
                .map(this::convertDto)
                .toList();

        return StudentPageResponseDto.builder()
                .data(studentDtos)
                .pageNumber(studentPage.getNumber())
                .pageSize(studentPage.getSize())
                .totalRecords(studentPage.getTotalElements())
                .totalPages(studentPage.getTotalPages())
                .hasNext(studentPage.hasNext())
                .hasPrevious(studentPage.hasPrevious())
                .build();
    }
}