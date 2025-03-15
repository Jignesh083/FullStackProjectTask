import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.guard';



export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component: LoginComponent},
    {path:'dashboard',component: DashboardComponent, canActivate:[AuthGuard]},
    {path:'register',component: RegisterComponent,  canActivate:[AuthGuard]},
  
];
