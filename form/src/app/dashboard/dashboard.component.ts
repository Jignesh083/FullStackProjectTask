// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserserviceService } from '../services/userservice.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { UserserviceService } from "../services/userservice.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

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

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, FormsModule],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   updateForm: FormGroup;
//   searchText: string = '';
//   selectedFilter: keyof User = 'name';
//   filteredUsers: User[] = [];
//   editingUser: User | null = null;
//   users: User[] = [];

//   newUser: User = {
//     id: 0,
//     name: '',
//     email: '',
//     phone: '',
//     dob: '',
//     gender: '',
//     address: '',
//     country: ''
//   };

//   constructor(
//     private router: Router,
//     private fb: FormBuilder,
//     private userService: UserserviceService,
//     private http: HttpClient
//   ) {
//     this.updateForm = this.fb.group({
//       id: [''],
//       name: [''],
//       email: [''],
//       phone: [''],
//       dob: [''],
//       gender: [''],
//       address: [''],
//       country: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.fetchUsers();
//   }

//   fetchUsers() {
//     this.userService.getUsers().subscribe({
//       next: (users) => {
//         console.log('Users fetched:', users);
//         this.users = users;
//         this.filteredUsers = users;
//       },
//       error: (error) => {
//         console.error('Error fetching users:', error);
//       }
//     });
//   }

//   /**
//    * Verify authentication by checking the token
//    */
//   checkAuth(): void {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       this.handleAuthError('No token found. Please log in again.');
//       return;
//     }

//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     });

//     this.http.get('http://localhost:9500/api/auth', { headers }).subscribe({
//       next: (response) => {
//         console.log('Authentication successful:', response);
//       },
//       error: (error) => {
//         console.error('Error during authentication:', error);
//         if (error.status === 401) {
//           this.handleAuthError('Session expired. Please log in again.');
//         } else {
//           alert('An error occurred while verifying your session.');
//         }
//       }
//     });
//   }

//   /**
//    * Handle authentication errors
//    */
//   private handleAuthError(message: string): void {
//     alert(message);
//     localStorage.removeItem('authToken');
//     this.router.navigate(['/login']);
//   }

//   /**
//    * Navigate to the user registration page
//    */
//   onRegister(): void {
//     this.router.navigate(['/register']);
//   }

//   /**
//    * Apply search filter based on the selected criteria
//    */
//   applyFilter(): void {
//     const search = this.searchText.trim().toLowerCase();
//     if (!search) {
//       this.filteredUsers = [...this.users];
//       return;
//     }

//     this.filteredUsers = this.users.filter((user) =>
//       user[this.selectedFilter]?.toString().toLowerCase().includes(search)
//     );
//   }

//   /**
//    * Clear search filter and show all users
//    */
//   clearFilter(): void {
//     this.searchText = '';
//     this.filteredUsers = [...this.users];
//   }

//   /**
//    * Add a new user to the database
//    */
//   addUser(): void {
//     this.userService.addUser(this.newUser).subscribe({
//       next: () => {
//         this.fetchUsers();
//         this.resetNewUser();
//       },
//       error: (error) => console.error('Error adding user:', error)
//     });
//   }

//   /**
//    * Reset new user fields after adding
//    */
//   private resetNewUser(): void {
//     this.newUser = {
//       id: 0,
//       name: '',
//       email: '',
//       phone: '',
//       dob: '',
//       gender: '',
//       address: '',
//       country: ''
//     };
//   }

//   /**
//    * Delete a user from the database
//    */
//   deleteUser(userId: number): void {
//     if (confirm('Are you sure you want to delete this user?')) {
//       this.userService.deleteUser(userId).subscribe(() => {
//         this.fetchUsers();
//       });
//     }
//   }

//   /**
//    * Edit an existing user's details
//    */
//   editUser(user: User): void {
//     this.editingUser = { ...user };
//     this.updateForm.patchValue(this.editingUser);
//   }

//   /**
//    * Update the selected user's details
//    */
//   updateUser(): void {
//     if (this.editingUser) {
//       this.userService.updateUser(this.editingUser.id, this.updateForm.value).subscribe({
//         next: () => {
//           this.fetchUsers();
//           this.cancelEdit();
//         },
//         error: (error) => console.error('Error updating user:', error)
//       });
//     }
//   }

//   /**
//    * Cancel editing mode
//    */
//   cancelEdit(): void {
//     this.editingUser = null;
//     this.updateForm.reset();
//   }

//   logout(): void {
//     localStorage.removeItem('authToken');
//     this.router.navigate(['/login']);
//   }
// }



















// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserserviceService } from '../services/userservice.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

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

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, FormsModule],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   updateForm: FormGroup;
//   searchText: string = '';
//   selectedFilter: keyof User = 'name';
//   filteredUsers: User[] = [];
//   editingUser: User | null = null;
//   users: User[] = [];

//   newUser: User = {
//     id: 0,
//     name: '',
//     email: '',
//     phone: '',
//     dob: '',
//     gender: '',
//     address: '',
//     country: ''
//   };

//   constructor(
//     private router: Router,
//     private fb: FormBuilder,
//     private userService: UserserviceService,
//     private http: HttpClient
//   ) {
//     this.updateForm = this.fb.group({
//       id: [''],
//       name: [''],
//       email: [''],
//       phone: [''],
//       dob: [''],
//       gender: [''],
//       address: [''],
//       country: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.fetchUsers();
//   }

//   fetchUsers() {
//     this.userService.getUsers().subscribe({
//       next: (users) => {
//         console.log('Users fetched:', users);
//         this.users = users;
//         this.filteredUsers = users;
//       },
//       error: (error) => {
//         console.error('Error fetching users:', error);
//       }
//     });
//   }

//   /**
//    * Verify authentication by checking the token
//    */
//   checkAuth(): void {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       this.handleAuthError('No token found. Please log in again.');
//       return;
//     }

//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     });

//     this.http.get('http://localhost:9500/api/auth', { headers }).subscribe({
//       next: (response) => {
//         console.log('Authentication successful:', response);
//       },
//       error: (error) => {
//         console.error('Error during authentication:', error);
//         if (error.status === 401) {
//           this.handleAuthError('Session expired. Please log in again.');
//         } else {
//           alert('An error occurred while verifying your session.');
//         }
//       }
//     });
//   }

//   /**
//    * Handle authentication errors
//    */
//   private handleAuthError(message: string): void {
//     alert(message);
//     localStorage.removeItem('authToken');
//     this.router.navigate(['/login']);
//   }

//   /**
//    * Navigate to the user registration page
//    */
//   onRegister(): void {
//     this.router.navigate(['/register']);
//   }

//   /**
//    * Apply search filter based on the selected criteria
//    */
//   applyFilter(): void {
//     const search = this.searchText.trim().toLowerCase();
//     if (!search) {
//       this.filteredUsers = [...this.users];
//       return;
//     }

//     this.filteredUsers = this.users.filter((user) =>
//       user[this.selectedFilter]?.toString().toLowerCase().includes(search)
//     );
//   }

//   /**
//    * Clear search filter and show all users
//    */
//   clearFilter(): void {
//     this.searchText = '';
//     this.filteredUsers = [...this.users];
//   }

//   /**
//    * Add a new user to the database
//    */
//   addUser(): void {
//     this.userService.addUser(this.newUser).subscribe({
//       next: () => {
//         this.fetchUsers();
//         this.resetNewUser();
//       },
//       error: (error) => console.error('Error adding user:', error)
//     });
//   }

//   /**
//    * Reset new user fields after adding
//    */
//   private resetNewUser(): void {
//     this.newUser = {
//       id: 0,
//       name: '',
//       email: '',
//       phone: '',
//       dob: '',
//       gender: '',
//       address: '',
//       country: ''
//     };
//   }

//   /**
//    * Delete a user from the database
//    */
//   deleteUser(userId: number): void {
//     if (confirm('Are you sure you want to delete this user?')) {
//       this.userService.deleteUser(userId).subscribe(() => {
//         this.fetchUsers();
//       });
//     }
//   }

//   /**
//    * Edit an existing user's details
//    */
//   editUser(user: User): void {
//     this.editingUser = { ...user };
//     this.updateForm.patchValue(this.editingUser);
//   }

//   /**
//    * Update the selected user's details
//    */
//   updateUser(): void {
//     if (this.editingUser) {
//       this.userService.updateUser(this.editingUser.id, this.updateForm.value).subscribe({
//         next: () => {
//           this.fetchUsers();
//           this.cancelEdit();
//         },
//         error: (error) => console.error('Error updating user:', error)
//       });
//     }
//   }

//   /**
//    * Cancel editing mode
//    */
//   cancelEdit(): void {
//     this.editingUser = null;
//     this.updateForm.reset();
//   }

//   logout(): void {
//     localStorage.removeItem('authToken');
//     this.router.navigate(['/login']);
//   }
// }


























// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserserviceService } from '../services/userservice.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  updateForm: FormGroup;
  searchText: string = '';
  selectedFilter: keyof User = 'name';
  filteredUsers: User[] = [];
  editingUser: User | null = null;
  users: User[] = [];

  newUser: User = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    country: ''
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserserviceService,
    private http: HttpClient
  ) {
    this.updateForm = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
      phone: [''],
      dob: [''],
      gender: [''],
      address: [''],
      country: ['']
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  // fetchUsers() {
  //   this.userService.getUsers().subscribe((users) => {
  //     console.log('✅ Users fetched:', users);
  //   this.users = users;  // Assign to list once
  //   this.filteredUsers = users;  
  //   });
  // }





  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('Users fetched:', users);
        this.users = users;
        this.filteredUsers = users;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
  







  /**
   * Verify authentication by checking the token
   */
  checkAuth(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.handleAuthError('No token found. Please log in again.');
      return ;
    }

    const headers = new HttpHeaders({
      Authorization: 'Bearer ${token}',
      'Content-Type': 'application/json'
    });

    this.http.get('http://localhost:9500/api/auth', { headers }).subscribe({
      next: (response) => {
        console.log('Authentication successful:', response);
      },
      error: (error) => {
        console.error('Error during authentication:', error);
        if (error.status === 401) {
          this.handleAuthError('Session expired. Please log in again.');
        } else {
          alert('An error occurred while verifying your session.');
        }
      }
    });
  }

  /**
   * Handle authentication errors
   */
  private handleAuthError(message: string): void {
    alert(message);
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  /**
   * Navigate to the user registration page
   */
  onRegister(): void {
    this.router.navigate(['/register']);
  }

  /**
   * Apply search filter based on the selected criteria
   */
  applyFilter(): void {
    const search = this.searchText.trim().toLowerCase();
    if (!search) {
      this.filteredUsers = [...this.users];
      return;
    }

    this.filteredUsers = this.users.filter((user) =>
      user[this.selectedFilter]?.toString().toLowerCase().includes(search)
    );
  }

  /**
   * Clear search filter and show all users
   */
  clearFilter(): void {
    this.searchText = '';
    this.filteredUsers = [...this.users];
  }

  /**
   * Add a new user to the database
   */
  addUser(): void {
    this.userService.addUser(this.newUser).subscribe({
      next: () => {
        this.fetchUsers();
        this.resetNewUser();
      },
      error: (error) => console.error('Error adding user:', error)
    });
  }

  /**
   * Reset new user fields after adding
   */
  private resetNewUser(): void {
    this.newUser = {
      id: 0,
      name: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      address: '',
      country: ''
    };
  }

  /**
   * Delete a user from the database
   */
  // deleteUser(id: number) {
  //   const token = localStorage.getItem('authToken');
  //   const headers = new HttpHeaders({
  //     Authorization: Bearer ${token}
  //   });
  
  //   return this.http.delete(http://localhost:9500/api/users/${id}, { headers });
  // }
  

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.fetchUsers();
      });
    }
  }

  /**
   * Edit an existing user's details
   */
  editUser(user: User): void {
    this.editingUser = { ...user };
    this.updateForm.patchValue(this.editingUser);
  }

  /**
   * Update the selected user's details
   */
  updateUser(): void {
    if (this.editingUser) {
      this.userService.updateUser(this.editingUser.id, this.updateForm.value).subscribe({
        next: () => {
          this.fetchUsers();
          this.cancelEdit();
        },
        error: (error) => console.error('Error updating user:', error)
      });
    }
  }

  /**
   * Cancel editing mode
   */
  cancelEdit(): void {
    this.editingUser = null;
    this.updateForm.reset();
  }

  logout(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
