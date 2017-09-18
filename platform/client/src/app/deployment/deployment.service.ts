import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import {AuthenticationService } from "..//auth/auth.service";
import {Deployment} from "./deployment.model";

@Injectable()
export class DeploymentService {
    public deployments= {};
  constructor(private http: Http, private auth: AuthenticationService) {

  }

   public add(deployment: Deployment): Observable<Deployment>{
    //   console.log(this.auth.getAuthHeaders());
       return this.http.post("http://localhost:3000/api/deployment", deployment, this.auth.getAuthHeaders()) // ...using post request
                         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error: any) => Observable.throw(error.json().error || "Server error")); //...errors if any
    }
    public list(): Observable<any>{
     return this.http.get("http://localhost:3000/api/deployment_role/profile/" + JSON.parse(localStorage.getItem("currentUser")).id, this.auth.getAuthHeaders())
      .map((res: Response) => res.json());

}
}
