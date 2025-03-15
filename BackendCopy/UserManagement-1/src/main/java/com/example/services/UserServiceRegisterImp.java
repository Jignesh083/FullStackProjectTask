package com.example.services;


import com.example.model.RefreshToken;
import com.example.model.UserLogin;
import com.example.model.UserRegister;
import com.example.repo.LoginRepo;
import com.example.repo.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class UserServiceRegisterImp implements UserServiceRegister {
    private final UserRepository userRepository;

    public UserServiceRegisterImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserRegister registerUser(UserRegister user) {
        return userRepository.save(user);
    }
  
  

  

    
    
}

