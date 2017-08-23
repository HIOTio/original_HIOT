import { Component,Input } from '@angular/core';
import {DeviceService} from '../device.service';
import { Observable } from 'rxjs/Observable';
import {MdSnackBar} from '@angular/material';

@Component({
    selector   : 'device-count',
    template: '<div>Devices: {{device_count  }}</div>',
	providers: [DeviceService]
})
export class DeviceCountComponent
{
	@Input() deployment: string;
	public device_count: Observable<any>;
    constructor(private deviceService: DeviceService){
    }
	  ngOnInit() {
		  
     this.deviceService.count_deployment(this.deployment).subscribe(res=>{
		 this.device_count= res.device_count;
																					   });
		  
		  
  }


}





