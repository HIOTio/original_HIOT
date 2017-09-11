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
import { ConfigService } from "./core/services/config.service";
import { SplashScreenService } from "./core/services/splash-screen.service";
import { DashboardModule } from "./main/content/dashboard/dashboard.module";
import { DeploymentModule } from "./main/content/deployment/deployment.module";
import { MainModule } from "./main/main.module";
import  {LoginComponent } from "./core/auth/auth.login.component";
const appRoutes: Routes = [

  {
    path :"login",
    component: LoginComponent
},
      {
        path      : "**",
        redirectTo: "",
		canActivate: [AuthGuard]

    }
];

@NgModule({
    declarations: [
        AppComponent,
      LoginComponent
    ],
    imports     : [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        PerfectScrollbarModule.forRoot(),
        MainModule,
		DeploymentModule,
		DashboardModule,
		FlexLayoutModule,
		ChartModule
    ],
    providers   : [
        SplashScreenService,
        ConfigService,
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
