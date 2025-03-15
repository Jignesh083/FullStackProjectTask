package com.example.controller;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.example.model.UserRegister;
//
//import com.example.services.UserServiceRegister;
//
//@RestController
//@CrossOrigin(origins = "*", allowedHeaders = "*")
//@RequestMapping("/api")
//public class UserController {
//
//    private static final Logger log = LoggerFactory.getLogger(UserController.class);
//    private final UserServiceRegister userService;
//
//    public UserController(UserServiceRegister userService) {
//        this.userService = userService;
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@RequestBody UserRegister user) {
//        log.info("Received user registration request: {}", user);
//
//        try {
//            if (user.getEmail() == null || user.getPassword() == null) {
//                return ResponseEntity.badRequest().body("Email and password are required");
//            }
//
//            UserRegister savedUser = userService.registerUser(user);
//            log.info("User registered successfully: {}", savedUser);
//
//            return ResponseEntity.ok(savedUser);
//        } catch (Exception e) {
//            log.error("Error during user registration: ", e);
//            return ResponseEntity.status(500).body("User registration failed: " + e.getMessage());
//        }
//        
//    }
//}







import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.UserRegister;
import com.example.services.UserService;
import com.example.services.UserServiceRegister;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserService userService;

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    
    private final UserServiceRegister userService1;

    public UserController(UserServiceRegister userService1) {
        this.userService1 = userService1;
    }

  
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegister user) {
        log.info("Received user registration request: {}", user);

        try {
            if (user.getEmail() == null || user.getPassword() == null) {
                return ResponseEntity.badRequest().body("Email and password are required");
            }

            UserRegister savedUser = userService1.registerUser(user);
            log.info("User registered successfully: {}", savedUser);

            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            log.error("Error during user registration: ", e);
            return ResponseEntity.status(500).body("User registration failed: " + e.getMessage());
        }
    }

   
    @GetMapping("/users")
    public ResponseEntity<List<UserRegister>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

 
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<UserRegister> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserRegister user) {
        try {
            Optional<UserRegister> updatedUser = userService.updateUser(id, user);
            if (updatedUser.isPresent()) {
                return ResponseEntity.ok(updatedUser.get()); // Updated user return karo
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("❌ Error updating user: " + e.getMessage());
        }
    }

    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            boolean isDeleted = userService.deleteUser(id);
            if (isDeleted) {
                return ResponseEntity.ok("User deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("❌ Error deleting user: " + e.getMessage());
        }
    }


}
