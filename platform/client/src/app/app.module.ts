import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

 
import { AppComponent }  from './app.component';
import { routing }        from './routing';
 
import { AlertComponent } from './alerts/alert.component';
import { AuthGuard } from './auth/auth.guard';
import { AlertService} from './alerts/alert.service';
import { AuthenticationService } from './auth/auth.service';
import { ProfileService } from './profile/profile.service';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/auth.login.component';
import { RegisterComponent } from './auth/auth.register.component';
 
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        ProfileComponent,
        LoginComponent,
        RegisterComponent
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