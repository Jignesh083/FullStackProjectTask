
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
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
  private userUpdated = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  
  refreshAccessToken(): Observable<{ accessToken: string }> {
    console.log("RefreshAccessToken  called.....");
    const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token
    if (!refreshToken) {
      console.warn("No refresh token found. Cannot refresh access token.");
      throw new Error('No refresh token available');
    }

    console.log("Attempting to refresh token..."); // Debug log

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
    console.log("registerUser called.....");
    console.log('Registering user with data:', userData); // Debug log
    // Creating a FormData object to send files along with other user data
  const formData = new FormData();
  
  // Append user data
  formData.append('name', userData.name);
  formData.append('email', userData.email);
  formData.append('phone', userData.phone);
  formData.append('dob', userData.dob);
  formData.append('gender', userData.gender);
  formData.append('address', userData.address);
  formData.append('country', userData.country);
  
  // Assuming userData contains a file object for the ZIP file
  if (userData.zipFile) {
    formData.append('zipFile', userData.zipFile, userData.zipFile.name);
  }
  
  console.log("Sending registration request with form data:", formData); 
    return this.http.post(this.apiUrlRegister, userData);
  }


  // registerUser(user: any): Observable<any> {
  //   const formData: FormData = new FormData();
  //   // formData.append('file', file, file.name);
  //   formData.append('user', JSON.stringify(user));

  //   const headers = new HttpHeaders();
  //   // headers.append('Content-Type', 'multipart/form-data');

  //   return this.http.post(this.apiUrl, formData, { headers });
  // }
  
  login(credentials: { email: string; password: string }): Observable<any> {
    console.log("login called.....");
    console.log('Logging in with credentials:', credentials); // Debug log
    return this.http.post<any>(this.apiUrlLogin, credentials);
  }

  
  authenticate(): Observable<any> {
    console.log("Authticate called.....");
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
    console.log("getUser called.....");
    const token = localStorage.getItem('authToken'); // Retrieve token
    if (!token) {
      console.error(' No token found. Unauthorized request.');
      throw new Error('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Fetching all users with token:', token); // Debugging log

    return this.http.get<User[]>(this.apiUrlUsers, { headers });
  }

  
  getUserById(id: number): Observable<User> {
    console.log("getUserById called.....");
    console.log('Fetching user by ID:', id); // Debug log
    return this.http.get<User>(`${this.apiUrlUsers}/${id}`);
  }

  
  addUser(user: User): Observable<User> {
    console.log("addUser called.....");
    console.log('Adding new user:', user); // Debug log
    return this.http.post<User>(this.apiUrlUsers, user);
  }

 
  updateUser(id: number, user: User): Observable<User> {
    console.log("updateUser called.....");
    console.log('Updating user with ID:', id, 'Data:', user); // Debug log
    return this.http.put<User>(`${this.apiUrlUsers}/${id}`, user);
  }


  userUpdateObservable(): Observable<boolean>
  {
    return this.userUpdated.asObservable();
  }



  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlUsers}/${id}`, { responseType: 'text' as 'json' });
  }




  getAccessToken(): string | null {
    const token = localStorage.getItem('accessToken'); //  Fix: Properly fetching access token
    console.log("Access Token:", token);  
    return token;
  }

  getRefreshToken(): string | null {
    const token = localStorage.getItem('refreshToken');
  console.log("Refresh Token:", token);  // Log for debugging
  return token;
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    console.log("Saving tokens...");
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  refreshToken(): Observable<any> {
    console.log("Refresh Token Claeed....")
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      console.error('No refresh token available!');
      return throwError(() => new Error('No refresh token'));
    }

    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap((response) => {
        if (response.accessToken) {
          this.saveTokens(response.accessToken, refreshToken); //  Fix: Properly saving new tokens
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
  
}

