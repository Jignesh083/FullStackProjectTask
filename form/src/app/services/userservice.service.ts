// // import { Injectable } from '@angular/core';
// // import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// // import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';



// // interface User {
// //   id: number;
// //   name: string;
// //   email: string;
// //   phone: string;
// //   dob: string;
// //   gender: string;
// //   address: string;
// //   country: string;
// // }



// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class UserserviceService {
// //   private apiUrl = 'http://localhost:9500/api/register';

// //   constructor(private http: HttpClient) {}

// //   registerUser(userData: any): Observable<any> {
// //     return this.http.post(this.apiUrl, userData);
// //   }

 





// //   // for login

// //   private apiUrlLogin = 'http://localhost:9500/api/login'; // Change URL to match your backend


// //   login(credentials: { email: string, password: string }): Observable<any> {
// //     return this.http.post<any>(`${this.apiUrlLogin}`, credentials);
// //   }



// //   private users: User[] = [];
// //   private usersSubject = new BehaviorSubject<User[]>(this.users);

// //   getUsers(): Observable<User[]> {
// //     return this.usersSubject.asObservable();
// //   }

// //   addUser(user: User) {
// //     user.id = this.users.length + 1; // Assign a new ID
// //     this.users.push(user);
// //     this.usersSubject.next(this.users);
// //   }
  
// //   }




// // import { Injectable } from '@angular/core';
// // import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// // import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

// // interface User {
// //   id: number;
// //   name: string;
// //   email: string;
// //   phone: string;
// //   dob: string;
// //   gender: string;
// //   address: string;
// //   country: string;
// // }

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class UserserviceService {
// //   private apiUrl = 'http://localhost:9500/api/register';
// //   private apiUrlLogin = 'http://localhost:9500/api/login';
// //   private apiUrlUsers = 'http://localhost:9500/api/users';
// //   private users: User[] = [];
// //   private usersSubject = new BehaviorSubject<User[]>(this.users);

// //   constructor(private http: HttpClient) {}

// //   registerUser(userData: any): Observable<any> {
// //     return this.http.post(this.apiUrl, userData);
// //   }

// //   login(credentials: { email: string, password: string }): Observable<any> {
// //     return this.http.post<any>(this.apiUrlLogin, credentials);
// //   }

// //   getUsers(): Observable<User[]> {
// //     return this.usersSubject.asObservable();
// //   }

// //   addUser(user: User) {
// //     user.id = this.users.length + 1; // Assign a new ID
// //     this.users.push(user);
// //     this.usersSubject.next(this.users);
// //   }

// //   deleteUser(id: number) {
// //     this.users = this.users.filter(user => user.id !== id);
// //     this.usersSubject.next(this.users);
// //   }

// //   updateUser(updatedUser: User) {
// //     this.users = this.users.map(user => user.id === updatedUser.id ? updatedUser : user);
// //     this.usersSubject.next(this.users);
// //   }
// // }














// // import { Injectable } from '@angular/core';
// // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // import { Observable } from 'rxjs';

// // interface User {
// //   id: number;
// //   name: string;
// //   email: string;
// //   phone: string;
// //   dob: string;
// //   gender: string;
// //   address: string;
// //   country: string;
// // }

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class UserserviceService {
// //   private apiUrlRegister = 'http://localhost:9500/api/register';
// //   private apiUrlLogin = 'http://localhost:9500/api/login';
// //   private apiUrlAuth = 'http://localhost:9500/api/auth';
// //   private apiUrlUsers = 'http://localhost:9500/api/users'; // CRUD URL

// //   constructor(private http: HttpClient) {}

// //   // ✅ Register User
// //   registerUser(userData: any): Observable<any> {
// //     return this.http.post(this.apiUrlRegister, userData);
// //   }

// //   // ✅ Login User and store token
// //   login(credentials: { email: string; password: string }): Observable<any> {
// //     return this.http.post<any>(this.apiUrlLogin, credentials);
// //   }

// //   // ✅ Authenticate with token
// //   authenticate(): Observable<any> {
// //     const token = localStorage.getItem('authToken');
// //     if (!token) {
// //       throw new Error("No token found");
// //     }
// //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
// //     return this.http.get(this.apiUrlAuth, { headers });
// //   }

// //   // ✅ Get all users (READ)
// //   getUsers(): Observable<User[]> {
// //     return this.http.get<User[]>(this.apiUrlUsers);
// //   }

// //   // ✅ Get user by ID (READ)
// //   getUserById(id: number): Observable<User> {
// //     return this.http.get<User>(`${this.apiUrlUsers}/${id}`);
// //   }

// //   // ✅ Add new user (CREATE)
// //   addUser(user: User): Observable<User> {
// //     return this.http.post<User>(this.apiUrlUsers, user);
// //   }

// //   // ✅ Update user (UPDATE)
// //   updateUser(id: number, user: User): Observable<User> {
// //     return this.http.put<User>(`${this.apiUrlUsers}/${id}`, user);
// //   }

// //   // ✅ Delete user (DELETE)
// //   deleteUser(id: number): Observable<void> {
// //     return this.http.delete<void>(`${this.apiUrlUsers}/${id}`);
// //   }
// // }





// // import { Injectable } from '@angular/core';
// // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // import { Observable, throwError } from 'rxjs';
// // import { map, catchError } from 'rxjs/operators';

// // interface User {
// //   id: number;
// //   name: string;
// //   email: string;
// //   phone: string;
// //   dob: string;
// //   gender: string;
// //   address: string;
// //   country: string;
// // }

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class UserserviceService {
// //   private apiUrlRegister = 'http://localhost:9500/api/register';
// //   private apiUrlLogin = 'http://localhost:9500/api/login';
// //   private apiUrlAuth = 'http://localhost:9500/api/auth';
// //   private apiUrlUsers = 'http://localhost:9500/api/users'; // CRUD URL
// //   private apiUrlRefresh = 'http://localhost:9500/api/refresh';

// //   constructor(private http: HttpClient) {}

// //   //  Refresh Access Token
// //   refreshAccessToken(): Observable<{ accessToken: string }> {
// //     const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token
// //     if (!refreshToken) {
// //       console.warn("No refresh token found. Cannot refresh access token.");
// //       throw new Error('No refresh token available');
// //     }

// //     console.log("Attempting to refresh token..."); // Debug log

// //     return this.http.post<{ accessToken: string }>(this.apiUrlRefresh, { refreshToken }).pipe(
// //       map(response => {
// //         if (response.accessToken) {
// //           console.log("Token refreshed successfully:", response.accessToken);
// //           localStorage.setItem('authToken', response.accessToken); // Store new token
// //         }
// //         return response;
// //       }),
// //       catchError(error => {
// //         console.error("Refresh token failed:", error);
// //         return throwError(() => error);
// //       })
// //     );
// //   }

// //   // Register User
// //   registerUser(userData: any): Observable<any> {
// //     console.log('Registering user with data:', userData); // Debug log
// //     return this.http.post(this.apiUrlRegister, userData);
// //   }

// //   // Login User and store token
// //   login(credentials: { email: string; password: string }): Observable<any> {
// //     console.log('Logging in with credentials:', credentials); // Debug log
// //     return this.http.post<any>(this.apiUrlLogin, credentials);
// //   }

// //   // Authenticate with token
// //   authenticate(): Observable<any> {
// //     const token = localStorage.getItem('authToken');
// //     if (!token) {
// //       console.error('No token found'); // Debug log
// //       throw new Error("No token found");
// //     }
// //     console.log('Authenticating with token:', token); // Debug log
// //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
// //     return this.http.get(this.apiUrlAuth, { headers });
// //   }

// //   // Get all users (READ)
// //   getUsers(): Observable<User[]> {
// //     const token = localStorage.getItem('authToken'); // Retrieve token
// //     if (!token) {
// //       console.error('No token found. Unauthorized request.');
// //       throw new Error('No token found');
// //     }

// //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
// //     console.log('🔹 Fetching all users with token:', token); // Debugging log

// //     return this.http.get<User[]>(this.apiUrlUsers, { headers });
// //   }

// //   // Get user by ID (READ)
// //   getUserById(id: number): Observable<User> {
// //     console.log('Fetching user by ID:', id); // Debug log
// //     return this.http.get<User>(`${this.apiUrlUsers}/${id}`);
// //   }

// //   // Add new user (CREATE)
// //   addUser(user: User): Observable<User> {
// //     console.log('Adding new user:', user); // Debug log
// //     return this.http.post<User>(this.apiUrlUsers, user);
// //   }

// //   //  Update user (UPDATE)
// //   updateUser(id: number, user: User): Observable<User> {
// //     console.log('Updating user with ID:', id, 'Data:', user); // Debug log
// //     return this.http.put<User>(`${this.apiUrlUsers}/${id}`, user);
// //   }

// //   //  Delete user (DELETE)
// //   deleteUser(id: number): Observable<void> {
// //     console.log('Deleting user with ID:', id); // Debug log
// //     return this.http.delete<void>(`${this.apiUrlUsers}/${id}`);
// //   }
// // }

















// // import { Injectable } from '@angular/core';
// // import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// // import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';



// // interface User {
// //   id: number;
// //   name: string;
// //   email: string;
// //   phone: string;
// //   dob: string;
// //   gender: string;
// //   address: string;
// //   country: string;
// // }



// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class UserserviceService {
// //   private apiUrl = 'http://localhost:9500/api/register';

// //   constructor(private http: HttpClient) {}

// //   registerUser(userData: any): Observable<any> {
// //     return this.http.post(this.apiUrl, userData);
// //   }

 





// //   // for login

// //   private apiUrlLogin = 'http://localhost:9500/api/login'; // Change URL to match your backend


// //   login(credentials: { email: string, password: string }): Observable<any> {
// //     return this.http.post<any>(${this.apiUrlLogin}, credentials);
// //   }



// //   private users: User[] = [];
// //   private usersSubject = new BehaviorSubject<User[]>(this.users);

// //   getUsers(): Observable<User[]> {
// //     return this.usersSubject.asObservable();
// //   }

// //   addUser(user: User) {
// //     user.id = this.users.length + 1; // Assign a new ID
// //     this.users.push(user);
// //     this.usersSubject.next(this.users);
// //   }
  
// //   }




// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   dob: string;
//   gender: string;
//   address: string;
//   country: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class UserserviceService {
//   private apiUrl = 'http://localhost:9500/api/register';
//   private apiUrlLogin = 'http://localhost:9500/api/login';
//   private apiUrlUsers = 'http://localhost:9500/api/users';
//   private users: User[] = [];
//   private usersSubject = new BehaviorSubject<User[]>(this.users);

//   constructor(private http: HttpClient) {}

//   registerUser(userData: any): Observable<any> {
//     return this.http.post(this.apiUrl, userData);
//   }

//   login(credentials: { email: string, password: string }): Observable<any> {
//     return this.http.post<any>(this.apiUrlLogin, credentials);
//   }

//   getUsers(): Observable<User[]> {
//     return this.usersSubject.asObservable();
//   }

//   addUser(user: User) {
//     user.id = this.users.length + 1; // Assign a new ID
//     this.users.push(user);
//     this.usersSubject.next(this.users);
//   }

//   deleteUser(id: number) {
//     this.users = this.users.filter(user => user.id !== id);
//     this.usersSubject.next(this.users);
//   }

//   updateUser(updatedUser: User) {
//     this.users = this.users.map(user => user.id === updatedUser.id ? updatedUser : user);
//     this.usersSubject.next(this.users);
//   }
// }








































// // import { Injectable } from '@angular/core';
// // import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// // import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';



// // interface User {
// //   id: number;
// //   name: string;
// //   email: string;
// //   phone: string;
// //   dob: string;
// //   gender: string;
// //   address: string;
// //   country: string;
// // }



// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class UserserviceService {
// //   private apiUrl = 'http://localhost:9500/api/register';

// //   constructor(private http: HttpClient) {}

// //   registerUser(userData: any): Observable<any> {
// //     return this.http.post(this.apiUrl, userData);
// //   }

 





// //   // for login

// //   private apiUrlLogin = 'http://localhost:9500/api/login'; // Change URL to match your backend


// //   login(credentials: { email: string, password: string }): Observable<any> {
// //     return this.http.post<any>(${this.apiUrlLogin}, credentials);
// //   }



// //   private users: User[] = [];
// //   private usersSubject = new BehaviorSubject<User[]>(this.users);

// //   getUsers(): Observable<User[]> {
// //     return this.usersSubject.asObservable();
// //   }

// //   addUser(user: User) {
// //     user.id = this.users.length + 1; // Assign a new ID
// //     this.users.push(user);
// //     this.usersSubject.next(this.users);
// //   }
  
// //   }




// // import { Injectable } from '@angular/core';
// // import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// // import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

// // interface User {
// //   id: number;
// //   name: string;
// //   email: string;
// //   phone: string;
// //   dob: string;
// //   gender: string;
// //   address: string;
// //   country: string;
// // }

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class UserserviceService {
// //   private apiUrl = 'http://localhost:9500/api/register';
// //   private apiUrlLogin = 'http://localhost:9500/api/login';
// //   private apiUrlUsers = 'http://localhost:9500/api/users';
// //   private users: User[] = [];
// //   private usersSubject = new BehaviorSubject<User[]>(this.users);

// //   constructor(private http: HttpClient) {}

// //   registerUser(userData: any): Observable<any> {
// //     return this.http.post(this.apiUrl, userData);
// //   }

// //   login(credentials: { email: string, password: string }): Observable<any> {
// //     return this.http.post<any>(this.apiUrlLogin, credentials);
// //   }

// //   getUsers(): Observable<User[]> {
// //     return this.usersSubject.asObservable();
// //   }

// //   addUser(user: User) {
// //     user.id = this.users.length + 1; // Assign a new ID
// //     this.users.push(user);
// //     this.usersSubject.next(this.users);
// //   }

// //   deleteUser(id: number) {
// //     this.users = this.users.filter(user => user.id !== id);
// //     this.usersSubject.next(this.users);
// //   }

// //   updateUser(updatedUser: User) {
// //     this.users = this.users.map(user => user.id === updatedUser.id ? updatedUser : user);
// //     this.usersSubject.next(this.users);
// //   }
// // }














// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   dob: string;
//   gender: string;
//   address: string;
//   country: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class UserserviceService {
//   private apiUrlRegister = 'http://localhost:9500/api/register';
//   private apiUrlLogin = 'http://localhost:9500/api/login';
//   private apiUrlAuth = 'http://localhost:9500/api/auth';
//   private apiUrlUsers = 'http://localhost:9500/api/users'; // CRUD URL

//   constructor(private http: HttpClient) {}

//   // ✅ Register User
//   registerUser(userData: any): Observable<any> {
//     return this.http.post(this.apiUrlRegister, userData);
//   }

//   // ✅ Login User and store token
//   login(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post<any>(this.apiUrlLogin, credentials);
//   }

//   // ✅ Authenticate with token
//   authenticate(): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       throw new Error("No token found");
//     }
//     const headers = new HttpHeaders().set('Authorization', Bearer ${token});
//     return this.http.get(this.apiUrlAuth, { headers });
//   }

//   // ✅ Get all users (READ)
//   getUsers(): Observable<User[]> {
//     return this.http.get<User[]>(this.apiUrlUsers);
//   }

//   // ✅ Get user by ID (READ)
//   getUserById(id: number): Observable<User> {
//     return this.http.get<User>(${this.apiUrlUsers}/${id});
//   }

//   // ✅ Add new user (CREATE)
//   addUser(user: User): Observable<User> {
//     return this.http.post<User>(this.apiUrlUsers, user);
//   }

//   // ✅ Update user (UPDATE)
//   updateUser(id: number, user: User): Observable<User> {
//     return this.http.put<User>(${this.apiUrlUsers}/${id}, user);
//   }

//   // ✅ Delete user (DELETE)
//   deleteUser(id: number): Observable<void> {
//     return this.http.delete<void>(${this.apiUrlUsers}/${id});
//   }
// }





import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private apiUrl = 'http://localhost:9500/api';
  private apiUrlRegister = 'http://localhost:9500/api/register';
  private apiUrlLogin = 'http://localhost:9500/api/login';
  private apiUrlAuth = 'http://localhost:9500/api/auth';
  private apiUrlUsers = 'http://localhost:9500/api/users'; // CRUD URL
  private apiUrlRefresh = 'http://localhost:9500/api/refresh';

  constructor(private http: HttpClient) {}

  
  refreshAccessToken(): Observable<{ accessToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token
    if (!refreshToken) {
      console.warn("No refresh token found. Cannot refresh access token.");
      throw new Error('No refresh token available');
    }

    console.log("🔹 Attempting to refresh token..."); // Debug log

    return this.http.post<{ accessToken: string }>(this.apiUrlRefresh, { refreshToken }).pipe(
      map(response => {
        if (response.accessToken) {
          console.log("Token refreshed successfully:", response.accessToken);
          localStorage.setItem('authToken', response.accessToken); // Store new token
        }
        return response;
      }),
      catchError(error => {
        console.error("Refresh token failed:", error);
        return throwError(() => error);
      })
    );
  }

  
  registerUser(userData: any): Observable<any> {
    console.log('Registering user with data:', userData); // Debug log
    return this.http.post(this.apiUrlRegister, userData);
  }

  
  login(credentials: { email: string; password: string }): Observable<any> {
    console.log('Logging in with credentials:', credentials); // Debug log
    return this.http.post<any>(this.apiUrlLogin, credentials);
  }

  
  authenticate(): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found'); // Debug log
      throw new Error("No token found");
    }
    console.log('Authenticating with token:', token); // Debug log
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrlAuth, { headers });
  }

  
  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('authToken'); // Retrieve token
    if (!token) {
      console.error(' No token found. Unauthorized request.');
      throw new Error('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('🔹 Fetching all users with token:', token); // Debugging log

    return this.http.get<User[]>(this.apiUrlUsers, { headers });
  }

  
  getUserById(id: number): Observable<User> {
    console.log('Fetching user by ID:', id); // Debug log
    return this.http.get<User>(`${this.apiUrlUsers}/${id}`);
  }

  
  addUser(user: User): Observable<User> {
    console.log('Adding new user:', user); // Debug log
    return this.http.post<User>(this.apiUrlUsers, user);
  }

 
  updateUser(id: number, user: User): Observable<User> {
    console.log('Updating user with ID:', id, 'Data:', user); // Debug log
    return this.http.put<User>(`${this.apiUrlUsers}/${id}`, user);
  }


  // deleteUser(id: number): Observable<void> {
  //   console.log('Deleting user with ID:', id); // Debug log
  //   return this.http.delete<void>(${this.apiUrlUsers}/${id});
  // }


  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlUsers}/${id}`, { responseType: 'text' as 'json' });
  }




  getAccessToken(): string | null {
    return localStorage.getItem('accessToken'); // 🛠️ Fix: Properly fetching access token
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken'); // 🛠️ Fix: Fetch refresh token before making request
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      console.error('No refresh token available!');
      return throwError(() => new Error('No refresh token'));
    }

    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap((response) => {
        if (response.accessToken) {
          this.saveTokens(response.accessToken, refreshToken); // 🛠️ Fix: Properly saving new tokens
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
  
}

