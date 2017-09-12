import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../core/modules/shared.module";

import { NavigationModule } from "../core/components/navigation/navigation.module";
import { SearchBarModule } from "../core/components/search-bar/search-bar.module";
import { ShortcutsModule } from "../core/components/shortcuts/shortcuts.module";
import { ContentComponent } from "./content/content.component";
import { FooterComponent } from "./footer/footer.component";
import { MainComponent } from "./main.component";
import { NavbarToggleDirective } from "./navbar/navbar-toggle.directive";
import { NavbarComponent } from "./navbar/navbar.component";
import { QuickPanelComponent } from "./quick-panel/quick-panel.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";

@NgModule({
    declarations: [
        ContentComponent,
        FooterComponent,
        MainComponent,
        NavbarComponent,
        ToolbarComponent,
        NavbarToggleDirective,
        QuickPanelComponent
        ],
    imports     : [
        SharedModule,
        RouterModule,
        NavigationModule,
        ShortcutsModule,
        SearchBarModule,
    ],
    exports     : [
        MainComponent,
    ]
})

export class MainModule
{

}
