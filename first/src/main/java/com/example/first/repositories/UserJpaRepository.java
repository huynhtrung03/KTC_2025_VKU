package com.example.first.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.first.entities.User;

@Repository
public interface UserJpaRepository extends JpaRepository<User, Long> {
    @EntityGraph(attributePaths = { "roles" })
    Optional<User> findByUsername(@Param("username") String username);

    // Additional query methods can be defined here if needed

}
