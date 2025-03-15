// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { AuthService } from './services/auth.service';
// import { Observable } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
//     console.log("AuthGuard Triggered for:", state.url);
    
//     const token = localStorage.getItem('authToken');
//     if (!token || this.isTokenExpired(token)) {
//       console.warn("Access Denied. Token expired or missing. Redirecting to /login");
//       localStorage.removeItem('authToken');  
//       console.debug("JWT Removed:", localStorage.getItem('authToken'));
//       this.router.navigate(['/login']);
//       return false;
//     }

//     // Check if token is expired, if so, try to refresh it
//     if (this.isTokenExpired(token)) {
//       console.warn("Token expired. Attempting to refresh the token.");
//       return this.authService.refreshAccessToken().pipe(
//         map((response) => {
//           if (response && response.accessToken) {
//             // Store new access token and allow access
//             console.log("Token refreshed successfully");
//             return true;
//           } else {
//             console.warn("Failed to refresh the token. Redirecting to /login.");
//             this.router.navigate(['/login']);
//             return false;
//           }
//         }),
//         catchError((error) => {
//           console.error('Error during refresh token process:', error);
//           this.router.navigate(['/login']);
//           return [false];  // Deny access if refresh fails
//         })
//       );
//     }

//     console.log("Access Allowed:", state.url);
//     return true;
//   }

//   private isTokenExpired(token: string): boolean {
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload
//       const expiry = payload.exp * 1000; // Convert to milliseconds    
//       return expiry < Date.now(); // Check if token is expired
//     } catch (e) {
//       console.error('AuthGuard: Error decoding token', e);
//       return true; // Consider invalid if decoding fails
//     }
//   }
// }





















//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
  //   console.log("AuthGuard Triggered for:", state.url);
    
  //   const token = localStorage.getItem('authToken');
  //   if (!token || this.isTokenExpired(token)) {
  //     console.warn("Access Denied. Token expired or missing. Redirecting to /login");
  //     localStorage.removeItem('authToken');  
  //     console.debug("JWT Removed:", localStorage.getItem('authToken'));
  //     this.router.navigate(['/login']);
  //     return false;
  //   }

  //   // Check if token is expired, if so, try to refresh it
  //   if (this.isTokenExpired(token)) {
  //     console.warn("Token expired. Attempting to refresh the token.");
  //     return this.authService.refreshAccessToken().pipe(
  //       map((response) => {
  //         if (response && response.accessToken) {
  //           // Store new access token and allow access
  //           console.log("Token refreshed successfully");
  //           return true;
  //         } else {
  //           console.warn("Failed to refresh the token. Redirecting to /login.");
  //           this.router.navigate(['/login']);
  //           return false;
  //         }
  //       }),
  //       catchError((error) => {
  //         console.error('Error during refresh token process:', error);
  //         this.router.navigate(['/login']);
  //         return [false];  // Deny access if refresh fails
  //       })
  //     );
  //   }

  //   console.log("Access Allowed:", state.url);
  //   return true;
  // }




  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log("🔹 AuthGuard Triggered for:", state.url);

    const token = this.authService.getToken();

    if (!token) {
      console.warn("No token found. Redirecting to /login.");
      this.router.navigate(['/login']);
      return false;
    }

    if (this.isTokenExpired(token)) {
      console.warn("Token expired. Attempting to refresh...");

      return this.authService.refreshAccessToken().pipe(
        map((response: any) => {
          if (response?.accessToken) {
            console.log("🔹 Token refreshed successfully.");
            this.authService.storeToken(response.accessToken);
            return true;  // Allow access
          } else {
            console.warn("Failed to refresh token. Redirecting to /login.");
            this.authService.clearToken();
            this.router.navigate(['/login']);
            return false;
          }
        }),
        catchError(error => {
          console.error("Error refreshing token:", error);
          this.authService.clearToken();
          this.router.navigate(['/login']);
          return of(false);  // Deny access if refresh fails
        })
      );
    }

    console.log("✅ Access Allowed:", state.url);
    return true;
  }








  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload
      const expiry = payload.exp * 1000; // Convert to milliseconds    
      return expiry < Date.now(); // Check if token is expired
    } catch (e) {
      console.error('AuthGuard: Error decoding token', e);
      return true; // Consider invalid if decoding fails
    }
  }
}

