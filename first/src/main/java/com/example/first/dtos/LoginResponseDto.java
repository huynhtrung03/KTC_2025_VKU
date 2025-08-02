package com.example.first.dtos;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginResponseDto {
    String username;
    Long id;
    String accessToken;

    private List<RoleResponseDto> roles;
}