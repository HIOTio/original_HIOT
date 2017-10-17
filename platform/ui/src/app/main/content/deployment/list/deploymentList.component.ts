import { Component } from "@angular/core";
import {MatSnackBar} from "@angular/material";
import { Observable } from "rxjs/Observable";
import {DeploymentService} from "../deployment.service";
@Component({
    selector   : "deploymentList",
    templateUrl: "./deploymentList.component.html",
    styleUrls  : ["./deploymentList.component.scss"],
	providers: [DeploymentService],
})
export class DeploymentListComponent
{
	public deployments: Observable<any>;
public chart1: {	};
public chart2: {};
    constructor(private deploymentService: DeploymentService){
		this.chart1 = {
			type: "line",
			data : {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
},
options : {
  responsive: true,
  maintainAspectRatio: false,
},
		};
	 this.chart2 = {
		type : "doughnut",
		data : {
    datasets: [{
        data: [10, 100, 5000],
		backgroundColor: ["#ff0000", "#00ffff", "#00ff00"],
    }],

    labels: [
        "Red",
        "Yellow",
        "Green",
    ],
},
options : {
  responsive: true,
  maintainAspectRatio: false,
},
	};

    }
	  public ngOnInit() {
      this.deployments = this.deploymentService.list();
		    const ctx = document.getElementById("healthCanvas");

  }

}
