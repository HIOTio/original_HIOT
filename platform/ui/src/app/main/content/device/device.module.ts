import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AuthGuard } from "../../../core/auth/auth.guard";
import { SharedModule } from "../../../core/modules/shared.module";
import { DeviceCountComponent} from "./list/device.count.component";
//import { DeviceAddComponent } from './new/device_new.component';
import { DeviceListComponent} from "./list/device_list.component";
import { DeviceDetailsComponent} from './details/device_details.component';
import {AggregatorListComponent } from "../aggregator/list/aggregator.list.component";
import {RoleRenderComponent} from "./list/roleRender.component";

const routes = [
    {
        path     : "device/:id",
        component: DeviceDetailsComponent,
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
        DeviceDetailsComponent,
        AggregatorListComponent,
        RoleRenderComponent
    ],
    entryComponents:[
        RoleRenderComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        Ng2SmartTableModule,
    ],
    exports     : [
		DeviceListComponent,
		DeviceCountComponent,
    ],
})

export class DeviceModule
{
}
