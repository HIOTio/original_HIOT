import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Profile } from './profile.model';

@Injectable()
export class ProfileService {
    constructor(private http: Http) { }

    getById(id: number) {
        return this.http.get('http://localhost:3000/api/profile/' + id, this.jwt()).map((response: Response) => response.json());
    }
    create(user: Profile) {
		console.log(user);
        return this.http.post('http://localhost:3000/register', user, this.jwt()).map((response: Response) => response.json());
    }
    update(user: Profile) {
        return this.http.put('http://localhost:3000/profile/', user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('http://localhost:3000/api/profile/', this.jwt()).map((response: Response) => response.json());
    }
    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
