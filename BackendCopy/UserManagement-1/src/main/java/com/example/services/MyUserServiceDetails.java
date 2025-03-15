package com.example.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.model.MyUserDetails;
import com.example.model.UserLogin;
import com.example.repo.LoginRepo;
import com.example.repo.UserRepository;


@Service
public class MyUserServiceDetails implements UserDetailsService {

    @Autowired
    private LoginRepo repo; // Dependency injection of UserRepo to interact with the database

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        // Fetch the user from the repository by username
        UserLogin user = repo.findByEmail(email);
        
        // If user is not found, throw an exception
        if (user == null) {
            System.out.println("User not found...");
            throw new UsernameNotFoundException("User Not Found...");
        }
        
        // Return a UserPrincipal object constructed with the fetched user
        return new MyUserDetails(user);
    }
    
}