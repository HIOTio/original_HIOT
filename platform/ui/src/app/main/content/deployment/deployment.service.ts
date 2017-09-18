import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import {AuthenticationService } from "../../../core/auth/auth.service";
import {ConfigService} from "../../../core/services/config.service";
import {Deployment} from "./deployment.model";
@Injectable()
export class DeploymentService {
    public deployments= {};
  constructor(private http: Http, private auth: AuthenticationService, private config: ConfigService) {

  }
 public handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
        private extractData(res: Response) {
  //  console.log("got a response");
	let body = res.json();
        return body.data || {};
    }
   public add(deployment: Deployment): Observable<Deployment>{
//    console.log(this.config);
        return this.http.post(this.config.server + "/api/deployment", deployment, this.auth.getAuthHeaders()) 
                         .map(this.extractData)
           .catch(this.handleError); 
    }
	public details(deployment_id): Observable<Deployment>{
        return this.http.get(this.config.server + "/api/deployment/" + deployment_id, this.auth.getAuthHeaders()) // ...using post request
                         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error: any) => Observable.throw(error.json().error || "Server error")); //...errors if any
	}
    public list(): Observable<any>{
     return this.http.get(this.config.server + "/api/deployment_role/profile/" + JSON.parse(localStorage.getItem("currentUser")).id, this.auth.getAuthHeaders())
      .map((res: Response) => res.json());

}
}
