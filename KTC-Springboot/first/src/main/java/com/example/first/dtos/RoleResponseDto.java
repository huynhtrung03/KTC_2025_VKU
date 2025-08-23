package com.example.first.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoleResponseDto {
    private Long id;
    private String name;
}
