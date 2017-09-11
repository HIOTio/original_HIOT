import { Component, ViewEncapsulation } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { Observable, Subscription} from 'rxjs';
import {AuthenticationService } from '../../auth/auth.service';
import { NavigationService } from "./navigation.service";

@Component({
    selector     : "hiot-navigation",
    templateUrl  : "./navigation.component.html",
    styleUrls    : ["./navigation.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent
{
    subscription: Subscription;
    public meVisible:boolean;
    public navigation: any[];
    public display: boolean;
    constructor(
        private navigationService: NavigationService,
        private authService: AuthenticationService,
        private router: Router)
    {
 
      this.loadNav();
    }
    public loadNav(){
        //TODO: subscribe to this...
        this.subscription = this.authService.creds().subscribe(profile => { 
            this.navigationService.getNavigation()
            .subscribe((res)=>{
                this.navigation=res;            
                this.display=this.navigationService.display;
                console.log(this.navigation); 
            })

        });
        
		
        
    }

}
