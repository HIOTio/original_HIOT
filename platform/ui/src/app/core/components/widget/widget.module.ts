import { NgModule } from "@angular/core";
import { SharedModule } from "../../modules/shared.module";
import { FuseWidgetToggleDirective } from "./widget-toggle.directive";
import { FuseWidgetComponent } from "./widget.component";

@NgModule({
    imports     : [
        SharedModule,
    ],
    exports     : [
        FuseWidgetComponent,
        FuseWidgetToggleDirective,
    ],
    declarations: [
        FuseWidgetComponent,
        FuseWidgetToggleDirective,
    ],
})
export class FuseWidgetModule
{
}
