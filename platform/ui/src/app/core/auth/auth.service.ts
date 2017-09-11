import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Profile } from "../profile/profile.model";
import { ConfigService }  from  "../services/config.service";

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
    constructor(private http: Http, private configService: ConfigService) {
        if(localStorage.getItem("currentUser")){
            this.token=JSON.parse(localStorage.getItem("currentUser")).token;
        }else{
            this.token="";
        }
        const headers = new Headers();
        this.options = new RequestOptions();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "JWT " + this.token);
        this.options.headers = headers;
    }
    public login(username: string, password: string): Observable<UserProfile> {
        this.cred =  this.http.post(this.configService.server + "/auth", {username, password}) // ...using post request
                         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error: any) => Observable.throw(error.json().error || "Server error")); //...errors if any

        this.cred.subscribe((res) => {
        this.token = "JWT " + res.token;
        localStorage.setItem("currentUser", JSON.stringify({ username, id: res.profile._id, token: res.token }));
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
    }
    public getToken(){
        return this.token;
    }
    public getAuthHeaders(){
        
        return this.options;
    }

}
