import { Component } from '@angular/core';
import {DeploymentService} from './deployment.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {MdSnackBar} from '@angular/material';

@Component({
    selector   : 'deployment',
    templateUrl: './deployment.component.html',
    styleUrls  : ['./deployment.component.scss'],
	providers: [DeploymentService]
})
export class DeploymentComponent
{
	public deployment:  Observable<any>;
    constructor(private route: ActivatedRoute,
  private router: Router,private deploymentService: DeploymentService){
    }
	  ngOnInit() {
		this.deployment=  this.route.paramMap
    .switchMap((params: ParamMap) =>
      this.deploymentService.details(params.get('id')));
  }


}





