// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { catchError, switchMap, filter, take } from 'rxjs/operators';
// import { AuthService } from './services/auth.service';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private isRefreshing = false;
//   private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

//   constructor(private authService: AuthService, private router: Router) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log('Intercepting request:', req.url);
//     let authReq = req;
//     const token = localStorage.getItem('accessToken');

//     if (token) {
//       console.log("Token Found: " + token);
//       authReq = req.clone({
//         setHeaders: { Authorization: `Bearer ${token}` }
//       });
//     }

//     return next.handle(authReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         console.error('HTTP Error:', error);
//         if (error.status === 401) {
//           return this.handleTokenExpired(authReq, next);
//         }
//         return throwError(() => error);
//       })
//     );
//   }

//   private handleTokenExpired(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (!this.isRefreshing) {
//       this.isRefreshing = true;
//       this.refreshTokenSubject.next(null);
//       console.log('Refreshing token...');

//       return this.authService.refreshAccessToken().pipe(
//         switchMap((response: any) => {
//           console.log('Token refreshed:', response.accessToken);
//           this.isRefreshing = false;
//           localStorage.setItem('accessToken', response.accessToken);
//           this.refreshTokenSubject.next(response.accessToken);
//           return next.handle(this.addToken(req, response.accessToken));
//         }),
//         catchError((err) => {
//           console.error('Token refresh failed:', err);
//           this.isRefreshing = false;
//           this.authService.logout();
//           alert('Session expired. Redirecting to login.');
//           this.router.navigate(['/login']);
//           return throwError(() => err);
//         })
//       );
//     } else {
//       return this.refreshTokenSubject.pipe(
//         filter(token => token !== null),
//         take(1),
//         switchMap(token => {
//           console.log('Using refreshed token:', token);
//           return next.handle(this.addToken(req, token!));
//         })
//       );
//     }
//   }

//   private addToken(request: HttpRequest<any>, token: string | null) {
//     return token
//       ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
//       : request;
//   }
// }

















//->>>>>>>>>>>>>>>>>>>>>>>>>>>

// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { catchError, switchMap, filter, take } from 'rxjs/operators';
// import { AuthService } from './services/auth.service';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private isRefreshing = false;
//   private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

//   constructor(private authService: AuthService, private router: Router) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log('Intercepting request:', req.url);
//     const token = localStorage.getItem('authToken');
//     let authReq = req;

//     if (token) {
//       console.log('Token Found:', token);
//       authReq = this.addToken(req, token);
//     }

//     return next.handle(authReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         console.error('HTTP Error:', error);

//         if (error.status === 401) {
//           console.warn('Token Expired! Attempting refresh...');
//           return this.handleTokenExpired(req, next);
//         }

//         return throwError(() => error);
//       })
//     );
//   }

//   private handleTokenExpired(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (!this.isRefreshing) {
//       this.isRefreshing = true;
//       this.refreshTokenSubject.next(null);
//       console.log('Refreshing token...');

//       return this.authService.getRefreshToken().pipe(
//         switchMap((response: any) => {
//           if (!response || !response.accessToken) {
//             console.error('Invalid refresh token response:', response);
//             this.isRefreshing = false;
//             return this.logoutAndRedirect();
//           }

//           console.log('Token refreshed:', response.accessToken);
//           this.isRefreshing = false;
//           localStorage.setItem('authToken', response.accessToken);
//           this.refreshTokenSubject.next(response.accessToken);

//           return next.handle(this.addToken(req, response.accessToken));
//         }),
//         catchError((err) => {
//           console.error('Token refresh failed:', err);
//           this.isRefreshing = false;
//           return this.logoutAndRedirect();
//         })
//       );
//     } else {
//       console.log('Waiting for refreshed token...');
//       return this.refreshTokenSubject.pipe(
//         filter(token => token !== null),
//         take(1),
//         switchMap(token => next.handle(this.addToken(req, token!)))
//       );
//     }
//   }

//   private addToken(request: HttpRequest<any>, token: string | null) {
//     return token
//       ? request.clone({ setHeaders: { Authorization: `Bearer ${token} `} })
//       : request;
//   }

//   private logoutAndRedirect(): Observable<any> {
//     this.authService.logout();
//     alert('Session expired. Redirecting to login.');
//     this.router.navigate(['/login']);
//     return throwError(() => new Error('Session expired'));
//   }
// }












import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepting request:', req.url);
    
    const token = this.authService.getToken(); // 🛠️ Fix: Proper method to get token
    let authReq = req;

    if (token) {
      console.log('Token Found:', token);
      authReq = this.addToken(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);

        if (error.status === 401) {
          console.warn('Token Expired! Attempting refresh...');
          return this.handleTokenExpired(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  // private handleTokenExpired(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //     this.refreshTokenSubject.next(null);
  //     console.log('Refreshing token...');

  //     const refreshToken = this.authService.getRefreshToken(); // 🛠️ Fix: Get refresh token from storage
      
  //     if (!refreshToken) {
  //       console.error('No refresh token found. Logging out...');
  //       this.isRefreshing = false;
  //       return this.logoutAndRedirect();
  //     }

  //     return this.authService.refreshToken().pipe(
  //       switchMap((response: any) => {
  //         if (!response || !response.accessToken) {
  //           console.error('Invalid refresh token response:', response);
  //           this.isRefreshing = false;
  //           return this.logoutAndRedirect();
  //         }

  //         console.log('Token refreshed:', response.accessToken);
  //         this.isRefreshing = false;
  //         this.authService.saveTokens(response.accessToken, refreshToken); // 🛠️ Fix: Save new tokens properly
  //         this.refreshTokenSubject.next(response.accessToken);

  //         return next.handle(this.addToken(req, response.accessToken));
  //       }),
  //       catchError((err) => {
  //         console.error('Token refresh failed:', err);
  //         this.isRefreshing = false;
  //         return this.logoutAndRedirect();
  //       })
  //     );
  //   } else {
  //     console.log('Waiting for refreshed token...');
  //     return this.refreshTokenSubject.pipe(
  //       filter(token => token !== null),
  //       take(1),
  //       switchMap(token => next.handle(this.addToken(req, token!)))
  //     );
  //   }
  // }


  private handleTokenExpired(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      console.log('Refreshing token...');
  
      return this.authService.refreshAccessToken().pipe(
        switchMap((response: any) => {
          if (!response || !response.accessToken) {
            console.error('Invalid refresh token response:', response);
            this.isRefreshing = false;
            return this.logoutAndRedirect();
          }
  
          console.log('Token refreshed:', response.accessToken);
          this.isRefreshing = false;
  
          // Ensure refreshToken is retrieved correctly
          const newRefreshToken = response.refreshToken || localStorage.getItem('refreshToken');
  
          // this.authService.saveTokens(response.accessToken, newRefreshToken);
          this.refreshTokenSubject.next(response.accessToken);
  
          return next.handle(this.addToken(req, response.accessToken));
        }),
        catchError((err) => {
          console.error('Token refresh failed:', err);
          this.isRefreshing = false;
          return this.logoutAndRedirect();
        })
      );
    } else {
      console.log('Waiting for refreshed token...');
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.addToken(req, token!)))
      );
    }
  }
  

  private addToken(request: HttpRequest<any>, token: string | null) {
    return token
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token} `} })
      : request;
  }

  private logoutAndRedirect(): Observable<any> {
    this.authService.logout();
    alert('Session expired. Redirecting to login.');
    this.router.navigate(['/login']);
    return throwError(() => new Error('Session expired'));
  }
}
