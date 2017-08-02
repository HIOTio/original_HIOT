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
import { MdButtonModule, MdCheckboxModule, MdMenuModule } from '@angular/material';
import { AuthGuard} from './auth/auth.guard';
import {NavComponent} from './nav/nav.component'; 
import { AlertComponent } from './alerts/alert.component';
import { AlertService} from './alerts/alert.service';
import { AuthenticationService } from './auth/auth.service';
import { ProfileService } from './profile/profile.service';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/auth.login.component';
import { RegisterComponent } from './auth/auth.register.component';
import { DeploymentComponent } from './deployment/deployment.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
        MdMenuModule
    ],
    declarations: [
        AppComponent,
        NavComponent,
        AlertComponent,
        ProfileComponent,
        LoginComponent,
        RegisterComponent,
        DeploymentComponent,
        LogoutComponent,
        DashboardComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        ProfileService,
 
    ],
    bootstrap: [AppComponent]
})
 
export class AppModule { }