package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.UserLogin;

public interface LoginRepo extends JpaRepository<UserLogin, String> {
    UserLogin findByEmail(String email);
}
