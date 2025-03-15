//package com.example.services;
//
//import java.security.NoSuchAlgorithmException;
//import java.util.Base64;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.function.Function;
//
//import javax.crypto.KeyGenerator;
//import javax.crypto.SecretKey;
//
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Service;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//
//@Service
//public class JwtTokenProvider {
//
//    private String secretKey = "cF781A";
//
//    // Constructor to generate a secret key using HmacSHA256 algorithm
//    public JwtTokenProvider() throws NoSuchAlgorithmException {
//        KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
//        SecretKey sk = keyGen.generateKey();
//        secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
//        System.out.println("Generated Secret Key: " + secretKey); // Debugging point
//    }
//
//    // Method to generate a JWT token for a given 
//    public String generatedToken(String email) {
//        System.out.println("Secret Key during signing: " + secretKey); // Debugging point
//        Map<String, Object> claims = new HashMap<>();
//        
//        // Debugging the email value
//        System.out.println("Email/Subject for token: " + email);
//        
//        String token = Jwts.builder()
//                .claims()
//                .add(claims) // Add claims to the token
//                .subject(email) // Set the subject (username) of the token
//                .issuedAt(new Date(System.currentTimeMillis())) // Set the issued date of the token
//                .expiration(new Date(System.currentTimeMillis() + 1000 * 60)) // Set the expiration date of the token (1 hour)
//                .and()
//                .signWith(getKey()) // Sign the token with the secret key
//                .compact(); // Build the token
//        
//        // Debugging the generated token
//        System.out.println("Generated Token: " + token);
//        
//        return token;
//    }
//
//    // Method to get the secret key for signing the token
//    private SecretKey getKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//        
//        // Debugging the secret key decoding
//        System.out.println("Decoded Secret Key (Base64): " + secretKey);
//        
//        return Keys.hmacShaKeyFor(keyBytes); // Use HmacSHA key for signing
//    }
//
//    // Method to extract the username from the JWT token
//    public String extractUserName(String token) {
//        System.out.println("Token for extracting username: " + token); // Debugging point
//        return extractClaim(token, Claims::getSubject);
//    }
//
//    // Method to extract a specific claim from the JWT token
//    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//        System.out.println("Extracting claim from token: " + token); // Debugging point
//        final Claims claims = extractAllClaims(token);
//        return claimsResolver.apply(claims);
//    }
//
//    // Method to extract all claims from the JWT token
//    private Claims extractAllClaims(String token) {
//        System.out.println("Extracting all claims from token: " + token); // Debugging point
//        return Jwts.parser()
//        		.verifyWith(getKey())
//                .build()// Ensure the same key is used
//                .parseSignedClaims(token)
//                .getPayload();
//    }
//
//    // Method to validate the JWT token
//    public Boolean validateToken(String token, UserDetails userDetails) {
//        System.out.println("Validating token: " + token); // Debugging point
//        final String username = extractUserName(token);
//        boolean isValid = (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//        
//        // Debugging token validation status
//        System.out.println("Token validation result: " + isValid);
//        
//        return isValid;
//    }
//
//    // Method to check if the token is expired
//    private boolean isTokenExpired(String token) {
//        System.out.println("Checking expiration for token: " + token); // Debugging point
//        return extractExpiration(token).before(new Date());
//    }
//
//    // Method to extract the expiration date from the JWT token
//    private Date extractExpiration(String token) {
//        System.out.println("Extracting expiration from token: " + token); // Debugging point
//        return extractClaim(token, Claims::getExpiration);
//    }
//}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



package com.example.services;

import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.model.RefreshToken;
import com.example.repo.RefreshTokenRepo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtTokenProvider {

    private String secretKey = "cF781A";
    
    
    @Autowired
    private RefreshTokenRepo refreshTokenRepository;

    public JwtTokenProvider() throws NoSuchAlgorithmException {
        KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
        SecretKey sk = keyGen.generateKey();
        secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
        System.out.println("Generated Secret Key: " + secretKey);
    }

    public String generateAccessToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60))
                .and()
                .signWith(getKey())
                .compact();
    }

    public String generateRefreshToken(String email) {
        String refreshToken = Jwts.builder()
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)) // 7 days expiration
                .signWith(getKey())
                .compact();
    
        saveRefreshTokenInDatabase(refreshToken, email);
        return refreshToken;
    
    }

    
    
    
    private void saveRefreshTokenInDatabase(String refreshToken, String email) {
        RefreshToken token = refreshTokenRepository.findByUserEmail(email);
        token.setRefreshToken(refreshToken);
        token.setUserEmail(email);
        token.setExpiryDate(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)); // 7 days expiry

        refreshTokenRepository.save(token); // Save the token in the database
    }

    
    
    
    
    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
