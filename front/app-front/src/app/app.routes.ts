import { Routes } from '@angular/router';
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { CategorySelectionComponent } from './components/category-selection/category-selection.component';

export const routes: Routes = [

    { path: 'register', component: AuthRegisterComponent},
    { path: 'login', component: AuthLoginComponent},
    //{ path: 'home', component: HomeComponent},
    { path: '', redirectTo: 'register' , pathMatch: 'full' },
    { path: 'category-selection', component: CategorySelectionComponent}


];
