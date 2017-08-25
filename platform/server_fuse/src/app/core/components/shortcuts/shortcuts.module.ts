import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../../modules/shared.module";
import { FuseShortcutsComponent } from "./shortcuts.component";

@NgModule({
    declarations: [
        FuseShortcutsComponent,
    ],
    imports     : [
        SharedModule,
        RouterModule,
    ],
    exports     : [
        FuseShortcutsComponent,
    ],
})
export class FuseShortcutsModule
{
}
