import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import {AuthenticationService } from "../../../core/auth/auth.service";
import {ConfigService} from "../../../core/services/config.service";
@Injectable()
export class DeviceService {
    public deployments= {};
  constructor(private http: Http, private auth: AuthenticationService, private config: ConfigService) {

  }

   public add(device: any): Observable<any>{
        return this.http.post(this.config.server + "/api/deployment", device, this.auth.getAuthHeaders()) // ...using post request
                         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error: any) => Observable.throw(error.json().error || "Server error")); //...errors if any
    }
	public details(device_id): Observable<any>{
        return this.http.get(this.config.server + "/api/device/" + device_id, this.auth.getAuthHeaders()) // ...using post request
                         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error: any) => Observable.throw(error.json().error || "Server error")); //...errors if any
	}
    public list(deployment_id): Observable<any>{
     return this.http.get(this.config.server + "/api/device/deployment/" + deployment_id, this.auth.getAuthHeaders())
      .map((res: Response) => res.json());
  }
	public count_deployment(deployment_id): Observable<any>{
		     return this.http.get(this.config.server + "/api/device/count/deployment/" + deployment_id, this.auth.getAuthHeaders())
      .map((res) => res.json());
	}
}
