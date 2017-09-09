import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import {DeviceService} from "../device.service";

@Component({
    selector   : "device-details",
    templateUrl: "./device_details.component.html",
    styleUrls  : ["./device_details.component.scss"],
	providers: [DeviceService],
})
export class DeviceDetailsComponent
{
	public device: Observable<any>;
    constructor(private route: ActivatedRoute,
                private router: Router, private deviceService: DeviceService){
    }
	  public ngOnInit() {
		this.device =  this.route.paramMap
    .switchMap((params: ParamMap) =>
      this.deviceService.details(params.get("id")));
  }
}
