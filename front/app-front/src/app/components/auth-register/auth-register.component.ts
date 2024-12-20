import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';




@Component({
  selector: 'app-auth-register',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './auth-register.component.html',
  styleUrl: './auth-register.component.scss'
})



export class AuthRegisterComponent {

  from:FormGroup;
  successfulRegistration: boolean

  constructor(
    private userAuthService: UserAuthService,
    private formBuilder: FormBuilder,
    privat router: Router

  ){
    this.from = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }

}
