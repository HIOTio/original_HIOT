import { Component, OnInit } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import {MdSnackBar} from "@angular/material";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import {DeploymentService} from "../deployment.service";
@Component({
  selector: "app-deployment",
  templateUrl: "./list-deployment.component.html",
  styleUrls: ["./list-deployment.component.css"],
providers: [DeploymentService],
})
export class ListDeploymentComponent implements OnInit {

    public deployments: Observable<any>;

  constructor( public snackBar: MdSnackBar, private deploymentService: DeploymentService) {

  }

  public ngOnInit() {
      this.deployments = this.deploymentService.list();
      console.log(this.deployments);
  }

    public saveChanges(){
        const snackBarRef = this.snackBar.open("Changes Saved");
    }
}
