import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Profile } from '../profile/profile.model';

@Injectable()
export class userProfile{
    profile:Profile;
        token:string;
            
}
@Injectable()
export class AuthenticationService {
    
    token='';
    cred:Observable<any>;
    constructor(private http: Http) { }
    login (username: string, password: string): Observable<userProfile>{
        this.cred=  this.http.post('http://localhost:3000/auth', {username: username, password:password}) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    
        this.cred.subscribe((res) =>{
        this.token='JWT ' + res.token;
            console.log(this.token);
        })
        return this.cred;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.token='';
    }
    getToken(){
        return this.token;
    }

}
