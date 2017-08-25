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
public type: string;
	public data:{	};
public options:{};
    constructor(private deploymentService: DeploymentService){
		this.type = 'doughnut';
this.data = {
    datasets: [{
        data: [10, 20, 30],
		bakgroundColor:['#ff0000','00ffff','#0000ff']
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};
this.options = {
  responsive: true,
  maintainAspectRatio: false
};
    }
	  ngOnInit() {
      this.deployments=this.deploymentService.list();
		  var ctx = document.getElementById("healthCanvas");

  }


}





