import { Component } from '@angular/core';
import {DeploymentService} from '../deployment.service';
import { Observable } from 'rxjs/Observable';
import {MdSnackBar} from '@angular/material';

@Component({
    selector   : 'deploymentNew',
    templateUrl: './deploymentNew.component.html',
	providers: [DeploymentService]
})
export class DeploymentNewComponent
{
	deployment={};
	deployment_users=[];
    constructor(private deploymentService: DeploymentService){
		this.deployment_users=[
			{
				//TODO: add the current logged in user
				"_id":12345,
				"name" : 'Mark Healy'
}
		]
    }
	  ngOnInit() {
     // this.deployments=this.deploymentService.list();
		  console.log("in the new deployment component");
  }


}





