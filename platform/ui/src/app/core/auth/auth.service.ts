import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Profile } from "../profile/profile.model";
import { ConfigService }  from  "../services/config.service";
import { Router } from '@angular/router';

@Injectable()
export class UserProfile {
    public profile: Profile;
    public token: String;
}
@Injectable()
export class AuthenticationService {
    public token = "";
public options;
    public cred: Observable<any>;
    public userProfile: Observable<UserProfile>;
    constructor(
        private http: Http, 
        private configService: ConfigService,
        private router: Router
        
    ) {
        //delete any existing user profile and token
        if(localStorage.getItem("currentUser")){
            this.token="";
            localStorage.removeItem("currentUser");
            localStorage.removeItem("token");
        }
        const headers = new Headers();
        this.options = new RequestOptions();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "JWT " + this.token);
        this.options.headers = headers;
    }
    public user(){
        if(localStorage.getItem("currentUser")){
            return JSON.parse(localStorage.getItem("currentUser")).profile;
        }
        return null;
    }
    public login(username: string, password: string, redirectUrl: string): Observable<UserProfile> {
        this.cred =  this.http.post(this.configService.server + "/auth", {username, password}) // ...using post request
                         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error: any) => Observable.throw(error.json().error || "Server error")); //...errors if any

        this.cred.subscribe((res) => {
            console.log(res.profile);
        this.token = "JWT " + res.token;
        this.userProfile=res.profile;
        localStorage.setItem("currentUser", JSON.stringify({ username, id: res.profile._id, token: res.token, profile:res.profile }));
        });
    
        return this.cred;
    }
    public loggedIn(){
         return !!localStorage.getItem("currentUser");


    }
    public logout() {
        this.cred = null;
        this.token = "";
        localStorage.removeItem("currentUser");
        this.userProfile=new Observable<UserProfile>();
        this.redirect('/login');
    }
    public getToken(){
        return this.token;
    }
    public getAuthHeaders(){
        
        return this.options;
    }


    private redirect(route: string) {
        console.log("redirecting to " + route);
        this.router.navigate([route]);
    }
}
