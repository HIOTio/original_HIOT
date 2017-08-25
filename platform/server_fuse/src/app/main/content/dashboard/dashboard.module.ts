import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthGuard } from "../../../core/auth/auth.guard";
import { SharedModule } from "../../../core/modules/shared.module";
import { DashboardComponent } from "./dashboard.component";

const routes = [
    {
        path     : "dashboard",
        component: DashboardComponent,
canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
    ],
    exports     : [
        DashboardComponent,
    ],
})

export class DashboardModule
{
}
