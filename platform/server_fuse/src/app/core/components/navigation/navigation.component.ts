import { Component, ViewEncapsulation } from "@angular/core";
import { FuseNavigationService } from "./navigation.service";

import { Observable } from "rxjs/Observable";
@Component({
    selector     : "fuse-navigation",
    templateUrl  : "./navigation.component.html",
    styleUrls    : ["./navigation.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class FuseNavigationComponent
{
    public navigation: Observable<any[]>;
    public display: boolean;
    constructor(private navigationService: FuseNavigationService)
    {
      
		this.navigation = this.navigationService.getNavigation();
        this.display=navigationService.display;
    }

}
