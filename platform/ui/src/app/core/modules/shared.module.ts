import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxDnDModule } from "@swimlane/ngx-dnd";
import { ColorPickerModule } from "ngx-color-picker";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { MaterialModule } from "./material.module";

import { NavbarService } from "../../main/navbar/navbar.service";
import { CountdownComponent } from "../components/countdown/countdown.component";
import { HljsComponent } from "../components/hljs/hljs.component";
import { MaterialColorPickerComponent } from "../components/material-color-picker/material-color-picker.component";
import { NavigationService } from "../components/navigation/navigation.service";
import { IfOnDomDirective } from "../directives/if-on-dom/if-on-dom.directive";
import { MdSidenavHelperDirective, MdSidenavTogglerDirective } from "../directives/mat-sidenav-helper/mat-sidenav-helper.directive";
import { MdSidenavHelperService } from "../directives/mat-sidenav-helper/mat-sidenav-helper.service";
import { PipesModule } from "../pipes/pipes.module";
import { MatchMedia } from "../services/match-media.service";

@NgModule({
    declarations   : [
        MdSidenavHelperDirective,
        MdSidenavTogglerDirective,
        CountdownComponent,
        HljsComponent,
        IfOnDomDirective,
        MaterialColorPickerComponent,
    ],
    imports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        PipesModule,
        PerfectScrollbarModule,
        ReactiveFormsModule,
        ColorPickerModule,
        NgxDnDModule,
        NgxDatatableModule,
    ],
    exports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        MdSidenavHelperDirective,
        MdSidenavTogglerDirective,
        PipesModule,
        CountdownComponent,
        HljsComponent,
        PerfectScrollbarModule,
        ReactiveFormsModule,
        ColorPickerModule,
        NgxDnDModule,
        NgxDatatableModule,
        IfOnDomDirective,
        MaterialColorPickerComponent,
    ],
    entryComponents: [
    ],
    providers      : [
        NavigationService,
        MatchMedia,
        NavbarService,
        MdSidenavHelperService,
    ],
})

export class SharedModule
{

}
