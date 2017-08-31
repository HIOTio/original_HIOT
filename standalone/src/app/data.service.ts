import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {
result: any;
constructor(private http: Http) { }

getUsers(){
    return this.http.get("/api/users")
        .map(result => this.result = result.json().data);
}
    sendMQTT(controller,command,params){
    return this.http.post("/api/mqtt_send",{topic:controller, c:command,p:params})
            .map(function(result) {this.result = result;console.log(this.result);});
}
}
