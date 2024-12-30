import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserAuthServiceService } from '../../services/UserAuthService.service';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent {
  loginForm: FormGroup;
  backendErrorMessage: string | null = null; 
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userAuthServiceService: UserAuthServiceService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]], 
      password: ['', [Validators.required, Validators.minLength(5)]], 
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true; 
      const { username, password } = this.loginForm.value;

      this.userAuthServiceService.loginUser(username, password).subscribe({
        next: (response) => {
          this.isSubmitting = false; 
          this.backendErrorMessage = null; 
          console.log('Login successful:', response);
          //this.router.navigate(['/dashboard']); 
        },
        error: (error) => {
          this.isSubmitting = false; 
          console.error('Login error:', error);
          this.backendErrorMessage = error.message || 'Invalid login credentials.';
        },
      });
    } else {
      this.backendErrorMessage = 'Please fill out the form correctly.';
    }
  }
}
