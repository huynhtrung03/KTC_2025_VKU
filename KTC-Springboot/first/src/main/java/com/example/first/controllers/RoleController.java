// package com.example.first.controllers;

// import com.example.first.entities.Role;
// import com.example.first.repositories.RoleJpaRepository;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/roles")
// public class RoleController {
// private final RoleJpaRepository roleJpaRepository;

// public RoleController(RoleJpaRepository roleJpaRepository) {
// this.roleJpaRepository = roleJpaRepository;
// }

// @PostMapping
// public Role createRole(@RequestBody Role role) {
// return roleJpaRepository.save(role);
// }
// }