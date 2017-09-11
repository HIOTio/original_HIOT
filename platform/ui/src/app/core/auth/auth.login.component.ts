import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import {AuthenticationService } from "./auth.service";
@Component({
    moduleId: module.id,
    templateUrl: "auth.login.html",
    providers: [AuthenticationService],
})
export class LoginComponent implements OnInit {

    public model: any = {};
    public loading = false;
    public returnUrl: string;
    public error: string;
    constructor(
        private authenticationService: AuthenticationService, 
        private router: Router
    ) { }

    public ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl =  "/";
    }

    public login(user) {
        this.loading = true;
        this.authenticationService.login(user.username, user.password,this.returnUrl).subscribe(
            (Response) => {
                this.loading = false;
                console.log(Response);
                this.error=null;
                this.router.navigate([this.returnUrl]);
//TODO: redirect the user somewhere ...
            },
            (err) => {
//TODO: need to handle the login failure properly
                this.loading=false;
                this.error= err;
                console.log("there was an error");
                console.log(err);
            },
         );

    }
}
