package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.RefreshToken;

public interface RefreshTokenRepo extends JpaRepository<RefreshToken,Long> {
	 RefreshToken findByUserEmail(String userEmail);
}
