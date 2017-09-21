import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { ConfigService }  from  "../services/config.service";

export class Profile{
    profile:{_id:0};
    authenticated:boolean;
    constructor(){
        this.authenticated=false;
        
    }
}
@Injectable()
export class AuthenticationService {
    public token = "";
public options;
    cred=new BehaviorSubject(new Profile);
    public profile:Profile;
    constructor(
        private http: Http, 
        private configService: ConfigService,
        private router: Router
        
    ) {
        //TODO: update this to check validity (e.g. age) of any local token before clearing it
        this.profile={
            authenticated: false,
            profile:null
        }
        
        if(localStorage.getItem("currentUser")){
        // TODO: Update this to check the existing token against the server and log the user in if it's still valid
            this.token="";
            localStorage.removeItem("currentUser");
            localStorage.removeItem("token"); 
        }
        const headers = new Headers();
        this.options = new RequestOptions();
        headers.append("Content-Type", "application/json");
        this.options.headers = headers;
    }

    public creds(): Observable<any>{
        return this.cred.asObservable();
    }
    public login(username: string, password: string, redirectUrl: string): Observable<any> {
        this.http.post(this.configService.server + "/auth", {username, password}) 
                         .map((res: Response) => res.json()) 
                         .catch((error: any) => Observable.throw(error.json().error || "Server error"))
.subscribe((res) => {
        this.token = "JWT " + res.token;
        this.profile.profile=res.profile;
        this.profile.authenticated=true;
            this.cred.next(this.profile);
        //    console.log(res);
            const headers = new Headers();
            this.options = new RequestOptions();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", this.token);
            
        this.options.headers = headers;
        localStorage.setItem("currentUser", JSON.stringify({ username, id: res.profile._id, token: res.token, profile:res.profile }));
        });
    
        return this.cred;
    }

    public userId(){
            return  this.profile.profile._id;
  
    }
    public logout() {
        this.token = "";
        localStorage.removeItem("currentUser");
        this.profile={
            profile:null,
            authenticated:false
        };
        this.cred.next(this.profile);
        this.redirect('/login');
    }
    public getToken(){
        return this.token;
    }
    public getAuthHeaders(){
        
        return this.options;
    }


    private redirect(route: string) {
      //  console.log("redirecting to " + route);
        this.router.navigate([route]);
    }
}
