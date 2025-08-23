
package com.example.first.controllers;

// import com.example.first.dtos.CreateStudentRequestDto;
// import com.example.first.dtos.StudentResponseDto;
import com.example.first.dtos.UserResponseDto;
import com.example.first.services.StudentService;
import com.example.first.services.UserService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    // private final StudentService studentService;
    private final UserService userService;

    public UserController(UserService userService, StudentService studentService) {
        this.userService = userService;
        // this.studentService = studentService;
    }

    @GetMapping("/{username}")
    public UserResponseDto getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

}