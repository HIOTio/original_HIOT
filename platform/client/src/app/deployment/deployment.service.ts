import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthenticationService } from '../auth/auth.service';
import {Deployment} from './deployment.model';


@Injectable()
export class DeploymentService {
    deployments= [];
  constructor(private http: Http, private auth: AuthenticationService) { 
     console.log(this.auth.getAuthHeaders());
        this.http.get('http://localhost:3000/api/deployment_role/profile/'+ JSON.parse(localStorage.getItem('currentUser')).id,this.auth.getAuthHeaders())
      .map((res:Response) => res.json())
  .subscribe(resp => {
        console.log(resp);
    this.deployments=resp;
    });
  }

             
   add (deployment: Deployment): Observable<Deployment>{
        return this.http.post('http://localhost:3000/api/deployment', deployment,this.auth.getAuthHeaders()) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    list(){
     
return this.deployments;
}
}