import { Routes, RouterModule } from '@angular/router';
 
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/auth.login.component';
import { RegisterComponent } from './auth/auth.register.component';
import { AuthGuard } from './auth/auth.guard';
 
const appRoutes: Routes = [
    { path: '', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);