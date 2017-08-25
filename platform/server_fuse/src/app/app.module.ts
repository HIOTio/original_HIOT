import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import 'hammerjs';


import { AuthGuard } from './core/auth/auth.guard';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { AuthenticationService} from './core/auth/auth.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseSampleModule } from './main/content/sample/sample.module';
import { DeploymentModule } from './main/content/deployment/deployment.module';
import { DashboardModule } from './main/content/dashboard/dashboard.module'; 
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartModule } from 'angular2-chartjs';
const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: ''
		
    }
];

@NgModule({
    declarations: [
        AppComponent
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
		ChartModule
    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
		AuthenticationService,
		AuthGuard
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
