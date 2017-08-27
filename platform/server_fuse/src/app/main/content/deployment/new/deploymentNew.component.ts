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
    constructor(private deploymentService: DeploymentService){
		this.deployment_users = [
		  // TODO: add the logged in user to the deployment
			{
				"_id":12345,
				"name" : 'Mark Healy'
}
		];
    }
	  public ngOnInit() {
     // this.deployments=this.deploymentService.list();
		  console.log("in the new deployment component");
  }

}
