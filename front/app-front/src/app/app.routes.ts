import { Routes } from '@angular/router';
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { CategorySelectionComponent } from './components/category-selection/category-selection.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { BookRecommendationsComponent } from './components/book-recommendations/book-recommendations.component';
import { GameRecommendationsComponent } from './components/game-recommendations/game-recommendations.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';

export const routes: Routes = [

    { path: 'register', component: AuthRegisterComponent},
    { path: 'login', component: AuthLoginComponent},
    { path: '', redirectTo: 'register' , pathMatch: 'full' },
    { path: 'category-selection', component: CategorySelectionComponent},
    {path: 'recommendations', component: RecommendationsComponent},
    {path: 'recommendations/books', component: BookRecommendationsComponent},
    {path: 'recommendations/games', component: GameRecommendationsComponent},
    {path: 'home', component: HomeDashboardComponent},



    


];
