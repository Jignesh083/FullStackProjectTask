package com.example.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//
//import java.time.Instant;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//
//import jakarta.persistence.OneToOne;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@Table(name = "refresh_token")
//@Builder
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//public class RefreshToken {
//	@Id
//	private String refreshToken;
//	private Instant expiry;
//	
//	
//	@OneToOne
//	
//	private UserLogin userLogin;
//
//
//	
//	
//	
//	
//	
//	
//	
//	public RefreshToken() {
//		super();
//	}
//
//
//	public RefreshToken(String refreshToken, Instant expiry, UserLogin userLogin) {
//		super();
//		this.refreshToken = refreshToken;
//		this.expiry = expiry;
//		this.userLogin = userLogin;
//	}
//
//
//	public String getRefreshToken() {
//		return refreshToken;
//	}
//
//
//	public void setRefreshToken(String refreshToken) {
//		this.refreshToken = refreshToken;
//	}
//
//
//	public Instant getExpiry() {
//		return expiry;
//	}
//
//
//	public void setExpiry(Instant expiry) {
//		this.expiry = expiry;
//	}
//
//
//	public UserLogin getUserLogin() {
//		return userLogin;
//	}
//
//
//	public void setUserLogin(UserLogin userLogin) {
//		this.userLogin = userLogin;
//	}
//
//
//	@Override
//	public String toString() {
//		return "RefreshToken [refreshToken=" + refreshToken + ", expiry=" + expiry + ", userLogin=" + userLogin + "]";
//	}
//	
//	
//	
//}




















@Entity
@Table(name = "refresh_token")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String refreshToken;
    private String userEmail;
    private Date expiryDate;

    // Constructors, getters, setters, etc.
    public RefreshToken() {}

    public RefreshToken(String refreshToken, String userEmail, Date expiryDate) {
        this.refreshToken = refreshToken;
        this.userEmail = userEmail;
        this.expiryDate = expiryDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }
}
