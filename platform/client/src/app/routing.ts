import { Routes, RouterModule } from '@angular/router';
 
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/auth.login.component';
import {LogoutComponent} from './logout/logout.component';
import { RegisterComponent } from './auth/auth.register.component';
import { AuthGuard } from './auth/auth.guard';
import {ListDeploymentComponent} from './deployment/list/list-deployment.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const appRoutes: Routes = [
    { path: '', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
        { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'deployment', component: ListDeploymentComponent, canActivate: [AuthGuard]},
    { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);