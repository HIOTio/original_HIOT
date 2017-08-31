import { Component } from "@angular/core";
import {MdSnackBar} from "@angular/material";
import { Observable } from "rxjs/Observable";
import {DeploymentService} from "../deployment.service";


@Component({
    selector   : "deploymentNew",
    templateUrl: "./deploymentNew.component.html",
	providers: [DeploymentService],
})
export class DeploymentNewComponent
{
	public deployment= {};
	public deployment_users= [];
clear = function(){
this.deployment={};
}
AddDeployment = function(){
//TODO: Add some serious validation here
//TODO: Also, need to update the navigation when a deployment has been added - this might be better handled with websockets
  this.deployment.owner = localStorage("currentUser")._id;
    this.deploymentService.add(this.deployment)
.subscribe( newDeployment => {
    console.log(newDeployment);					   
			 },
                         error => this.errorMessage = <any>error);

    
}
    constructor(private deploymentService: DeploymentService){
    }
	  public ngOnInit() {
//TODO: need to include a deployment type(Building, SCADA etc.)
  }

}
