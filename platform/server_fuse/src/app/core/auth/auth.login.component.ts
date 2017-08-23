import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../alerts/alert.service';
import {AuthenticationService } from './auth.service';
@Component({
    moduleId: module.id,
    templateUrl: 'auth.login.html',
    providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
    
    model: any = {};
    loading = false;
    returnUrl: string;
    constructor(
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl =  '/';
    }

    login(user) {
        this.loading = true;
        this.authenticationService.login(user.username,user.password).subscribe(
            Response =>{
                this.loading=false;
             console.log(Response);
            },
            err=>{
                console.log("Aw crappity");
                console.log(err);
            }
         );


    }
}
