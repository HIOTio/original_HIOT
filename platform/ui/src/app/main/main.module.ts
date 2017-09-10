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


@NgModule({
    declarations: [
        FuseContentComponent,
        FuseFooterComponent,
        FuseMainComponent,
        FuseNavbarComponent,
        FuseToolbarComponent,
        FuseNavbarToggleDirective,
        FuseThemeOptionsComponent,
        FuseQuickPanelComponent
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
