import { Component } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';





@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet],
  providers:[{provide: [provideHttpClient(withInterceptorsFromDi())], useClass: AuthInterceptor, multi: true}] ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'form';
}
