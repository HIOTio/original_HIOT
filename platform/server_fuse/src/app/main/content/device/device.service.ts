import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthenticationService } from '../../../core/auth/auth.service';
import {FuseConfigService} from '../../../core/services/config.service';
@Injectable()
export class DeviceService {
    deployments={}
  constructor(private http: Http, private auth: AuthenticationService, private config: FuseConfigService) { 
        
  }

             
   add (device: any): Observable<any>{
        return this.http.post(this.config.server + '/api/deployment', device,this.auth.getAuthHeaders()) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
	public details(device_id): Observable<any>{
        return this.http.get(this.config.server + '/api/device/' + device_id, this.auth.getAuthHeaders()) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any		
	}
    public list(deployment_id) :Observable<any>{
     return this.http.get(this.config.server + '/api/device/deployment/'+ deployment_id,this.auth.getAuthHeaders())
      .map((res:Response) => res.json())
  }
	public count_deployment(deployment_id) :Observable<any>{
		     return this.http.get(this.config.server + '/api/device/count/deployment/'+ deployment_id,this.auth.getAuthHeaders())
      .map(res => res.json())
	}
}
