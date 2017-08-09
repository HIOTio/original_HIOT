import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Component, OnInit } from '@angular/core';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-deployment',
  templateUrl: './deployment.component.html',
  styleUrls: ['./deployment.component.css']
}) 
export class DeploymentComponent implements OnInit {
    deployments=[];
  constructor(http: Http, public snackBar: MdSnackBar) { 
      let headers = new Headers();
headers.append('Content-Type','application/json');
headers.append('Authorization','JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5N2UyMWZjOTc4MDE3MTQzMDdjZTkxYSIsImlhdCI6MTUwMTUzMzQwN30.abhgzrGm9MU2DaIJuZiV6LRRGSiSR1N4DSG3YdUdjLQ');
     console.log(headers);
    http.get('http://localhost:3000/api/deployment_role/profile/'+ JSON.parse(localStorage.getItem('currentUser')).id,{headers:headers})
      .map((res:Response) => res.json())
  .subscribe(resp => {
        console.log(resp);
    this.deployments=resp;
  });
  }

  ngOnInit() {
  }
    getDeployments(res: Response){
        let data  =res;
        console.log(data);
    }
    saveChanges(){
        let snackBarRef = this.snackBar.open('Changes Saved');
    }
}






