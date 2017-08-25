import { Component, Input } from "@angular/core";
import {MdSnackBar} from "@angular/material";
import { Observable } from "rxjs/Observable";
import {DeviceService} from "../device.service";

@Component({
    selector   : "device-list",
    templateUrl: "./device_list.component.html",
    styleUrls  : ["./device_list.component.scss"],
	providers: [DeviceService],
})
export class DeviceListComponent
{
	public; @Input() deployment: string;
	public devices: Observable<any>;
    constructor(private deviceService: DeviceService){
    }
	  public ngOnInit(deployment_id) {
      this.devices = this.deviceService.list(this.deployment);
  }

}
