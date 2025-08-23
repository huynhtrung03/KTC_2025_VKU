package com.example.first.dtos;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDto {
    private Long id;
    private String username;
    private List<RoleResponseDto> roles;

}
