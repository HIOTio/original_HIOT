import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";

import "hammerjs";

import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartModule } from "angular2-chartjs";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./core/auth/auth.guard";
import { AuthenticationService} from "./core/auth/auth.service";
import { SharedModule } from "./core/modules/shared.module";
import { FuseConfigService } from "./core/services/config.service";
import { FuseSplashScreenService } from "./core/services/splash-screen.service";
import { DashboardModule } from "./main/content/dashboard/dashboard.module";
import { DeploymentModule } from "./main/content/deployment/deployment.module";
import { FuseSampleModule } from "./main/content/sample/sample.module";
import { FuseMainModule } from "./main/main.module";
const appRoutes: Routes = [
    {
        path      : "**",
        redirectTo: "",

    },
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        PerfectScrollbarModule.forRoot(),
        FuseMainModule,
        FuseSampleModule,
		DeploymentModule,
		DashboardModule,
		FlexLayoutModule,
		ChartModule,
    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
		AuthenticationService,
		AuthGuard,
    ],
    bootstrap   : [
        AppComponent,
    ],
})
export class AppModule
{
}
