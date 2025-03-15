package com.example.controller;
//////
//////import org.springframework.beans.factory.annotation.Autowired;
//////import org.springframework.http.ResponseEntity;
//////import org.springframework.web.bind.annotation.CrossOrigin;
//////import org.springframework.web.bind.annotation.PostMapping;
//////import org.springframework.web.bind.annotation.RequestBody;
//////import org.springframework.web.bind.annotation.RequestMapping;
//////import org.springframework.web.bind.annotation.RestController;
//////
//////import com.example.model.UserLogin;
//////import com.example.repo.LoginRepo;
//////import com.example.services.JwtTokenProvider;
//////
//////
//////@RestController
//////@RequestMapping("/api")
//////@CrossOrigin(origins = "*")
//////public class LoginController {
//////
//////	@Autowired
//////    private JwtTokenProvider jwtService; // ✅ Inject JWT service
//////	
//////    @Autowired
//////    private LoginRepo userRepository;
//////
//////    @PostMapping("/login")
//////    public ResponseEntity<?> login(@RequestBody UserLogin loginRequest) {
//////        System.out.println("Received login request for email: " + loginRequest.getEmail());
//////
//////        UserLogin user = userRepository.findByEmail(loginRequest.getEmail());
//////
//////        if (user != null) {
//////            System.out.println("User found: " + user.getEmail());
//////            if (user.getPassword().equals(loginRequest.getPassword())) {
//////                System.out.println("Password match for user: " + user.getEmail());
//////
//////                // ✅ Generate JWT token
//////                String token = jwtService.generatedToken(user.getEmail());
//////
//////                return ResponseEntity.ok(new AuthResponse(true, "Login successful", token)); // ✅ Return token
//////            } else {
//////                System.out.println("Password mismatch for user: " + user.getEmail());
//////                return ResponseEntity.status(401).body(new AuthResponse(false, "Invalid email or password", null));
//////            }
//////        } else {
//////            System.out.println("User not found for email: " + loginRequest.getEmail());
//////            return ResponseEntity.status(401).body(new AuthResponse(false, "Invalid email or password", null));
//////        }
//////    }
//////
//////
////////    @RequestMapping(value = "/login", method = RequestMethod.OPTIONS)
////////    public ResponseEntity<Void> handleOptions() {
////////        HttpHeaders headers = new HttpHeaders();
////////        headers.add("Allow", "GET, POST, OPTIONS");
////////        return new ResponseEntity<>(headers, HttpStatus.OK);
////////    }
//////}
//////class AuthResponse {
//////    private boolean success;
//////    private String message;
//////    private String token;
//////
//////    public AuthResponse(boolean success, String message, String token) {
//////        this.success = success;
//////        this.message = message;
//////        this.token = token;
//////    }
//////
//////    public boolean isSuccess() {
//////        return success;
//////    }
//////
//////    public String getMessage() {
//////        return message;
//////    }
//////
//////    public String getToken() {
//////        return token;
//////    }
//////}
//////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
//import com.example.model.UserLogin;
//import com.example.repo.LoginRepo;
//import com.example.services.JwtTokenProvider;
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api")
//@CrossOrigin(origins = "*")
//public class LoginController {
//
//    @Autowired
//    private JwtTokenProvider jwtService;
//
//    @Autowired
//    private LoginRepo userRepository;
//
//    // ✅ Login and return token
////    @PostMapping("/login")
////    public ResponseEntity<?> login(@RequestBody UserLogin loginRequest) {
////        System.out.println("Received login request for email: " + loginRequest.getEmail());
////
////        UserLogin user = userRepository.findByEmail(loginRequest.getEmail());
////
////        if (user != null) {
////            System.out.println("User found: " + user.getEmail());
////            if (user.getPassword().equals(loginRequest.getPassword())) {
////                System.out.println("Password match for user: " + user.getEmail());
////
////                // ✅ Generate JWT token
////                String token = jwtService.generatedToken(user.getEmail());
////                System.out.println("Generated Token: " + token);
////                
////                return ResponseEntity.ok(new AuthResponse(true, "Login successful", token)); // ✅ Return token
////            } else {
////                System.out.println("Password mismatch for user: " + user.getEmail());
////                return ResponseEntity.status(401).body(new AuthResponse(false, "Invalid email or password", null));
////            }
////        } else {
////            System.out.println("User not found for email: " + loginRequest.getEmail());
////            return ResponseEntity.status(401).body(new AuthResponse(false, "Invalid email or password", null));
////        }
////    }
//    
//    
//    
//    
//    
//    
//    
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody UserLogin loginRequest) {
//        System.out.println("Received login request for email: " + loginRequest.getEmail());
//
//        UserLogin user = userRepository.findByEmail(loginRequest.getEmail());
//
//        if (user != null) {
//            System.out.println("User found: " + user.getEmail());
//            if (user.getPassword().equals(loginRequest.getPassword())) {
//                System.out.println("Password match for user: " + user.getEmail());
//
//                // Generate JWT access token and refresh token
//                String accessToken = jwtService.generateAccessToken(user.getEmail());
//                String refreshToken = jwtService.generateRefreshToken(user.getEmail());
//
//                System.out.println("Generated Access Token: " + accessToken);
//                System.out.println("Generated Refresh Token: " + refreshToken);
//
//                return ResponseEntity.ok(new AuthResponse(true, "Login successful", accessToken, refreshToken)); // Return both tokens
//            } else {
//                System.out.println("Password mismatch for user: " + user.getEmail());
//                return ResponseEntity.status(401).body(new AuthResponse(false, "Invalid email or password", null, null));
//            }
//        } else {
//            System.out.println("User not found for email: " + loginRequest.getEmail());
//            return ResponseEntity.status(401).body(new AuthResponse(false, "Invalid email or password", null, null));
//        }
//    }
//    
//    
//    
//    
//    @PostMapping("/refresh")
//    public ResponseEntity<?> refreshAccessToken(@RequestBody String refreshToken) {
//        try {
//            String email = jwtService.extractUserName(refreshToken);  // Extract user email from refresh token
//            String newAccessToken = jwtService.generateAccessToken(email); // Generate new access token
//
//            return ResponseEntity.ok(new AuthResponse(true, "Access token refreshed", newAccessToken, refreshToken));
//        } catch (Exception e) {
//            return ResponseEntity.status(401).body("🔴 Invalid or expired refresh token");
//        }
//    }


    
    
    
    





import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.RefreshToken;
import com.example.model.UserLogin;
import com.example.repo.LoginRepo;
import com.example.repo.RefreshTokenRepo;
import com.example.services.JwtTokenProvider;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private JwtTokenProvider jwtService;

    @Autowired
    private LoginRepo userRepository;

    @Autowired
    private RefreshTokenRepo refreshTokenRepo;  // Inject the repository to save refresh tokens

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLogin loginRequest) {
        System.out.println("Received login request for email: " + loginRequest.getEmail());

        UserLogin user = userRepository.findByEmail(loginRequest.getEmail());

        if (user != null) {
            System.out.println("User found: " + user.getEmail());
            if (user.getPassword().equals(loginRequest.getPassword())) {
                System.out.println("Password match for user: " + user.getEmail());

                // Generate JWT access token and refresh token
                String accessToken = jwtService.generateAccessToken(user.getEmail());
                String refreshToken = jwtService.generateRefreshToken(user.getEmail());

                // Save refresh token to database
                RefreshToken tokenEntity = new RefreshToken();
                tokenEntity.setUserEmail(refreshToken);
                tokenEntity.setRefreshToken(refreshToken);
                refreshTokenRepo.save(tokenEntity);  // Save to DB

                System.out.println("Generated Access Token: " + accessToken);
                System.out.println("Generated Refresh Token: " + refreshToken);

                return ResponseEntity.ok(new AuthResponse(true, "Login successful", accessToken, refreshToken)); // Return both tokens
            } else {
                System.out.println("Password mismatch for user: " + user.getEmail());
                return ResponseEntity.status(401).body(new AuthResponse(false, "Invalid email or password", null, null));
            }
        } else {
            System.out.println("User not found for email: " + loginRequest.getEmail());
            return ResponseEntity.status(401).body(new AuthResponse(false, "Invalid email or password", null, null));
        }
    }
//
//    @PostMapping("/refresh")
//    public ResponseEntity<?> refreshAccessToken(@RequestBody String refreshToken) {
//    	System.out.println("Refesh token methd called................");
//        try {
//            String email = jwtService.extractUserName(refreshToken);  // Extract user email from refresh token
//
//            // Check if the refresh token exists in the database
//            RefreshToken savedRefreshToken = refreshTokenRepo.findByUserEmail(email);
//            if (savedRefreshToken == null || !savedRefreshToken.getRefreshToken().equals(refreshToken)) {
//                return ResponseEntity.status(401).body("Invalid or expired refresh token");
//            }
//
//            String newAccessToken = jwtService.generateAccessToken(email); // Generate new access token
//
//            return ResponseEntity.ok(new AuthResponse(true, "Access token refreshed", newAccessToken, refreshToken));
//        } catch (Exception e) {
//            return ResponseEntity.status(401).body("Invalid or expired refresh token");
//        }
//    }
    
//    @PostMapping("/refresh")
//    public ResponseEntity<?> refreshAccessToken(@RequestBody Map<String, String> requestBody) {
//        try {
//            String refreshToken = requestBody.get("refreshToken");
//            System.out.println("Received refresh token: " + refreshToken);
//
//            String email = jwtService.extractUserName(refreshToken);
//            System.out.println("Extracted email: " + email);
//
//            RefreshToken savedRefreshToken = refreshTokenRepo.findByUserEmail(email);
//            System.out.println("Fetched token from DB: " + (savedRefreshToken != null ? savedRefreshToken.getRefreshToken() : "Not Found"));
//
//            if (savedRefreshToken == null || !savedRefreshToken.getRefreshToken().equals(refreshToken)) {
//                return ResponseEntity.status(401).body("Invalid or expired refresh token");
//            }
//
//            String newAccessToken = jwtService.generateAccessToken(email);
//            return ResponseEntity.ok(new AuthResponse(true, "Access token refreshed", newAccessToken, refreshToken));
//            
//        } catch (Exception e) {
//            System.out.println("Error: " + e.getMessage());
//            return ResponseEntity.status(401).body("Invalid or expired refresh token");
//        }
//    }
    
    
    
    
    
    
    
    
    
    
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestBody Map<String, String> requestBody) {
        try {
            String refreshToken = requestBody.get("refreshToken");
            System.out.println("Received refresh token: " + refreshToken);

            // Find refresh token from DB
            RefreshToken savedRefreshToken = refreshTokenRepo.findByUserEmail(refreshToken);
            if (savedRefreshToken == null) {
                return ResponseEntity.status(401).body("Invalid or expired refresh token");
            }

            // Extract email from refresh token
            String email = jwtService.extractUserName(refreshToken);
            System.out.println("Extracted email: " + email);

            // Generate new access token
            String newAccessToken = jwtService.generateAccessToken(email);
            return ResponseEntity.ok(new AuthResponse(true, "Access token refreshed", newAccessToken, refreshToken));

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(401).body("Invalid or expired refresh token");
        }
    }

    
    
    
    
    
    
    






//    // ✅ Authenticate token and check user existence in DB
//    @GetMapping("/auth")
//    public ResponseEntity<?> authenticateUser(HttpServletRequest request) {
//        String token = request.getHeader("Authorization");
//
//        if (token == null || !token.startsWith("Bearer ")) {
//            return ResponseEntity.status(401).body("Token missing or invalid");
//        }
//
//        token = token.substring(7); // Remove "Bearer " prefix
//        System.out.println("Received Token: " + token);
//        String email;
//
//        try {
//            email = jwtService.extractUserName(token); // Decode email from token
//        } catch (Exception e) {
//            return ResponseEntity.status(401).body("Invalid or expired token");
//        }
//
//        UserLogin user = userRepository.findByEmail(email);
//
//        if (user != null) {
//            return ResponseEntity.ok("Authentication successful for: " + email);
//        } else {
//            return ResponseEntity.status(401).body("🔴 User not found");
//        }
//    }

    @RequestMapping(value = "/login", method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptions() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Allow", "GET, POST, OPTIONS");
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }
}

// ✅ Response class for login
class AuthResponse {
    private boolean success;
    private String message;
//    private String token;
    private String accessToken;
    private String refreshToken;

    public AuthResponse(boolean success, String message, String accessToken,String refreshToken) {
        this.success = success;
        this.message = message;
//        this.token = token;
        this.accessToken = accessToken;
        this.setRefreshToken(refreshToken);
        
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public String getAccessToken() {
        return accessToken;
    }

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}
}






















