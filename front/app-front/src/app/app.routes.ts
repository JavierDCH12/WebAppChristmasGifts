import { Routes } from '@angular/router';
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';

export const routes: Routes = [

    { path: 'register', component: AuthRegisterComponent},
    //{ path: 'login', component: AuthLoginComponent},
    //{ path: 'home', component: HomeComponent},
    { path: '', redirectTo: 'login' , pathMatch: 'full' },


];
