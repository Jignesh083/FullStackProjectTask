		package com.example.services;
		
		import com.example.model.UserRegister;
		import com.example.repo.UserRepository;
		
		import org.springframework.beans.factory.annotation.Autowired;
		import org.springframework.stereotype.Service;
		
		import java.util.List;
		import java.util.Optional;
		
		@Service
		public class UserService {
		
		    @Autowired
		    private UserRepository userRepository;
		
		    // Get all users
		    public List<UserRegister> getAllUsers() {
		        return userRepository.findAll();
		    }
		
		    // Get user by ID
		    public Optional<UserRegister> getUserById(Long id) {
		        return userRepository.findById(id);
		    }
		
//		    // Create a new user
//		    public UserRegister createUser(UserRegister user) {
//		        return userRepository.save(user);
//		    }
		
		    // Update user
		    public Optional<UserRegister> updateUser(Long id, UserRegister userDetails) {
		        return userRepository.findById(id).map(user -> {
		            user.setName(userDetails.getName());
		            user.setEmail(userDetails.getEmail());
		            user.setPassword(userDetails.getPassword());
		            user.setPhone(userDetails.getPhone());
		            user.setDob(userDetails.getDob());
		            user.setGender(userDetails.getGender());
		            user.setAddress(userDetails.getAddress());
		            user.setCountry(userDetails.getCountry());
		            user.setZipFilePath(userDetails.getZipFilePath());
		            return userRepository.save(user);
		        });
		    }
		
		    // Delete user
		    public boolean deleteUser(Long id) {
		        return userRepository.findById(id).map(user -> {
		            userRepository.delete(user);
		            return true;
		        }).orElse(false);
		    }

			
		}
