import { Component, Input } from "@angular/core";
import {MdSnackBar} from "@angular/material";
import { Observable } from "rxjs/Observable";
import {DeviceService} from "../device.service";

@Component({
    selector   : "device-count",
    template: "<div>Devices: {{device_count  }}</div>",
	providers: [DeviceService],
})
export class DeviceCountComponent
{
	public public public; @Input() deployment: string;
	public device_count: Observable<any>;
    constructor(private deviceService: DeviceService){
    }
	  public ngOnInit() {

     this.deviceService.count_deployment(this.deployment).subscribe((res) => {
		 this.device_count = res.device_count;
																					   });

  }

}
