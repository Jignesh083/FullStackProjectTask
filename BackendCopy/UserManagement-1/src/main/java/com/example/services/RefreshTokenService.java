//package com.example.services;
//
//import java.time.Instant;
//import java.util.UUID;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.data.redis.RedisProperties.Lettuce.Cluster.Refresh;
//import org.springframework.stereotype.Service;
//
//import com.example.model.RefreshToken;
//import com.example.model.UserLogin;
//import com.example.repo.RefreshTokenRepo;
//import com.example.repo.UserRepository;
//
//@Service
//public class RefreshTokenService {
//
//    @Autowired
//    private RefreshTokenRepo refreshTokenRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
////    public void saveRefreshToken(String username, String refreshToken) {
////        UserLogin user = userRepository.findByUsername(username);
////        if (user != null) {
////            RefreshToken token = RefreshToken.builder()
////                .refreshToken(refreshToken)
////                .expiry(Instant.now().plusMillis(5 * 60 * 60 * 1000)) // Example expiry time
////                .user(user)
////                .build();
////            refreshTokenRepository.save(token);
////        }
////    }
//    
//    
//    
//    public RefreshToken createRefreshToken(String username) {
//        RefreshToken refreshToken = new RefreshToken();
//        refreshToken.setRefreshToken(UUID.randomUUID().toString());
//        refreshToken.setExpiry(Instant.now().plusMillis(5 * 60 * 60 * 1000)); 
//        refreshToken.setUserLogin(userRepository.findByEmail(username).get());
//
//        return refreshToken;
//    }
//    
//    
//    
//    
//    public boolean verifyRefreshToken(String refreshToken) {
//    	
//    	RefreshToken refreshToken2 = refreshTokenRepository.findById(refreshToken).orElseThrow(()->new RuntimeException("Given Token"))
//    	
//    			
//    			if(refreshToken2.getExpiry().compareTo(Instant.now())<0) {
//    				throw new R
//    			}
//    			
//    	return false;
//    }
//
//}
//
