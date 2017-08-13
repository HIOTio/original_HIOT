import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Profile } from '../profile/profile.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserProfile {
    profile: Profile;
    token: String;
}
@Injectable()
export class AuthenticationService {
    token = '';
    cred: Observable<any>;
    constructor(private http: Http) { 
    }
    login (username: string, password: string): Observable<UserProfile> {
        this.cred=  this.http.post('http://localhost:3000/auth', {username: username, password:password}) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

        this.cred.subscribe((res) =>{
        this.token = 'JWT ' + res.token;
        localStorage.setItem('currentUser', JSON.stringify({ username: username, id: res.profile._id, token: res.token }));
        })
        return this.cred;
    }
    loggedIn(){
         if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        return false;
    }
    logout() {
        this.cred= null;
        this.token='';
        localStorage.removeItem('currentUser');
    }
    getToken(){
        return this.token;
    }
    getAuthHeaders(){
        var headers = new Headers();
        var options = new RequestOptions();
        headers.append('Content-Type','application/json');
        headers.append('Authorization','JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
        options.headers=headers;
        return options;
    }

}

