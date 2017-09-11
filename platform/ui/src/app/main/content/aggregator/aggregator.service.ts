import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import {AuthenticationService } from "../../../core/auth/auth.service";
import {ConfigService} from "../../../core/services/config.service";
@Injectable()
export class AggregatorService {

  constructor(private http: Http, private auth: AuthenticationService, private config: ConfigService) { }
  public list(): Observable<any>{
    return this.http.get(this.config.server + "/api/aggregator/" , this.auth.getAuthHeaders())
     .map((res: Response) => res.json());

}
public fromList(agList): Observable<any>{
  return this.http.get(this.config.server + "/api/aggregator/fromList/" + JSON.stringify(agList), this.auth.getAuthHeaders())
   .map((res: Response) => res.json());

}
}
