import { Component, HostBinding, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Animations } from "../../core/animations";

@Component({
    selector   : "hiot-content",
    templateUrl: "./content.component.html",
    styleUrls  : ["./content.component.scss"],
    animations : [Animations.routerTransition],
})
export class ContentComponent implements OnInit
{
    public; @HostBinding("@routerTransition") routeAnimationState = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    )
    {
        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .subscribe((event) => {
                this.routeAnimationState = !this.routeAnimationState;
            });
    }

    public ngOnInit()
    {

    }
}
