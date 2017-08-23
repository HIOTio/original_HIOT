import { Component,Input } from '@angular/core';
import {DeviceService} from '../device.service';
import { Observable } from 'rxjs/Observable';
import {MdSnackBar} from '@angular/material';

@Component({
    selector   : 'device-list',
    templateUrl: './device_list.component.html',
    styleUrls  : ['./device_list.component.scss'],
	providers: [DeviceService]
})
export class DeviceListComponent
{
	@Input() deployment: string;
	public devices: Observable<any>;
    constructor(private deviceService: DeviceService){
    }
	  ngOnInit(deployment_id) {
      this.devices=this.deviceService.list(this.deployment);
		  console.log(this.deployment);
  }


}





