import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ObservableMedia } from "@angular/flex-layout";
import { NavigationEnd, Router } from "@angular/router";
import { PerfectScrollbarDirective } from "ngx-perfect-scrollbar";
import { Subscription } from "rxjs/Subscription";
import { FuseNavigationService } from "../../core/components/navigation/navigation.service";
import { FuseMatchMedia } from "../../core/services/match-media.service";
import { FuseMainComponent } from "../main.component";
import { FuseNavbarService } from "./navbar.service";

@Component({
    selector     : "fuse-navbar",
    templateUrl  : "./navbar.component.html",
    styleUrls    : ["./navbar.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class FuseNavbarComponent implements OnInit, OnDestroy
{
    public public public; @HostBinding("class.close") isClosed: boolean;
    public public public; @HostBinding("class.folded") isFoldedActive: boolean;
    public public public; @HostBinding("class.folded-open") isFoldedOpen: boolean;
    public public public; @HostBinding("class.initialized") initialized: boolean;
    public public public; @Input("folded") foldedByDefault = false;
    public public public; @ViewChild(PerfectScrollbarDirective) perfectScrollbarDirective;

    public matchMediaWatcher: Subscription;

    constructor(
        private fuseMainComponentEl: FuseMainComponent,
        private fuseMatchMedia: FuseMatchMedia,
        private fuseNavigationService: FuseNavigationService,
        private navBarService: FuseNavbarService,
        public media: ObservableMedia,
        private router: Router,
    )
    {
        navBarService.setNavBar(this);

        this.fuseNavigationService.onNavCollapseToggled.subscribe(() => {

            setTimeout(() => {
                this.perfectScrollbarDirective.update();
            }, 310);
        });

        this.matchMediaWatcher =
            this.fuseMatchMedia.onMediaChange
                .subscribe((mediaStep) => {
                    setTimeout(() => {

                        if ( this.media.isActive("lt-lg") )
                        {
                            this.closeBar();
                            this.deActivateFolded();
                        }
                        else
                        {
                            this.openBar();
                        }
                    });
                });

        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationEnd )
                {
                    if ( this.media.isActive("lt-lg") )
                    {
                        setTimeout(() => {
                            this.closeBar();
                        });
                    }
                }
            },
        );
    }

    public ngOnInit()
    {
        this.isClosed = false;
        this.isFoldedActive = this.foldedByDefault;
        this.isFoldedOpen = false;
        this.initialized = false;
        this.updateCssClasses();

        setTimeout(() => {
            this.initialized = true;
        });

        if ( this.media.isActive("lt-lg") )
        {
            this.closeBar();
            this.deActivateFolded();
        }
        else
        {
            if ( !this.foldedByDefault )
            {
                this.deActivateFolded();
            }
            else
            {
                this.activateFolded();
            }
        }
    }

    public openBar()
    {
        this.isClosed = false;
        this.updateCssClasses();
    }

    public closeBar()
    {
        this.isClosed = true;
        this.updateCssClasses();
    }

    public toggleBar()
    {
        if ( this.isClosed )
        {
            this.openBar();
        }
        else
        {
            this.closeBar();
        }
    }

    public toggleFold()
    {
        if ( !this.isFoldedActive )
        {
            this.activateFolded();
        }
        else
        {
            this.deActivateFolded();
        }
    }

    public activateFolded()
    {
        this.isFoldedActive = true;
        this.fuseMainComponentEl.addClass("fuse-nav-bar-folded");
        this.isFoldedOpen = false;
    }

    public deActivateFolded()
    {
        this.isFoldedActive = false;
        this.fuseMainComponentEl.removeClass("fuse-nav-bar-folded");
        this.isFoldedOpen = false;
    }

    public public public; @HostListener("mouseenter")
    onMouseEnter()
    {
        this.isFoldedOpen = true;
    }

    public public public; @HostListener("mouseleave")
    onMouseLeave()
    {
        this.isFoldedOpen = false;
    }

    public updateCssClasses()
    {
        if ( this.isClosed )
        {
            this.fuseMainComponentEl.addClass("fuse-nav-bar-opened");
            this.fuseMainComponentEl.removeClass("fuse-nav-bar-closed");
        }
        else
        {
            this.fuseMainComponentEl.addClass("fuse-nav-bar-closed");
            this.fuseMainComponentEl.removeClass("fuse-nav-bar-opened");
        }
    }

    public ngOnDestroy()
    {
        this.matchMediaWatcher.unsubscribe();
    }
}
