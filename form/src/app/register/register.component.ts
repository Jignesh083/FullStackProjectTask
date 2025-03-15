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
  selectedFile: File | null = null;
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
      state: ['', Validators.required],
      district: [{ value: '', disabled: true }, Validators.required],
      taluka: [{ value: '', disabled: true }, Validators.required],
      village: [{ value: '', disabled: true }, Validators.required],
      zipFile: [null, Validators.required],

    });
  }



  states = [
    {
      "name": "Gujarat",
      "districts": [
        {
          "name": "Ahmedabad",
          "talukas": [
            { "name": "Daskroi", "villages": ["Ghatlodia", "Bopal"] },
            { "name": "Sanand", "villages": ["Bol", "Goraj"] }
          ]
        },
        {
          "name": "Surat",
          "talukas": [
            { "name": "Choryasi", "villages": ["Bhatha", "Dumas"] },
            { "name": "Kamrej", "villages": ["Mota", "Kosmada"] }
          ]
        }
      ]
    },
    {
      "name": "Maharashtra",
      "districts": [
        {
          "name": "Pune",
          "talukas": [
            { "name": "Haveli", "villages": ["Kondhwa", "Uruli Kanchan"] },
            { "name": "Mulshi", "villages": ["Pawna Nagar", "Kolvan"] }
          ]
        },
        {
          "name": "Nashik",
          "talukas": [
            { "name": "Dindori", "villages": ["Pimpalgaon", "Vadner"] },
            { "name": "Sinnar", "villages": ["Musalgaon", "Ghoti"] }
          ]
        }
      ]
    },
    {
      "name": "Rajasthan",
      "districts": [
        {
          "name": "Jaipur",
          "talukas": [
            { "name": "Amber", "villages": ["Kukas", "Jamwa Ramgarh"] },
            { "name": "Sanganer", "villages": ["Vatika", "Bagru"] }
          ]
        },
        {
          "name": "Jodhpur",
          "talukas": [
            { "name": "Osian", "villages": ["Khetasar", "Khetolai"] },
            { "name": "Luni", "villages": ["Doli", "Dhawa"] }
          ]
        }
      ]
    },
    {
      "name": "Karnataka",
      "districts": [
        {
          "name": "Bangalore",
          "talukas": [
            { "name": "Anekal", "villages": ["Attibele", "Chandapura"] },
            { "name": "Bangalore South", "villages": ["Begur", "Gottigere"] }
          ]
        },
        {
          "name": "Mysore",
          "talukas": [
            { "name": "Nanjangud", "villages": ["Hadinaru", "Hullahalli"] },
            { "name": "Hunsur", "villages": ["Bilikere", "Rangasamudra"] }
          ]
        }
      ]
    },
    {
      "name": "Tamil Nadu",
      "districts": [
        {
          "name": "Chennai",
          "talukas": [
            { "name": "Egmore", "villages": ["Chetpet", "Periamet"] },
            { "name": "Guindy", "villages": ["Velachery", "Saidapet"] }
          ]
        },
        {
          "name": "Coimbatore",
          "talukas": [
            { "name": "Pollachi", "villages": ["Zamin Uthukuli", "Kottur"] },
            { "name": "Mettupalayam", "villages": ["Thekkampatti", "Karamadai"] }
          ]
        }
      ]
    }                
  ];


  districts: { name: string; talukas: { name: string; villages: string[] }[] }[] = [];
  talukas: { name: string; villages: string[] }[] = [];
  villages: string[] = [];
  




  onStateChange() {
    const selectedState = this.states.find(state => state.name === this.registrationForm.value.state);
    this.districts = selectedState ? selectedState.districts : [];
    this.registrationForm.controls['district'].enable();
    this.registrationForm.controls['district'].setValue('');
    this.talukas = [];
    this.villages = [];
    this.registrationForm.controls['taluka'].disable();
    this.registrationForm.controls['village'].disable();
  }







  onDistrictChange() {
    const selectedDistrict = this.districts.find(district => district.name === this.registrationForm.value.district);
    this.talukas = selectedDistrict ? selectedDistrict.talukas : [];
    this.registrationForm.controls['taluka'].enable();
    this.registrationForm.controls['taluka'].setValue('');
    this.villages = [];
    this.registrationForm.controls['village'].disable();
  }

  onTalukaChange() {
    const selectedTaluka = this.talukas.find(taluka => taluka.name === this.registrationForm.value.taluka);
    this.villages = selectedTaluka ? selectedTaluka.villages : [];
    this.registrationForm.controls['village'].enable();
    this.registrationForm.controls['village'].setValue('');
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

  // onSubmit() {
  //   this.submitted = true;
  //   // console.log('Form submitted', this.registrationForm.value);
    

  //   if (this.registrationForm.invalid) {
  //     return; 
  //   }


  //   const formData = this.registrationForm.value;
  //   this.userService.registerUser(formData).subscribe({
  //     next: (response) => {
  //       console.log('User registered successfully:', response);
  //       alert('Registration successful!');
  //       this.successMessage = 'Registration successful!';
  //       setTimeout(() => (this.successMessage = ''), 3000);
  //       this.registrationForm.reset();
  //       this.zipFileName = '';
  //       this.submitted = false;
  //       this.router.navigate(['/dashboard'], { state: { newUser: response } });
  //     },
  //     error: (error) => {
  //       console.error('Error registering user:', error);
  //       this.errorMessage = 'Registration failed! Error: ' + error.message;
  //       setTimeout(() => (this.errorMessage = ''), 3000);
  //     }
  //   });
  // }

  // onSubmit() {
  //   this.submitted = true;
  
  //   if (this.registrationForm.invalid) {
  //     return;
  //   }
  
  //   const formData = this.registrationForm.value;
  
  //   // Make sure the file is selected
  //   // if (!this.selectedFile) {
  //   //   alert('Please select a file');
  //   //   return;
  //   // }
  
  //   // Pass both user data and the selected file to the registerUser method
  //   this.userService.registerUser(formData).subscribe({
  //     next: (response) => {
  //       console.log('User registered successfully:', response);
  //       alert('Registration successful!');
  //       this.successMessage = 'Registration successful!';
  //       setTimeout(() => (this.successMessage = ''), 3000);
  //       this.registrationForm.reset();
  //       this.zipFileName = '';
  //       this.submitted = false;
  //       this.router.navigate(['/dashboard'], { state: { newUser: response } });
  //     },
  //     error: (error) => {
  //       console.error('Error registering user:', error);
  //       this.errorMessage = 'Registration failed! Error: ' + error.message;
  //       setTimeout(() => (this.errorMessage = ''), 3000);
  //     }
  //   });
  // }
  onSubmit() {
    this.submitted = true;
    // console.log('Form submitted', this.registrationForm.value);
    

    if (this.registrationForm.invalid) {
      return; 
    }


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

  



