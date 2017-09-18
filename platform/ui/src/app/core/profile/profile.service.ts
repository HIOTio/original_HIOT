import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Profile } from "./profile.model";
import { ConfigService }  from  "../services/config.service";
@Injectable()
export class ProfileService {
    constructor(private http: Http, private configService: ConfigService) { }
    public getById(id: number) {
        return this.http.get(this.configService.server + "/api/profile/" + id, this.jwt()).map((response: Response) => response.json());
    }

    public create(user: Profile) {
	//	console.log(user);
  return this.http.post(this.configService.server + "/register", user, this.jwt()).map((response: Response) => response.json());
    }
    public update(user: Profile) {
        return this.http.put(this.configService.server + "/profile/", user, this.jwt()).map((response: Response) => response.json());
    }

    public delete(id: number) {
        return this.http.delete(this.configService.server + "/api/profile/", this.jwt()).map((response: Response) => response.json());
    }
    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ Authorization: "Bearer " + currentUser.token });
            return new RequestOptions({ headers });
        }
    }
}
