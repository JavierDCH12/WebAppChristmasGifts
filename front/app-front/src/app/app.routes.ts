import { Routes } from '@angular/router';
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';

export const routes: Routes = [

    { path: 'register', component: AuthRegisterComponent},
    { path: 'login', component: AuthLoginComponent},
    //{ path: 'home', component: HomeComponent},
    { path: '', redirectTo: 'register' , pathMatch: 'full' },


];
