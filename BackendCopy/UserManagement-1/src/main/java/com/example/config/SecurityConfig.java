package com.example.config;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration // Marks this class as a configuration class for Spring
@EnableWebSecurity // Enables Spring Security's web security support
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService; // Custom service to load user data

    @Autowired
    private JwtFilter jwtFilter; // Custom filter for JWT authentication

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
        		.cors(Customizer.withDefaults())
            .csrf(customizer -> customizer.disable()) // Disables CSRF protection (not needed for stateless APIs)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**","api/users/**","/api/refresh","api/auth/**") // Allow access to 'register' and 'login' without authentication
                .permitAll().anyRequest().authenticated()) // Requires authentication for all other requests
            .httpBasic(Customizer.withDefaults()) // Enables basic HTTP authentication for REST API
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // No sessions (stateless authentication)
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class) // Add the JWT filter before the standard authentication filter
            .build(); // Builds the SecurityFilterChain
    }



    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(); // Use DAO-based authentication
        provider.setPasswordEncoder(new BCryptPasswordEncoder(12)); // Use BCrypt encryption for passwords
        // provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance()); // Uncomment to use plain text passwords
        provider.setUserDetailsService(userDetailsService); // Use the custom user details service
        return provider;
    }
    
    
    
    

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager(); // Gets the authentication manager to manage user authentication
    }

}