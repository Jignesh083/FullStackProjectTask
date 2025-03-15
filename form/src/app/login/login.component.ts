// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, RouterOutlet } from '@angular/router';
// import { UserserviceService } from '../services/userservice.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, FormsModule,RouterOutlet],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   isSubmitting = false;
//   errorMessage = '';

//   constructor(
//     private router: Router,
//     private fb: FormBuilder,
//     private userservice: UserserviceService
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   get f() {
//     return this.loginForm.controls;
//   }

//   ngOnInit() {}

//   onSubmit() {
//     if (this.loginForm.invalid) {
//       return;
//     }

//     this.isSubmitting = true;
//     this.errorMessage = '';

//     const { email, password } = this.loginForm.value;

//     this.userservice.login({ email, password }).subscribe({
//       next: (response) => {
//         if (response.success) {
//           alert('Login Successful!');
//           this.router.navigate(['/dashboard']);
//         } else {
//           this.errorMessage = 'Invalid email or password';
//         }
//         this.isSubmitting = false;
//       },
//       error: () => {
//         this.errorMessage = 'Error occurred during login';
//         this.isSubmitting = false;
//       }
//     });
//   }
// }

// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, RouterOutlet } from '@angular/router';
// import { UserserviceService } from '../services/userservice.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, FormsModule,RouterOutlet],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   isSubmitting = false;
//   errorMessage = '';

//   constructor(
//     private router: Router,
//     private fb: FormBuilder,
//     private userservice: UserserviceService
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   get f() {
//     return this.loginForm.controls;
//   }

//   ngOnInit() {}

//   onSubmit() {
//     if (this.loginForm.invalid) {
//       return;
//     }

//     this.isSubmitting = true;
//     this.errorMessage = '';

//     const { email, password } = this.loginForm.value;

//     this.userservice.login({ email, password }).subscribe({
//       next: (response) => {
//         if (response.success) {
//           alert('Login Successful!');
//           this.router.navigate(['/dashboard']);
//         } else {
//           this.errorMessage = 'Invalid email or password';
//         }
//         this.isSubmitting = false;
//       },
//       error: () => {
//         this.errorMessage = 'Error occurred during login';
//         this.isSubmitting = false;
//       }
//     });
//   }
// }
















// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, RouterOutlet } from '@angular/router';
// import { UserserviceService } from '../services/userservice.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, FormsModule,RouterOutlet],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   isSubmitting = false;
//   errorMessage = '';

//   constructor(
//     private router: Router,
//     private fb: FormBuilder,
//     private userservice: UserserviceService
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   get f() {
//     return this.loginForm.controls;
//   }

//   ngOnInit() {}

//   onSubmit() {
//     if (this.loginForm.invalid) {
//       return;
//     }

//     this.isSubmitting = true;
//     this.errorMessage = '';

//     const { email, password } = this.loginForm.value;

//     this.userservice.login({ email, password }).subscribe({
//       next: (response) => {
//         if (response.success) {
//           alert('Login Successful!');
//           this.router.navigate(['/dashboard']);
//         } else {
//           this.errorMessage = 'Invalid email or password';
//         }
//         this.isSubmitting = false;
//       },
//       error: () => {
//         this.errorMessage = 'Error occurred during login';
//         this.isSubmitting = false;
//       }
//     });
//   }
// }


// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, RouterOutlet } from '@angular/router';
// import { UserserviceService } from '../services/userservice.service';
// import { AuthService } from '../services/auth.service'; // ✅ Import AuthService

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterOutlet],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   isSubmitting = false;
//   errorMessage = '';

//   constructor(
//     private router: Router,
//     private fb: FormBuilder,
//     private userservice: UserserviceService,
//     private authService: AuthService //  Inject AuthService
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   get f() {
//     return this.loginForm.controls;
//   }

//   ngOnInit() {}

//   onSubmit() {
//     if (this.loginForm.invalid) {
//       return;
//     }

//     this.isSubmitting = true;
//     this.errorMessage = '';

//     const { email, password } = this.loginForm.value;

//     this.authService.login({ email, password }).subscribe({
//       next: (response) => {
//         if (response.accessToken) {
//           console.log(' Token stored successfully:', response.accessToken);
//           alert('Login Successful!');
//           this.router.navigate(['/dashboard']);
//         } else {
//           this.errorMessage = 'Invalid email or password';
//         }
//         this.isSubmitting = false;
//       },
//       error: () => {
//         this.errorMessage = 'Error occurred during login';
//         this.isSubmitting = false;
//       }
//     });
//   }
// }


























// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, RouterOutlet } from '@angular/router';
// import { UserserviceService } from '../services/userservice.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, FormsModule,RouterOutlet],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   isSubmitting = false;
//   errorMessage = '';

//   constructor(
//     private router: Router,
//     private fb: FormBuilder,
//     private userservice: UserserviceService
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   get f() {
//     return this.loginForm.controls;
//   }

//   ngOnInit() {}

//   onSubmit() {
//     if (this.loginForm.invalid) {
//       return;
//     }

//     this.isSubmitting = true;
//     this.errorMessage = '';

//     const { email, password } = this.loginForm.value;

//     this.userservice.login({ email, password }).subscribe({
//       next: (response) => {
//         if (response.success) {
//           alert('Login Successful!');
//           this.router.navigate(['/dashboard']);
//         } else {
//           this.errorMessage = 'Invalid email or password';
//         }
//         this.isSubmitting = false;
//       },
//       error: () => {
//         this.errorMessage = 'Error occurred during login';
//         this.isSubmitting = false;
//       }
//     });
//   }
// }







import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import { AuthService } from '../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService //  Inject AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        if (response.accessToken) {
          console.log(' Token stored successfully:', response.accessToken);
          alert('Login Successful!');
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage = 'Error occurred during login';
        this.isSubmitting = false;
      }
    });
  }
}