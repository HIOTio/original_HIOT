import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../modules/shared.module";
import { NavCollapseComponent } from "./nav-collapse/nav-collapse.component";
import { NavItemComponent } from "./nav-item/nav-item.component";
import { NavSubheaderComponent } from "./nav-subheader/nav-subheader.component";
import { NavigationComponent } from "./navigation.component";

@NgModule({
    imports     : [
        SharedModule,
        RouterModule,
    ],
    exports     : [
        NavigationComponent,
    ],
    declarations: [
        NavigationComponent,
        NavSubheaderComponent,
        NavItemComponent,
        NavCollapseComponent,
    ],
})
export class NavigationModule
{
}
