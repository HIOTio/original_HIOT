import { Component } from "@angular/core";
import {MdSnackBar} from "@angular/material";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import {DeploymentService} from "../deployment.service";

@Component({
    selector   : "deployment",
    templateUrl: "./deployment.details.component.html",
    styleUrls  : ["./deployment.details.component.scss"],
	providers: [DeploymentService],
})
export class DeploymentComponent
{
	public deployment: Observable<any>;
    constructor(private route: ActivatedRoute,
                private router: Router, private deploymentService: DeploymentService){
    }
	  public ngOnInit() {
		this.deployment =  this.route.paramMap
    .switchMap((params: ParamMap) =>
      this.deploymentService.details(params.get("id")));
  }

}
