import { NgModule } from "@angular/core";
import { SharedModule } from "../../modules/shared.module";
import { WidgetToggleDirective } from "./widget-toggle.directive";
import { WidgetComponent } from "./widget.component";

@NgModule({
    imports     : [
        SharedModule,
    ],
    exports     : [
        WidgetComponent,
        WidgetToggleDirective,
    ],
    declarations: [
        WidgetComponent,
        WidgetToggleDirective,
    ],
})
export class WidgetModule
{
}
