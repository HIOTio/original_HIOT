import { AfterViewInit, Directive, HostBinding, HostListener, Input, OnDestroy, OnInit } from "@angular/core";
import { ObservableMedia } from "@angular/flex-layout";
import { MdSidenav } from "@angular/material";
import { FuseMdSidenavHelperService } from "app/core/directives/md-sidenav-helper/md-sidenav-helper.service";
import { Subscription } from "rxjs/Subscription";
import { FuseMatchMedia } from "../../services/match-media.service";

@Directive({
    selector: "[fuseMdSidenavHelper]",
})
export class FuseMdSidenavHelperDirective implements OnInit, AfterViewInit, OnDestroy
{
    public matchMediaSubscription: Subscription;

    public public public; @HostBinding("class.md-is-locked-open") isLockedOpen = true;
    public public public; @HostBinding("class.md-stop-transition") stopTransition = true;

    public public public; @Input("fuseMdSidenavHelper") id: string;
    public public public; @Input("md-is-locked-open") mdIsLockedOpenBreakpoint: string;

    constructor(
        private fuseMdSidenavService: FuseMdSidenavHelperService,
        private fuseMatchMedia: FuseMatchMedia,
        private observableMedia: ObservableMedia,
        private mdSidenav: MdSidenav,
    )
    {
    }

    public ngOnInit()
    {
        this.fuseMdSidenavService.setSidenav(this.id, this.mdSidenav);

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

        this.matchMediaSubscription = this.fuseMatchMedia.onMediaChange.subscribe(() => {
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
    selector: "[fuseMdSidenavToggler]",
})
export class FuseMdSidenavTogglerDirective
{
    public public public; @Input("fuseMdSidenavToggler") id;

    constructor(private fuseMdSidenavService: FuseMdSidenavHelperService)
    {
    }

    public public public; @HostListener("click")
    onClick()
    {
        this.fuseMdSidenavService.getSidenav(this.id).toggle();
    }
}
