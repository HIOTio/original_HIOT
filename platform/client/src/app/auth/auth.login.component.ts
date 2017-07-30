import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../alerts/alert.service';
import {AuthenticationService } from './auth.service';

@Component({
    moduleId: module.id,
    templateUrl: 'auth.login.html'
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
    private http: Http,
        private route: ActivatedRoute,
        private router: Router,
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
         this.http.post('http://localhost:3000/auth', {username: user.username, password: user.password})
      .map(res => res.json())
      .subscribe(
         data => {
             console.log('logged in');
             this.alertService.success('Yah, logged in');
                    this.loading = false;
             localStorage.setItem('token', data.token);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
      );

    }
}
