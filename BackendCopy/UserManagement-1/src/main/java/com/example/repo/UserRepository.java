package com.example.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.UserLogin;
import com.example.model.UserRegister;

@Repository
public interface UserRepository extends JpaRepository<UserRegister, Long> {
	Optional<UserLogin> findByEmail(String email);
}