package com.example.first.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.first.dtos.LoginRequestDto;
import com.example.first.dtos.LoginResponseDto;
import com.example.first.dtos.RoleResponseDto;
import com.example.first.dtos.UserResponseDto;
import com.example.first.entities.Role;
import com.example.first.entities.User;
import com.example.first.exceptions.HttpException;
import com.example.first.repositories.UserJpaRepository;

@Service
public class UserService {
    private final JwtService jwtService;
    private final UserJpaRepository userJpaRepository;

    public UserService(UserJpaRepository userJpaRepository, JwtService jwtService) {
        this.userJpaRepository = userJpaRepository;
        this.jwtService = jwtService;

    }

    private RoleResponseDto convertRoleDto(Role role) {
        return RoleResponseDto.builder()
                .id(role.getId())
                .name(role.getName())
                .build();
    }

    private UserResponseDto convertDto(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .roles(user.getRoles().stream()
                        .map(this::convertRoleDto)
                        .collect(Collectors.toList()))
                .build();
    }

    public UserResponseDto getUserByUsername(String username) {
        return userJpaRepository.findByUsername(username)
                .map(this::convertDto)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }

    public LoginResponseDto login(LoginRequestDto request) throws Exception {
        // Find the user by email (username)
        User user = this.userJpaRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new HttpException("Invalid username or password", HttpStatus.UNAUTHORIZED));

        // Verify password
        if (!request.getPassword().equals(user.getPassword())) {
            throw new HttpException("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }

        // Generate a new access token (with full data + roles)
        String accessToken = jwtService.generateAccessToken(user);

        return LoginResponseDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .accessToken(accessToken)
                .roles(user.getRoles().stream()
                        .map(this::convertRoleDto)
                        .collect(Collectors.toList()))
                .build();
    }

}
