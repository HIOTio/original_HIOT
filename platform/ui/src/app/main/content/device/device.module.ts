import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthGuard } from "../../../core/auth/auth.guard";
import { SharedModule } from "../../../core/modules/shared.module";
import { DeviceCountComponent} from "./list/device.count.component";
//import { DeviceAddComponent } from './new/device_new.component';
import { DeviceListComponent} from "./list/device_list.component";
//import { DeviceDetailsComponent} from './list/device_list.component';

const routes = [
    {
        path     : "device/:id",
        component: DeviceListComponent,
canActivate: [AuthGuard],
    }, {

	path : "device/list",
	component : DeviceListComponent,
	},

];

@NgModule({
    declarations: [
       // DeviceDetailsComponent,
		DeviceListComponent,
		DeviceCountComponent,
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
    ],
    exports     : [
		DeviceListComponent,
		DeviceCountComponent,
    ],
})

export class DeviceModule
{
}
