import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthServiceService } from '../../services/UserAuthService.service';

@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], 
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'] 
})
export class AuthRegisterComponent {
  form: FormGroup;
  successfulRegistration: boolean = false;

  constructor(
    private userAuthService: UserAuthServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email, Validators.minLength(12)]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
      },
      {
        validators: this.passwordsMatch
      }
    );
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
  
    if (password !== confirmPassword) {
      return { passwordsDoNotMatch: true }; 
    }
  
    return null; 
  }
  

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    if (this.form.valid) {
      const { username, email, password } = this.form.value;

      this.userAuthService.registerUser(username, password, email).subscribe((response: any) => {
        if (response.success) {
          this.successfulRegistration = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      });
    } else {
      console.log('Form input is invalid');
    }
  }
}
