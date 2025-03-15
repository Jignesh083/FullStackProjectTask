import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavigationEnd, Router } from "@angular/router";
import { UserserviceService } from "../services/userservice.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  country: string;
  state: any;
  district: any;
  taluka: any;
  village: any;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgMultiSelectDropDownModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  updateForm: FormGroup;
  searchText: string = '';
  selectedFilter: keyof User = 'name';

  filteredUsers: User[] = [];
  editingUser: User | null = null;
  users: any[] = [];


  selectedStates: any[] = [];
  selectedDistricts: any[] = [];
  selectedTalukas: any[] = [];
  selectedVillages: any[] = [];


  uniqueDistricts: any[] = [];
  uniqueTalukas: any[] = [];
  uniqueVillages: any[] = [];
  uniqueState: any[] = [];



  filterCriteria = {
    state: [] as any[],
    district: [] as any[],
    taluka: [] as any[],
    village: [] as any[]
  };




  states: any[] = [];
  districts: any[] = [];
  talukas: any[] = [];
  villages: string[] = [];



  ngOnInit(): void {
    this.fetchUsers();
  }

  


  // fetchUsers() {
  //   console.log("fetchUsers called.....");
  //   this.userService.getUsers().subscribe({
  //     next: (users: any[]) => {
  //       console.log('Debug Users fetched:', users); // Debugging
        
  //       // Check the structure of the response data for each user
  //       this.users = users.map(user => {
  //         console.log('Mapping User:', user);
  //         return {
  //           ...user,
  //           state: user.state || '',       // If state is missing, assign an empty string
  //           district: user.district || '', // If district is missing, assign an empty string
  //           taluka: user.taluka || '',     // If taluka is missing, assign an empty string
  //           village: user.village || ''    // If village is missing, assign an empty string
  //         };
  //       });
  
  //       // Debugging logs for checking what data is coming in
  //       console.log('Users after mapping:', this.users);
  
  //       // Filter the users
  //       this.filteredUsers = [...this.users];
  
  //       // Update the filter values based on the fetched data
  //       this.updateFilters();
  //       this.fetchAllData();
  //     },
  //     error: (error) => {
  //       console.error('Error fetching users:', error);
  //     }
  //   });
  // }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }



  fetchUsers() {
    console.log("fetchUsers called.....");
  
    // Call to fetch the users from the backend
    this.userService.getUsers().subscribe({
      next: (users: any[]) => {
        console.log('Debug: Users fetched from API:', users); // Debugging: Log fetched users
  
        // Check the structure of the response data for each user
        this.users = users.map(user => ({
            ...user,
            state: user.state || '',       // If state is missing, assign an empty string
            district: user.district || '', // If district is missing, assign an empty string
            taluka: user.taluka || '',     // If taluka is missing, assign an empty string
            village: user.village || ''    // If village is missing, assign an empty string
          
        }));
  
        // Debugging logs for checking what data is coming in after mapping
        console.log('Debug: Users after mapping:', this.users);
  
        // Filter the users (just making a shallow copy here)
        this.filteredUsers = [...this.users];
        console.log('Debug: Filtered users after mapping:', this.filteredUsers); // Debugging filtered users
  
        // Update the filter values based on the fetched data
        this.updateFilters();
        
        // Fetch additional data for filtering (states, districts, etc.)
        this.fetchAllData();
      },
      error: (error) => {
        console.error('Error fetching users:', error); // Error handling: Log if there is an issue
      }
    });
  }
  
  



  updateFilters() {
    console.log("updateFilters called...");
    const statesSet = new Set<string>();
    const districtsSet = new Set<string>();
    const talukasSet = new Set<string>();
    const villagesSet = new Set<string>();
  
    this.users.forEach(user =>  {
      if (user.state) statesSet.add(user.state);
      if (user.district) districtsSet.add(user.district);
      if (user.taluka) talukasSet.add(user.taluka);
      if (user.village) villagesSet.add(user.village);
    });
  
    this.states = Array.from(statesSet);
    this.districts = Array.from(districtsSet);
    this.talukas = Array.from(talukasSet);
    this.villages = Array.from(villagesSet);
  }




  // updateFilters() {
  //   console.log("updateFilters called...");
  
  //   // Create sets for state, district, taluka, and village
  //   const statesSet = new Set<string>();
  //   const districtsSet = new Set<string>();
  //   const talukasSet = new Set<string>();
  //   const villagesSet = new Set<string>();
  
  //   // Loop through users and add each unique value to the appropriate set
  //   this.users.forEach(user => {
  //     console.log('Debug: Processing user:', user); // Log each user while processing for filters
  
  //     if (user.state) {
  //       console.log('Debug: Adding state:', user.state); // Log each state being added
  //       statesSet.add(user.state);
  //     }
  //     if (user.district) {
  //       console.log('Debug: Adding district:', user.district); // Log each district being added
  //       districtsSet.add(user.district);
  //     }
  //     if (user.taluka) {
  //       console.log('Debug: Adding taluka:', user.taluka); // Log each taluka being added
  //       talukasSet.add(user.taluka);
  //     }
  //     if (user.village) {
  //       console.log('Debug: Adding village:', user.village); // Log each village being added
  //       villagesSet.add(user.village);
  //     }
  //   });
  
  //   // Convert sets to arrays and assign to respective properties
  //   this.states = Array.from(statesSet);
  //   this.districts = Array.from(districtsSet);
  //   this.talukas = Array.from(talukasSet);
  //   this.villages = Array.from(villagesSet);
  
  //   // Log the final arrays for debugging
  //   console.log('Debug: States array:', this.states);
  //   console.log('Debug: Districts array:', this.districts);
  //   console.log('Debug: Talukas array:', this.talukas);
  //   console.log('Debug: Villages array:', this.villages);
  // }
  
  




  newUser: User = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    country: '',
    state: '',
    district: '',
    taluka: '',
    village: ''
  };




  // constructor(
  //   private router: Router,
  //   private fb: FormBuilder,
  //   private userService: UserserviceService,
  //   private http: HttpClient
  // ) {
  //   this.updateForm = this.fb.group({
  //     id: [''],
  //     name: [''],
  //     email: [''],
  //     phone: [''],
  //     dob: [''],
  //     gender: [''],
  //     address: [''],
  //     country: [''],
  //     state: [''],
  //     district: [''],
  //     taluka: [''],
  //     village: ['']
  //   });
  // }

  constructor(private userService: UserserviceService, private router: Router, private http: HttpClient ,private fb: FormBuilder,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/dashboard') {
        this.fetchUsers();
      }
    });
 
    this.userService.userUpdateObservable().subscribe(updated => {
      if (updated) {
        this.loadUsers();
      }
    });
      
        this.updateForm = this.fb.group({
          id: [''],
          name: [''],
          email: [''],
          phone: [''],
          dob: [''],
          gender: [''],
          address: [''],
          country: [''],
          state: [''],
          district: [''],
          taluka: [''],
          village: ['']
        });
  }





 
   
  dropdownSettings = {
    singleSelection: false,
    idField:'name',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    allowSearchFilter: true
  };





  fetchAllData() {
    console.log("fetchAll data called.....");
  
    // Create sets for state, district, taluka, and village
    const allStatesSet = new Set<string>();
    const allDistrictsSet = new Set<string>();
    const allTalukasSet = new Set<string>();
    const allVillagesSet = new Set<string>();
  
    // Loop through users and add each unique value to the appropriate set
    this.users.forEach(user => {
      if (user.state) allStatesSet.add(user.state);      // Add state if it exists
      if (user.district) allDistrictsSet.add(user.district);  // Add district if it exists
      if (user.taluka) allTalukasSet.add(user.taluka);      // Add taluka if it exists
      if (user.village && user.village.trim() !== '') {  // Ensure village is not empty
        allVillagesSet.add(user.village);
      }
    });
  
    // Convert sets to arrays and assign to respective properties
    this.uniqueState = Array.from(allStatesSet);
    this.uniqueDistricts = Array.from(allDistrictsSet);
    this.uniqueTalukas = Array.from(allTalukasSet);
    this.uniqueVillages = Array.from(allVillagesSet);
  }





  // fetchAllData() {
  //   console.log("fetchAll data called.....");
  
  //   // Create sets for state, district, taluka, and village
  //   const allStatesSet = new Set<string>();
  //   const allDistrictsSet = new Set<string>();
  //   const allTalukasSet = new Set<string>();
  //   const allVillagesSet = new Set<string>();
  
  //   // Loop through users and add each unique value to the appropriate set
  //   this.users.forEach(user => {
  //     console.log("Debugging user:", user); // Log each user to verify data
  
  //     if (user.state) {
  //       allStatesSet.add(user.state); // Add state if it exists
  //       console.log("Added to states:", user.state); // Debugging added state
  //     }
  
  //     if (user.district) {
  //       allDistrictsSet.add(user.district); // Add district if it exists
  //       console.log("Added to districts:", user.district); // Debugging added district
  //     }
  
  //     if (user.taluka) {
  //       allTalukasSet.add(user.taluka); // Add taluka if it exists
  //       console.log("Added to talukas:", user.taluka); // Debugging added taluka
  //     }
  
  //     if (user.village && user.village.trim() !== '') {
  //       allVillagesSet.add(user.village); // Add village if it's not empty
  //       console.log("Added to villages:", user.village); // Debugging added village
  //     }
  //   });
  
  //   // Convert sets to arrays and assign to respective properties
  //   this.uniqueState = Array.from(allStatesSet);
  //   this.uniqueDistricts = Array.from(allDistrictsSet);
  //   this.uniqueTalukas = Array.from(allTalukasSet);
  //   this.uniqueVillages = Array.from(allVillagesSet);
  
  //   // Debugging logs for the final arrays
  //   console.log("Unique States:", this.uniqueState);
  //   console.log("Unique Districts:", this.uniqueDistricts);
  //   console.log("Unique Talukas:", this.uniqueTalukas);
  //   console.log("Unique Villages:", this.uniqueVillages);
  // }
  
  



  applyFilter(): void {
    console.log("applyFilter called.....");
    const search = this.searchText.trim().toLowerCase();
  
    // Log filter criteria to verify its state
    console.log("Current Filter Criteria:", this.filterCriteria);
  
    this.filteredUsers = this.users.filter((user) => {
      console.log("Debug Applying filter for user:", user); // Log each user while filtering
      return (
        (search ? user[this.selectedFilter]?.toString().toLowerCase().includes(search) : true) &&
        (this.filterCriteria.state.length ? this.filterCriteria.state.includes(user.state) : true) &&
        (this.filterCriteria.district.length ? this.filterCriteria.district.includes(user.district) : true) &&
        (this.filterCriteria.taluka.length ? this.filterCriteria.taluka.includes(user.taluka) : true) &&
        (this.filterCriteria.village.length ? this.filterCriteria.village.includes(user.village) : true)
      );
    });
    console.log("Debug Filtered users:", this.filteredUsers); // Log filtered users
  }




  clearFilter(): void {
    console.log("clear filter called.....")
    this.searchText = '';
    this.filterCriteria = { state: [], district: [], taluka: [], village: [] };
    this.districts = [];
    this.talukas = [];
    this.villages = [];
    this.filteredUsers = [...this.users];
  }

 
  checkAuth(): void {
    console.log("Check Auth called.....");
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.handleAuthError('No token found. Please log in again.');
      return;
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

  
  private handleAuthError(message: string): void {
    console.log("HandleError called.....");
    alert(message);
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }


  onRegister(): void {
    console.log("onRegister called.....");
    this.router.navigate(['/register']);
  }





  addUser(): void {
    console.log("addUser called.....");
    this.userService.addUser(this.newUser).subscribe({
      next: () => {
        this.fetchUsers();
        this.resetNewUser();
      },
      error: (error) => console.error('Error adding user:', error)
    });
  }

  


  private resetNewUser(): void {
    this.newUser = {
      id: 0,
      name: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      address: '',
      country: '',
      state: '',
      district: '',
      taluka: '',
      village: ''
    };
  }




  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.fetchUsers();
      });
    }
  }



  editUser(user: User): void {
    this.editingUser = { ...user };
    this.updateForm.patchValue(this.editingUser);
  }


  updateUser(): void {
    console.log("updateUser called.....");
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



  cancelEdit(): void {
    this.editingUser = null;
    this.updateForm.reset();
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }





// onDistrictChange() {
//   console.log("Selected Districts:", this.filterCriteria.district);

//   if (!this.filterCriteria.district.length) {
//     this.uniqueTalukas = [];
//     this.uniqueVillages = [];
//     return;
//   }

//   const selectedDistricts = this.filterCriteria.district.map(d => d.name);

//   // Filter unique talukas based on selected districts
//   const talukaSet = new Set();
//   this.users.forEach(user => {
//     if (selectedDistricts.includes(user.district)) {
//       talukaSet.add(user.taluka);
//     }
//   });

//   this.uniqueTalukas = Array.from(talukaSet).map(taluka => ({ id: taluka, name: taluka }));
//   this.filterCriteria.taluka = [];
//   this.filterCriteria.village = [];
// }







// onVillageChange() {
//   console.log("Selected Villages:", this.filterCriteria.village);

//   if (!this.filterCriteria.village.length) {
//     return;
//   }

//   const selectedVillages = this.filterCriteria.village.map(v => v.name);

//   this.filteredUsers = this.users.filter(user => selectedVillages.includes(user.village));
// }






  // change: onTalukaChange method added
  // onTalukaChange() {
  //   console.log("Selected Talukas:", this.filterCriteria.taluka);

  //   if (!this.filterCriteria.taluka.length) {
  //     this.uniqueVillages = [];
  //     return;
  //   }

  //   const selectedTalukas = this.filterCriteria.taluka.map(t => t.name);

  //   // Filter unique villages based on selected talukas
  //   const villageSet = new Set();
  //   this.users.forEach(user => {
  //     if (selectedTalukas.includes(user.taluka)) {
  //       villageSet.add(user.village);
  //     }
  //   });

  //   this.uniqueVillages = Array.from(villageSet).map(village => ({ id: village, name: village }));
  //   this.filterCriteria.village = [];
  // }









  // change: resetFilters method added
  resetFilters() {
    this.uniqueDistricts = [];
    this.uniqueTalukas = [];
    this.uniqueVillages = [];
    this.filterCriteria.district = [];
    this.filterCriteria.taluka = [];
    this.filterCriteria.village = [];
  }

  




//   // Change: onStateChange method added
// onStateChange() {
//   console.log("Selected States:", this.filterCriteria.state);

//   if (!this.filterCriteria.state.length) {
//     this.uniqueDistricts = [];
//     this.uniqueTalukas = [];
//     this.uniqueVillages = [];
//     return;
//   }

//   const selectedStates = this.filterCriteria.state.map(s => s.name);

//   // Filter unique districts based on selected states
//   const districtSet = new Set();
//   this.users.forEach(user => {
//     if (selectedStates.includes(user.state)) {
//       districtSet.add(user.district);
//     }
//   });

//   this.uniqueDistricts = Array.from(districtSet).map(district => ({ id: district, name: district }));
//   this.filterCriteria.district = [];
//   this.filterCriteria.taluka = [];
//   this.filterCriteria.village = [];
// }





//----------------old-----------------------

// onStateChange() {
//   if (this.selectedStates.length > 0) {
//     const selectedStateNames = this.selectedStates.map(s => s.name);

//     const districtsInSelectedStates = this.users
//       .filter(user => selectedStateNames.includes(user.state))
//       .map(user => user.district);

//     this.uniqueDistricts = [...new Set(districtsInSelectedStates)].map(name => ({ name }));
//   } else {
//     this.uniqueDistricts = [];
//   }

//   this.selectedDistricts = [];
//   this.selectedTalukas = [];
//   this.selectedVillages = [];

//   this.applyFilter();
// }









// onDistrictChange() {
//   if (this.selectedDistricts.length > 0) {
//     const selectedDistrictNames = this.selectedDistricts.map(d => d.name);
    
//     const talukasInSelectedDistricts = this.users
//       .filter(user => selectedDistrictNames.includes(user.district))
//       .map(user => user.taluka);

//     this.uniqueTalukas = [...new Set(talukasInSelectedDistricts)].map(name => ({ name }));
//   } else {
//     this.uniqueTalukas = [];
//   }

//   this.selectedTalukas = [];
//   this.selectedVillages = [];

//   this.applyFilter();
// }









// onTalukaChange() {
//   if (this.selectedTalukas.length > 0) {
//     const selectedTalukaNames = this.selectedTalukas.map(t => t.name);
    
//     const villagesInSelectedTalukas = this.users
//       .filter(user => selectedTalukaNames.includes(user.taluka))
//       .map(user => user.village);

//     this.uniqueVillages = [...new Set(villagesInSelectedTalukas)].map(name => ({ name }));
//   } else {
//     this.uniqueVillages = [];
//   }

//   this.selectedVillages = [];

//   this.applyFilter();
// }

//----------------old-----------------------

onStateChange() {
  // Clear any previous selections in dependent dropdowns
  this.selectedDistricts = [];
  this.selectedTalukas = [];
  this.selectedVillages = [];

  // Filter and update the district options
  if (this.selectedStates.length > 0) {
    const selectedStateNames = this.selectedStates.map(s => s.name);

    const districtsInSelectedStates = this.users
      .filter(user => selectedStateNames.includes(user.state))
      .map(user => user.district);

    this.uniqueDistricts = [...new Set(districtsInSelectedStates)].map(name => ({ name }));
  } else {
    this.uniqueDistricts = [];
  }

  // Reset filter criteria
  this.filterCriteria.district = [];
  this.filterCriteria.taluka = [];
  this.filterCriteria.village = [];

  // Re-apply the filter to the table or data
  this.applyFilter();
}


onDistrictChange() {
  // Reset dependent selections
  this.selectedTalukas = [];
  this.selectedVillages = [];

  // Filter and update the taluka options based on the selected districts
  if (this.selectedDistricts.length > 0) {
    const selectedDistrictNames = this.selectedDistricts.map(d => d.name);

    const talukasInSelectedDistricts = this.users
      .filter(user => selectedDistrictNames.includes(user.district))
      .map(user => user.taluka);

    this.uniqueTalukas = [...new Set(talukasInSelectedDistricts)].map(name => ({ name }));
  } else {
    this.uniqueTalukas = [];
  }

  // Reset filter criteria
  this.filterCriteria.taluka = [];
  this.filterCriteria.village = [];

  // Re-apply the filter to the table or data
  this.applyFilter();
}

onTalukaChange() {
  // Reset village selections
  this.selectedVillages = [];

  // Filter and update the village options based on selected talukas
  if (this.selectedTalukas.length > 0) {
    const selectedTalukaNames = this.selectedTalukas.map(t => t.name);

    const villagesInSelectedTalukas = this.users
      .filter(user => selectedTalukaNames.includes(user.taluka))
      .map(user => user.village);

    this.uniqueVillages = [...new Set(villagesInSelectedTalukas)].map(name => ({ name }));
  } else {
    this.uniqueVillages = [];
  }

  // Reset filter criteria for villages
  this.filterCriteria.village = [];

  // Re-apply the filter to the table or data
  this.applyFilter();
}



onVillageChange() {
  // You can filter or apply any other logic based on the selected villages.
  this.applyFilter();
}




}