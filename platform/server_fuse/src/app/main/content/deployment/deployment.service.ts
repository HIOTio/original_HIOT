import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthenticationService } from '../../../core/auth/auth.service';
import {Deployment} from './deployment.model';
import {FuseConfigService} from '../../../core/services/config.service';
@Injectable()
export class DeploymentService {
    deployments={}
  constructor(private http: Http, private auth: AuthenticationService, private config: FuseConfigService) { 
        
  }

             
   add (deployment: Deployment): Observable<Deployment>{
        return this.http.post(this.config.server + '/api/deployment', deployment,this.auth.getAuthHeaders()) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
	public details(deployment_id): Observable<Deployment>{
        return this.http.get(this.config.server + '/api/deployment/' + deployment_id, this.auth.getAuthHeaders()) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any		
	}
    public list() :Observable<any>{
     return this.http.get(this.config.server + '/api/deployment_role/profile/'+ JSON.parse(localStorage.getItem('currentUser')).id,this.auth.getAuthHeaders())
      .map((res:Response) => res.json())
  
}
}
