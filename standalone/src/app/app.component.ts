import { Component } from '@angular/core';
import {DataService} from './data.service';
import { ObservableMedia } from '@angular/flex-layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    users: Array<any>;
    controller='controller12345';
    command="0";
    parString='';
sendCommandPresetArgs=function(ctrl,cmd,par){
 //   console.log(par);
    this.dataService.sendMQTT(ctrl,cmd,par.p)
        .subscribe(res => this.users = res);
}
    sendCommand = function(){
 //   console.log("in sendCommand");
        var params=JSON.parse(this.parString);
  //  console.log(params);
    this.dataService.sendMQTT(this.controller,this.command,params.p)
        .subscribe(res => this.users = res);

}
    constructor(private dataService: DataService, private observableMedia: ObservableMedia){
    this.controller='controller12345';
    this.command="0";
    this.parString='{"p":"p1","v":"F1B1D1"}:{"p":"p2","v":"1"}:{"p":"p3","v":0}';
    this.dataService.getUsers()
        .subscribe(res => this.users = res);


}
}
