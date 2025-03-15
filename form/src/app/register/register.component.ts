// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { UserserviceService } from '../services/userservice.service';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-register-form',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//   registrationForm: FormGroup;
//   submitted = false;
//   zipFileName: string = '';
//   successMessage: string = '';
//   errorMessage: string = '';
//   names: any[] = [];

//   constructor(private fb: FormBuilder, private userService: UserserviceService) {
//     this.registrationForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
//       dob: ['', Validators.required],
//       gender: ['', Validators.required],
//       address: ['', Validators.required],
//       country: ['', Validators.required],
//       zipFile: [null, Validators.required],
//       terms: [false, Validators.requiredTrue]
//     });
//   }

//   ngOnInit() {
//   }

//   onFileChange(event: any) {
//     const file = event.target.files[0];
//     if (file && file.name.endsWith('.zip')) {
//       this.zipFileName = file.name;
//       this.registrationForm.patchValue({ zipFile: file });
//     } else {
//       this.errorMessage = 'Only ZIP files are allowed!';
//       this.registrationForm.patchValue({ zipFile: null });
//       this.zipFileName = '';
//       setTimeout(() => this.errorMessage = '', 3000);
//     }
//   }

//   onSubmit() {
//     this.submitted = true;
//     console.log('Form submitted', this.registrationForm.value);

//     const formData = this.registrationForm.value;
//     this.userService.registerUser(formData).subscribe({
//       next: (response) => {
//         console.log('User registered successfully:', response);
//         alert('Registration successful!');
//         this.successMessage = 'Registration successful!';
//         setTimeout(() => this.successMessage = '', 3000);
//         this.registrationForm.reset();
//         this.zipFileName = '';
//         this.submitted = false;
//       },
//       error: (error) => {
//         console.error('Error registering user:', error);
//         this.errorMessage = 'Registration failed! Error: ' + error.message;
//         setTimeout(() => this.errorMessage = '', 3000);
//       }
//     });
//   }
// }










// RegisterComponent (register.component.ts)
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;
  zipFileName: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserserviceService, private router: Router) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      zipFile: [null, Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.zip')) {
      this.zipFileName = file.name;
      this.registrationForm.patchValue({ zipFile: file });
    } else {
      this.errorMessage = 'Only ZIP files are allowed!';
      this.registrationForm.patchValue({ zipFile: null });
      this.zipFileName = '';
      setTimeout(() => (this.errorMessage = ''), 3000);
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log('Form submitted', this.registrationForm.value);

    const formData = this.registrationForm.value;
    this.userService.registerUser(formData).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        alert('Registration successful!');
        this.successMessage = 'Registration successful!';
        setTimeout(() => (this.successMessage = ''), 3000);
        this.registrationForm.reset();
        this.zipFileName = '';
        this.submitted = false;
        this.router.navigate(['/dashboard'], { state: { newUser: response } });
      },
      error: (error) => {
        console.error('Error registering user:', error);
        this.errorMessage = 'Registration failed! Error: ' + error.message;
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    });
  }
}


