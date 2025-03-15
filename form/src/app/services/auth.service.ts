// // import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// // import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// // import { BehaviorSubject, Observable, throwError } from 'rxjs';
// // import { catchError, switchMap, filter, take, tap } from 'rxjs/operators';
// // import { isPlatformBrowser } from '@angular/common';
// // import { jwtDecode } from 'jwt-decode';
// // import { Route, Router } from '@angular/router';


// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthService {
// //   private apiUrlLogin = 'http://localhost:9500/api/login'; // Adjust as per your backend
// //   private apiUrlRefresh = 'http://localhost:9500/api/refresh'; // Adjust as per your backend

// //   constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object,private router:Router) {}

// //   // Login and store token automatically
// //   login(credentials: { email: string; password: string }): Observable<{ accessToken: string, refreshToken: string }> {
// //     return this.http.post<{ accessToken: string, refreshToken: string }>(this.apiUrlLogin, credentials).pipe(
// //       tap(response => {
// //         if (response.accessToken && response?.refreshToken) {
// //           this.storeToken(response.accessToken); // Store token after successful login
// //           this.storeRefreshToken(response.refreshToken); // Store refresh token
// //         }
// //       }),
// //       catchError(error => throwError(() => error))
// //     );
// //   }

// //   // Refresh the access token using the refresh token
// //   // refreshAccessToken(): Observable<{accessToken:string}> {
// //   //   const refreshToken = this.getRefreshToken();
// //   //   if (!refreshToken) {
// //   //     console.warn(" No refresh token found.");
// //   //     return throwError(() => new Error('No refresh token available'));
// //   //   }

// //   //   return this.http.post<any>(this.apiUrlRefresh, { refreshToken }).pipe(
// //   //     tap(response => {
// //   //       if (response?.accessToken) {
// //   //         this.storeToken(response.accessToken); // Store new access token
// //   //       }
// //   //     }),
// //   //     catchError(error => throwError(() => error))
// //   //   );
// //   // }







// //   refreshAccessToken(): Observable<any> {
// //     const refreshToken = this.getRefreshToken();
// //     if (!refreshToken) {
// //       this.clearToken();
// //       this.router.navigate(['/login']);
// //       return throwError(() => new Error('No refresh token available'));
// //     }
  
// //     return this.http.post<any>('http://localhost:9500/api/refresh_token', { refreshToken }).pipe(
// //       catchError(error => {
// //         console.error('Refresh token failed:', error);
// //         this.clearToken();
// //         this.router.navigate(['/login']);
// //         return throwError(() => error);
// //       })
// //     );
// //   }
  



// //   refreshToken(): Observable<any> {
// //     const refreshToken = localStorage.getItem('refreshToken');
// //     return this.http.post(`${this.apiUrlRefresh}`, { refreshToken }).pipe(
// //       tap((response: any) => {
// //         localStorage.setItem('accessToken', response.accessToken);
// //       })
// //     );
// //   }


// //   logout() {
// //     localStorage.removeItem('accessToken');
// //     localStorage.removeItem('refreshToken');
// //     window.location.href = '/login'; // Redirect to login page
// //   }




// //   isTokenExpired(token: string): boolean {
// //     try {
// //       const decodedToken: any = jwtDecode(token);
// //       if (!decodedToken.exp) {
// //         console.warn("🔴 Token has no expiration field.");
// //         return true;
// //       }
// //       const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
// //       return Date.now() >= expirationTime;
// //     } catch (error) {
// //       console.error("🔴 Error decoding token:", error);
// //       return true;
// //     }
// //   }




// //   // Store token in local storage
// //   storeToken(token: string): void {
// //     if (isPlatformBrowser(this.platformId)) {
// //       if (token) {
// //         localStorage.setItem('authToken', token);
// //         console.log('Token stored successfully:', localStorage.getItem('authToken'));
// //       } else {
// //         console.warn('Trying to store a null or undefined token');
// //       }
// //     }
// //   }

// //   // Store refresh token in local storage
// //   storeRefreshToken(refreshToken: string): void {
// //     if (isPlatformBrowser(this.platformId)) {
// //       if (refreshToken) {
// //         localStorage.setItem('refreshToken', refreshToken);
// //         console.log('Refresh token stored successfully:', localStorage.getItem('refreshToken'));
// //       } else {
// //         console.warn('Trying to store a null or undefined refresh token');
// //       }
// //     }
// //   }

// //   // Retrieve refresh token from local storage
// //   getRefreshToken(): string | null {
// //     return isPlatformBrowser(this.platformId) ? localStorage.getItem('refreshToken') : null;
// //   }

// //   // Retrieve token from local storage
// //   getToken(): string | null {
// //     return isPlatformBrowser(this.platformId) ? localStorage.getItem('authToken') : null;
// //   }

// //   setToken(token: string): void {
// //     localStorage.setItem('accessToken', token);
// //   }
  

// //   // Remove token (Logout)
// //   clearToken(): void {
// //     if (isPlatformBrowser(this.platformId)) {
// //       console.log('Clearing token from localStorage');
// //       localStorage.removeItem('authToken');
// //       localStorage.removeItem('refreshToken');
// //     }
// //   }

// //   // Check if user is authenticated
// //   isAuthenticated(): boolean {
// //     return !!this.getToken();
// //   }
// // }





















// import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { isPlatformBrowser } from '@angular/common';
// import { Router } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrlLogin = 'http://localhost:9500/api/login'; // Adjust as per your backend
//   private apiUrlRefresh = 'http://localhost:9500/api/refresh'; // Adjust as per your backend

//   constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

//   // Login and store token automatically
//   login(credentials: { email: string; password: string }): Observable<{ accessToken: string, refreshToken: string }> {
//     return this.http.post<{ accessToken: string, refreshToken: string }>(this.apiUrlLogin, credentials).pipe(
//       tap(response => {
//         if (response.accessToken && response?.refreshToken) {
//           this.storeToken(response.accessToken); // Store token after successful login
//           this.storeRefreshToken(response.refreshToken); // Store refresh token
//         }
//       }),
//       catchError(error => throwError(() => error))
//     );
//   }

//   // Refresh the access token using the refresh token
//   refreshAccessToken(): Observable<any> {
//     const refreshToken = this.getRefreshToken();
//     if (!refreshToken) {
//       this.clearToken();
//       this.router.navigate(['/login']);
//       return throwError(() => new Error('No refresh token available'));
//     }
  
//     return this.http.post<any>(this.apiUrlRefresh, { refreshToken }).pipe(
//       catchError(error => {
//         console.error('Refresh token failed:', error);
//         this.clearToken();
//         this.router.navigate(['/login']);
//         return throwError(() => error);
//       })
//     );
//   }

//   // Logout function
//   logout() {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('refreshToken');
//     window.location.href = '/login'; // Redirect to login page
//   }

//   // Check if token is expired
//   isTokenExpired(token: string): boolean {
//     try {
//       const decodedToken: any = jwtDecode(token);
//       if (!decodedToken.exp) {
//         console.warn("Token has no expiration field.");
//         return true;
//       }
//       const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
//       return Date.now() >= expirationTime;
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       return true;
//     }
//   }

//   // Store token in local storage
//   storeToken(token: string): void {
//     if (isPlatformBrowser(this.platformId)) {
//       if (token) {
//         localStorage.setItem('authToken', token);
//         console.log('Token stored successfully:', localStorage.getItem('authToken'));
//       } else {
//         console.warn('Trying to store a null or undefined token');
//       }
//     }
//   }

//   // Store refresh token in local storage
//   storeRefreshToken(refreshToken: string): void {
//     if (isPlatformBrowser(this.platformId)) {
//       if (refreshToken) {
//         localStorage.setItem('refreshToken', refreshToken);
//         console.log('Refresh token stored successfully:', localStorage.getItem('refreshToken'));
//       } else {
//         console.warn('Trying to store a null or undefined refresh token');
//       }
//     }
//   }

//   // Retrieve refresh token from local storage
//   getRefreshToken(): string | null {
//     return isPlatformBrowser(this.platformId) ? localStorage.getItem('refreshToken') : null;
//   }

//   // Retrieve token from local storage
//   getToken(): string | null {
//     return isPlatformBrowser(this.platformId) ? localStorage.getItem('authToken') : null;
//   }

//   // Remove token (Logout)
//   clearToken(): void {
//     if (isPlatformBrowser(this.platformId)) {
//       console.log('Clearing token from localStorage');
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('refreshToken');
//     }
//   }

//   // Check if user is authenticated
//   isAuthenticated(): boolean {
//     return !!this.getToken();
//   }
// }


















































// -->>>>>>>>>>>>>>>>>>>>>
// import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { catchError, switchMap, filter, take, tap } from 'rxjs/operators';
// import { isPlatformBrowser } from '@angular/common';
// import { jwtDecode } from 'jwt-decode';
// import { Route, Router } from '@angular/router';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrlLogin = 'http://localhost:9500/api/login'; // Adjust as per your backend
//   private apiUrlRefresh = 'http://localhost:9500/api/refresh'; // Adjust as per your backend

//   constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object,private router:Router) {}

//   // Login and store token automatically
//   login(credentials: { email: string; password: string }): Observable<{ accessToken: string, refreshToken: string }> {
//     return this.http.post<{ accessToken: string, refreshToken: string }>(this.apiUrlLogin, credentials).pipe(
//       tap(response => {
//         if (response.accessToken && response?.refreshToken) {
//           this.storeToken(response.accessToken); // Store token after successful login
//           this.storeRefreshToken(response.refreshToken); // Store refresh token
//         }
//       }),
//       catchError(error => throwError(() => error))
//     );
//   }

//   // Refresh the access token using the refresh token
//   // refreshAccessToken(): Observable<{accessToken:string}> {
//   //   const refreshToken = this.getRefreshToken();
//   //   if (!refreshToken) {
//   //     console.warn(" No refresh token found.");
//   //     return throwError(() => new Error('No refresh token available'));
//   //   }

//   //   return this.http.post<any>(this.apiUrlRefresh, { refreshToken }).pipe(
//   //     tap(response => {
//   //       if (response?.accessToken) {
//   //         this.storeToken(response.accessToken); // Store new access token
//   //       }
//   //     }),
//   //     catchError(error => throwError(() => error))
//   //   );
//   // }







//   refreshAccessToken(): Observable<any> {
//     const refreshToken = this.getRefreshToken();
//     if (!refreshToken) {
//       this.clearToken();
//       this.router.navigate(['/login']);
//       return throwError(() => new Error('No refresh token available'));
//     }
  
//     return this.http.post<any>('http://localhost:9500/api/refresh', { refreshToken }).pipe(
//       catchError(error => {
//         console.error('Refresh token failed:', error);
//         this.clearToken();
//         this.router.navigate(['/login']);
//         return throwError(() => error);
//       })
//     );
//   }
  



//   refreshToken(): Observable<any> {
//     const refreshToken = localStorage.getItem('refreshToken');
//     return this.http.post(`${this.apiUrlRefresh}`, { refreshToken }).pipe(
//       tap((response: any) => {
//         localStorage.setItem('accessToken', response.accessToken);
//       })
//     );
//   }


//   logout() {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     window.location.href = '/login'; // Redirect to login page
//   }




//   isTokenExpired(token: string): boolean {
//     try {
//       const decodedToken: any = jwtDecode(token);
//       if (!decodedToken.exp) {
//         console.warn("Token has no expiration field.");
//         return true;
//       }
//       const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
//       return Date.now() >= expirationTime;
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       return true;
//     }
//   }




//   // Store token in local storage
//   storeToken(token: string): void {
//     if (isPlatformBrowser(this.platformId)) {
//       if (token) {
//         localStorage.setItem('authToken', token);
//         console.log('Token stored successfully:', localStorage.getItem('authToken'));
//       } else {
//         console.warn('Trying to store a null or undefined token');
//       }
//     }
//   }

//   // Store refresh token in local storage
//   storeRefreshToken(refreshToken: string): void {
//     if (isPlatformBrowser(this.platformId)) {
//       if (refreshToken) {
//         localStorage.setItem('refreshToken', refreshToken);
//         console.log('Refresh token stored successfully:', localStorage.getItem('refreshToken'));
//       } else {
//         console.warn('Trying to store a null or undefined refresh token');
//       }
//     }
//   }

//   // Retrieve refresh token from local storage
//   getRefreshToken(): string | null {
//     return isPlatformBrowser(this.platformId) ? localStorage.getItem('refreshToken') : null;
//   }

//   // Retrieve token from local storage
//   getToken(): string | null {
//     return isPlatformBrowser(this.platformId) ? localStorage.getItem('authToken') : null;
//   }

//   setToken(token: string): void {
//     localStorage.setItem('accessToken', token);
//   }
  

//   // Remove token (Logout)
//   clearToken(): void {
//     if (isPlatformBrowser(this.platformId)) {
//       console.log('Clearing token from localStorage');
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('refreshToken');
//     }
//   }

//   // Check if user is authenticated
//   isAuthenticated(): boolean {
//     return !!this.getToken();
//   }
// }














import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrlLogin = 'http://localhost:9500/api/login';
  private apiUrlRefresh = 'http://localhost:9500/api/refresh';
  // private apiUrlGetRefreshToken = 'http://localhost:9500/api/user/refresh-token'; // NEW: API to get refresh token from DB

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  // Login and store token automatically
  login(credentials: { email: string; password: string }): Observable<{ accessToken: string, refreshToken: string }> {
    console.log("LoginAuthService called......");
    console.log("in login");
    return this.http.post<{ accessToken: string, refreshToken: string }>(this.apiUrlLogin, credentials).pipe(
      tap(response => {
        if (response.accessToken && response.refreshToken) {
          this.storeToken(response.accessToken);
          this.storeRefreshToken(response.refreshToken);
        }
      }),
      catchError(error => throwError(() => error))
    );
  }



  // Refresh Access Token
  refreshAccessToken(): Observable<{ accessToken: string }> {
    console.log("RefreshAccessTokenAuthService called....");
    let refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      console.warn("No refresh token found in localStorage, fetching from DB...");
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<{ accessToken: string }>(this.apiUrlRefresh, { refreshToken }).pipe(
      tap(response => {
        if (response.accessToken) {
          this.storeToken(response.accessToken);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Refresh token failed:', error);
        this.clearToken();
        this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  // Logout
  logout() {
    console.log("logoutAuthService called....");
    this.clearToken();
    this.router.navigate(['/login']);
  }

  // Check if token is expired
  isTokenExpired(token: string): boolean {
    console.log("is TokenExpired auth called....");
    try {
      const decodedToken: any = jwtDecode(token);
      if (!decodedToken.exp) return true;
      return Date.now() >= decodedToken.exp * 1000;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  }

  // Store tokens
  storeToken(token: string): void {
    console.log("store token auth called....");
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
    }
  }

  storeRefreshToken(refreshToken: string): void {
    console.log("store refresh Token auth called....");
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  // Retrieve tokens
  getRefreshToken(): string | null {
    console.log("getRefreshTokenAuthService called....");
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('refreshToken') : null;
  }

  getToken(): string | null {
    console.log("getTokenAuthService called....");
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('authToken') : null;
  }

  // Clear tokens
  clearToken(): void {
    console.log("cleanTokenAuthService called....");
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    console.log("isAuthenticated AuthService called....");
    return !!this.getToken();
  }
}
