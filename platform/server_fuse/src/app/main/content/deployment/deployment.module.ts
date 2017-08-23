import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { AuthGuard } from '../../../core/auth/auth.guard';
import { DeploymentComponent } from './deployment.component';
import { DeploymentListComponent} from './list/deploymentList.component';

import { DeviceModule} from '../device/device.module'; 
const routes = [
    {
        path     : 'deployment/:id',
        component: DeploymentComponent,
canActivate: [AuthGuard]
    },{
		
	path : 'deployments',
	component : DeploymentListComponent
	}
	
];

@NgModule({
    declarations: [
        DeploymentComponent,
		DeploymentListComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
		DeviceModule
    ],
    exports     : [
        DeploymentComponent
    ]
})

export class DeploymentModule
{
}
