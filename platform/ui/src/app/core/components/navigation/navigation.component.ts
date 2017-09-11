import { Component, ViewEncapsulation } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import {AuthenticationService } from '../../auth/auth.service';
import { NavigationService } from "./navigation.service";

import { Observable } from "rxjs/Observable";
@Component({
    selector     : "hiot-navigation",
    templateUrl  : "./navigation.component.html",
    styleUrls    : ["./navigation.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers:[AuthenticationService]
})
export class NavigationComponent
{
    public meVisible:boolean;
    public navigation: Observable<any[]>;
    public display: boolean;
    constructor(
        private navigationService: NavigationService,
        private authService: AuthenticationService,
        private router: Router)
    {
        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.meVisible=false;

                } else if ( event instanceof NavigationEnd )
                {
                    console.log(authService.loggedIn());
                    if(authService.loggedIn()){
                        this.meVisible = true;
                    }
                }
            });
      this.loadNav();
    }
    public loadNav(){
        //TODO: subscribe to this...
		this.navigation = this.navigationService.getNavigation();
        this.display=this.navigationService.display;
        
    }

}
