import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import {MdSnackBar} from "@angular/material";
import { Observable } from "rxjs/Observable";
import {DeviceService} from "../device.service";
import { Subject } from 'rxjs/Rx';
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Component({
    selector   : "device-list",
    templateUrl: "./device_list.component.html",
    styleUrls  : ["./device_list.component.scss"],
    providers: [DeviceService]
})
export class DeviceListComponent
{
	public; @Input() deployment: string;
	private devices: LocalDataSource;
    constructor(private http: Http, private deviceService: DeviceService){
    }
	  public ngOnInit(deployment_id) {
      this.deviceService.list(this.deployment).subscribe((data) =>{
        this.devices = new LocalDataSource(data);
        this.devices.load(data);
        console.log(data);
  });
}
  @Input() public rows:Array<any> = [];
  @Input() public config:any = {};

  // Outputs (Events)
  @Output() public tableChanged:EventEmitter<any> = new EventEmitter();

  @Input()
  public set columns(values:Array<any>) {
    values.forEach((value:any) => {
      let column = this._columns.find((col:any) => col.name === value.name);
      if (column) {
        Object.assign(column, value);
      }
      if (!column) {
        this._columns.push(value);
      }
    });
  }

  public get columns():Array<any> {
    return this._columns;
  }

  public get configColumns():any {
    let sortColumns:Array<any> = [];

    this.columns.forEach((column:any) => {
      if (column.sort) {
        sortColumns.push(column);
      }
    });

    return {columns: sortColumns};
  }

  private _columns:Array<any> = [];

  public onChangeTable(column:any):void {
    this._columns.forEach((col:any) => {
      if (col.name !== column.name) {
        col.sort = '';
      }
    });
    this.tableChanged.emit({sorting: this.configColumns});
  }

  public getData(row:any, propertyName:string):string {
    return propertyName.split('.').reduce((prev:any, curr:string) => prev[curr], row);
  }

  
  settings = {
    actions:false,
    columns: {
      deviceId: {
        editable:false,
        title: 'ID'
      },
      make: {
        editable:false,
        title: 'Make'
      },
      model: {
        editable:false,
        title: 'Model'
      },
      functions: {
        editable:false,
        title: 'Functions'
      }
    }
  };
}
