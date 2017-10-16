import { AfterViewInit, Directive, HostBinding, HostListener, Input, OnDestroy, OnInit } from "@angular/core";
import { ObservableMedia } from "@angular/flex-layout";
import { MatSidenav } from "@angular/material";
import { MdSidenavHelperService } from "app/core/directives/mat-sidenav-helper/mat-sidenav-helper.service";
import { Subscription } from "rxjs/Subscription";
import { MatchMedia } from "../../services/match-media.service";

@Directive({
    selector: "[mdSidenavHelper]",
})
export class MdSidenavHelperDirective implements OnInit, AfterViewInit, OnDestroy
{
    public matchMediaSubscription: Subscription;

     @HostBinding("class.mat-is-locked-open") isLockedOpen = true;
     @HostBinding("class.mat-stop-transition") stopTransition = true;

     @Input("mdSidenavHelper") id: string;
     @Input("mat-is-locked-open") mdIsLockedOpenBreakpoint: string;

    constructor(
        private mdSidenavService: MdSidenavHelperService,
        private matchMedia: MatchMedia,
        private observableMedia: ObservableMedia,
        private mdSidenav: MatSidenav,
    )
    {
    }

    public ngOnInit()
    {
        this.mdSidenavService.setSidenav(this.id, this.mdSidenav);

        if ( this.observableMedia.isActive(this.mdIsLockedOpenBreakpoint) )
        {
            this.isLockedOpen = true;
            this.mdSidenav.mode = "side";
            this.mdSidenav.open();
        }
        else
        {
            this.isLockedOpen = false;
            this.mdSidenav.mode = "over";
            this.mdSidenav.close();
        }

        this.matchMediaSubscription = this.matchMedia.onMediaChange.subscribe(() => {
            if ( this.observableMedia.isActive(this.mdIsLockedOpenBreakpoint) )
            {
                this.isLockedOpen = true;
                this.mdSidenav.mode = "side";
                this.mdSidenav.open();
            }
            else
            {
                this.isLockedOpen = false;
                this.mdSidenav.mode = "over";
                this.mdSidenav.close();
            }
        });

    }

    public ngAfterViewInit()
    {
        setTimeout(() => {
            this.stopTransition = false;
        }, 0);
    }

    public ngOnDestroy()
    {
        this.matchMediaSubscription.unsubscribe();
    }
}

@Directive({
    selector: "[mdSidenavToggler]",
})
export class MdSidenavTogglerDirective
{
     @Input("mdSidenavToggler") id;

    constructor(private mdSidenavService: MdSidenavHelperService)
    {
    }

     @HostListener("click")
    onClick()
    {
        this.mdSidenavService.getSidenav(this.id).toggle();
      //  console.log("trying to toggle" + this.id);
    }
}
