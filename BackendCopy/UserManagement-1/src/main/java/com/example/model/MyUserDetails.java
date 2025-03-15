package com.example.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

public class MyUserDetails implements UserDetails {
    
    private static final long serialVersionUID = 1L;
    private UserLogin userlogin;

    public MyUserDetails(UserLogin user) {
        this.userlogin = user; // Initialize userlogin to avoid NullPointerException
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public String getPassword() {
        return userlogin.getPassword();
    }

    @Override
    public String getUsername() {
        return userlogin.getEmail();
    }
}
