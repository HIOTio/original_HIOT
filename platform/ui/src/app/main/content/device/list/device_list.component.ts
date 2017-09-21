import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import {DeviceService} from "../device.service";
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';
import {RoleRenderComponent} from './roleRender.component';
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
    constructor(private deviceService: DeviceService){
    }
	  public ngOnInit(deployment_id) {
      this.deviceService.list(this.deployment).subscribe((data) =>{
        this.devices = new LocalDataSource(data);
        this.devices.load(data);
      //  console.log(data);
  });
}

  
  settings = {
    actions:false,
    columns: {
      _id: {
        editable:false,
        title: 'ID'
      },
      make: {
        valuePrepareFunction: (make) => {
          return make.description;
      },
        editable:false,
        title: 'Make'
      },
      model: {
        editable:false,
        valuePrepareFunction: (model) => {
          return model.description;
      },
        title: 'Model'
      },
      functions: {
        editable:false,
        title: 'Functions',
        valuePrepareFunction: (functions,device) => {
          console.log(device);
           return device;
        },
        type: 'custom',
        renderComponent: RoleRenderComponent
      }
    }
  };
}
