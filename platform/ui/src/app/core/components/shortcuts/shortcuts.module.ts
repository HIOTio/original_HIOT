import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../../modules/shared.module";
import { ShortcutsComponent } from "./shortcuts.component";

@NgModule({
    declarations: [
        ShortcutsComponent,
    ],
    imports     : [
        SharedModule,
        RouterModule,
    ],
    exports     : [
        ShortcutsComponent,
    ],
})
export class ShortcutsModule
{
}
