import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../modules/shared.module";
import { FuseNavCollapseComponent } from "./nav-collapse/nav-collapse.component";
import { FuseNavItemComponent } from "./nav-item/nav-item.component";
import { FuseNavSubheaderComponent } from "./nav-subheader/nav-subheader.component";
import { FuseNavigationComponent } from "./navigation.component";

@NgModule({
    imports     : [
        SharedModule,
        RouterModule,
    ],
    exports     : [
        FuseNavigationComponent,
    ],
    declarations: [
        FuseNavigationComponent,
        FuseNavSubheaderComponent,
        FuseNavItemComponent,
        FuseNavCollapseComponent,
    ],
})
export class FuseNavigationModule
{
}
