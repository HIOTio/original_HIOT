import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../core/modules/shared.module";

import { FuseNavigationModule } from "../core/components/navigation/navigation.module";
import { FuseSearchBarModule } from "../core/components/search-bar/search-bar.module";
import { FuseShortcutsModule } from "../core/components/shortcuts/shortcuts.module";
import { FuseThemeOptionsComponent } from "../core/components/theme-options/theme-options.component";
import { FuseContentComponent } from "./content/content.component";
import { FuseFooterComponent } from "./footer/footer.component";
import { FuseMainComponent } from "./main.component";
import { FuseNavbarToggleDirective } from "./navbar/navbar-toggle.directive";
import { FuseNavbarComponent } from "./navbar/navbar.component";
import { FuseQuickPanelComponent } from "./quick-panel/quick-panel.component";
import { FuseToolbarComponent } from "./toolbar/toolbar.component";
import { Aggregator } from './content/';
import { Aggregator } from './content/aggregator/list/aggregator.list/aggregator.list.component';
import { Aggregator } from './content/aggregator/details/aggregator.details/aggregator.details.component';
import { Controller } from './content/controller/list/controller.list/controller.list.component';
import { Controller } from './content/controller/details/controller.details/controller.details.component';
import { ControllernewComponent } from './content/controller/new/controllernew/controllernew.component'aggregator/list/aggregator.list'/aggregator.list'.component';



@NgModule({
    declarations: [
        FuseContentComponent,
        FuseFooterComponent,
        FuseMainComponent,
        FuseNavbarComponent,
        FuseToolbarComponent,
        FuseNavbarToggleDirective,
        FuseThemeOptionsComponent,
        FuseQuickPanelComponent,
        Aggregator.List'Component,, Aggregator.ListComponent, Aggregator.DetailsComponent, Controller.ListComponent, Controller.DetailsComponent, ControllernewComponent
    ],
    imports     : [
        SharedModule,
        RouterModule,
        FuseNavigationModule,
        FuseShortcutsModule,
        FuseSearchBarModule,
    ],
    exports     : [
        FuseMainComponent,
    ],
})

export class FuseMainModule
{

}
