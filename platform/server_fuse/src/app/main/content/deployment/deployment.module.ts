import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { AuthGuard } from '../../../core/auth/auth.guard';
import { DeploymentComponent } from './deployment.component';
import { DeploymentListComponent} from './list/deploymentList.component';
import { DeploymentNewComponent} from './new/deploymentNew.component';
import { DeviceModule} from '../device/device.module'; 
import { ChartModule } from 'angular2-chartjs';
const routes = [
	{
		path : 'deployment/new',
		component: DeploymentNewComponent,
		canActivate: [AuthGuard]
	},
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
		DeploymentListComponent,
		DeploymentNewComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
		DeviceModule,
		ChartModule
    ],
    exports     : [
        DeploymentComponent
    ]
})

export class DeploymentModule
{
}
