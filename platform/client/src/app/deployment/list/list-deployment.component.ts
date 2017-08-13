import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Component, OnInit } from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {DeploymentService} from '../deployment.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-deployment',
  templateUrl: './list-deployment.component.html',
  styleUrls: ['./list-deployment.component.css'],
providers: [DeploymentService]
}) 
export class ListDeploymentComponent implements OnInit {
    
    public deployments: Observable<any>;
    
  constructor( public snackBar: MdSnackBar, private deploymentService: DeploymentService) { 
    
  }
  

  ngOnInit() {
      this.deployments=this.deploymentService.list();
      console.log(this.deployments);
  }

    saveChanges(){
        let snackBarRef = this.snackBar.open('Changes Saved');
    }
}






