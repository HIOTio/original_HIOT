import { Component, ViewEncapsulation } from "@angular/core";
import { NavigationService } from "./navigation.service";

import { Observable } from "rxjs/Observable";
@Component({
    selector     : "hiot-navigation",
    templateUrl  : "./navigation.component.html",
    styleUrls    : ["./navigation.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent
{
    public navigation: Observable<any[]>;
    public display: boolean;
    constructor(private navigationService: NavigationService)
    {
      
		this.navigation = this.navigationService.getNavigation();
        this.display=navigationService.display;
    }

}
