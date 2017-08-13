import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { routing } from './routing';
import { MaterialModule } from '@angular/material';
import {Hammerjs } from 'hammerjs';
import { MdButtonModule, MdCheckboxModule, MdMenuModule,MdSnackBarModule } from '@angular/material';
import { AuthGuard} from './auth/auth.guard';
import {NavComponent} from './nav/nav.component'; 
import { AlertComponent } from './alerts/alert.component';
import { AlertService} from './alerts/alert.service';
import { AuthenticationService } from './auth/auth.service';
import { ProfileService } from './profile/profile.service';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/auth.login.component';
import { RegisterComponent } from './auth/auth.register.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditDeploymentComponent } from './deployment/edit/edit-deployment.component';
import { AddDeploymentComponent } from './deployment/add/add-deployment.component';
import { DeleteDeploymentComponent } from './deployment/delete/delete-deployment.component';
import { ListDeploymentComponent } from './deployment/list/list-deployment.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        MdButtonModule,
        MdCheckboxModule,
        MdMenuModule,
        MdSnackBarModule
    ],
    declarations: [
        AppComponent,
        NavComponent,
        AlertComponent,
        ProfileComponent,
        LoginComponent,
        RegisterComponent,
        LogoutComponent,
        DashboardComponent,
        EditDeploymentComponent,
        AddDeploymentComponent,
        DeleteDeploymentComponent,
        ListDeploymentComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        ProfileService
 
    ],
    bootstrap: [AppComponent]
})
 
export class AppModule { }