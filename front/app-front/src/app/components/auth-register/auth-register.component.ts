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
  successfulRegistration: boolean = false;

  constructor(
    private userAuthService: UserAuthService,
    private formBuilder: FormBuilder,
    private router: Router

  ){
    this.from = this.formBuilder.group({
      username: ['', Validators.required, Validators.minLength(5)],
      email: ['', [Validators.required, Validators.email, Validators.minLength(12)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
    });
    
  }//CONSTRUCTOR END


  onSubmit(){
    if(this.from.valid){
      this.userAuthService.registerUser(this.from.value).subscribe((response: any) => {
        if(response.success){
          this.successfulRegistration = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      });
    }else{
      console.log('Form input is invalid');
    }
  }

}
