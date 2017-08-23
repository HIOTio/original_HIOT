import { Component } from '@angular/core';
import {DeploymentService} from '../deployment.service';
import { Observable } from 'rxjs/Observable';
import {MdSnackBar} from '@angular/material';

@Component({
    selector   : 'deploymentList',
    templateUrl: './deploymentList.component.html',
    styleUrls  : ['./deploymentList.component.scss'],
	providers: [DeploymentService]
})
export class DeploymentListComponent
{
	public deployments: Observable<any>;
    constructor(private deploymentService: DeploymentService){
    }
	  ngOnInit() {
      this.deployments=this.deploymentService.list();
  }


}





