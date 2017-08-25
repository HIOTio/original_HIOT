import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxDnDModule } from "@swimlane/ngx-dnd";
import { ColorPickerModule } from "ngx-color-picker";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { MaterialModule } from "./material.module";

import { FuseNavbarService } from "../../main/navbar/navbar.service";
import { FuseConfirmDialogComponent } from "../components/confirm-dialog/confirm-dialog.component";
import { FuseCountdownComponent } from "../components/countdown/countdown.component";
import { FuseHljsComponent } from "../components/hljs/hljs.component";
import { FuseMaterialColorPickerComponent } from "../components/material-color-picker/material-color-picker.component";
import { FuseNavigationService } from "../components/navigation/navigation.service";
import { FuseIfOnDomDirective } from "../directives/fuse-if-on-dom/fuse-if-on-dom.directive";
import { FuseMdSidenavHelperDirective, FuseMdSidenavTogglerDirective } from "../directives/md-sidenav-helper/md-sidenav-helper.directive";
import { FuseMdSidenavHelperService } from "../directives/md-sidenav-helper/md-sidenav-helper.service";
import { FusePipesModule } from "../pipes/pipes.module";
import { FuseMatchMedia } from "../services/match-media.service";

@NgModule({
    declarations   : [
        FuseMdSidenavHelperDirective,
        FuseMdSidenavTogglerDirective,
        FuseConfirmDialogComponent,
        FuseCountdownComponent,
        FuseHljsComponent,
        FuseIfOnDomDirective,
        FuseMaterialColorPickerComponent,
    ],
    imports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        FusePipesModule,
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
        FuseMdSidenavHelperDirective,
        FuseMdSidenavTogglerDirective,
        FusePipesModule,
        FuseCountdownComponent,
        FuseHljsComponent,
        PerfectScrollbarModule,
        ReactiveFormsModule,
        ColorPickerModule,
        NgxDnDModule,
        NgxDatatableModule,
        FuseIfOnDomDirective,
        FuseMaterialColorPickerComponent,
    ],
    entryComponents: [
        FuseConfirmDialogComponent,
    ],
    providers      : [
        FuseNavigationService,
        FuseMatchMedia,
        FuseNavbarService,
        FuseMdSidenavHelperService,
    ],
})

export class SharedModule
{

}
