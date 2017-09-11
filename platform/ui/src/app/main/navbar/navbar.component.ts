import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ObservableMedia } from "@angular/flex-layout";
import { NavigationEnd, Router } from "@angular/router";
import { PerfectScrollbarDirective } from "ngx-perfect-scrollbar";
import { Subscription } from "rxjs/Subscription";
import { NavigationService } from "../../core/components/navigation/navigation.service";
import { MatchMedia } from "../../core/services/match-media.service";
import { MainComponent } from "../main.component";
import { NavbarService } from "./navbar.service";

@Component({
    selector     : "hiot-navbar",
    templateUrl  : "./navbar.component.html",
    styleUrls    : ["./navbar.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit, OnDestroy
{
    public; @HostBinding("class.close") isClosed: boolean;
    @HostBinding("class.folded") isFoldedActive: boolean;
    @HostBinding("class.folded-open") isFoldedOpen: boolean;
    @HostBinding("class.initialized") initialized: boolean;
    @Input("folded") foldedByDefault = false;
    @ViewChild(PerfectScrollbarDirective) perfectScrollbarDirective;

    public matchMediaWatcher: Subscription;
    constructor(
        private mainComponentEl: MainComponent,
        private matchMedia: MatchMedia,
        private NavigationService: NavigationService,
        private navBarService: NavbarService,
        public media: ObservableMedia,
        private router: Router,
    )
    {
        navBarService.setNavBar(this);
      
        this.NavigationService.onNavCollapseToggled.subscribe(() => {

            setTimeout(() => {
                this.perfectScrollbarDirective.update();
            }, 310);
        });

        this.matchMediaWatcher =
            this.matchMedia.onMediaChange
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
        this.mainComponentEl.addClass("hiot-nav-bar-folded");
        this.isFoldedOpen = false;
    }

    public deActivateFolded()
    {
        this.isFoldedActive = false;
        this.mainComponentEl.removeClass("hiot-nav-bar-folded");
        this.isFoldedOpen = false;
    }

    @HostListener("mouseenter")
    onMouseEnter()
    {
        this.isFoldedOpen = true;
    }

    @HostListener("mouseleave")
    onMouseLeave()
    {
        this.isFoldedOpen = false;
    }

    public updateCssClasses()
    {
        if ( this.isClosed )
        {
            this.mainComponentEl.addClass("hiot-nav-bar-opened");
            this.mainComponentEl.removeClass("hiot-nav-bar-closed");
        }
        else
        {
            this.mainComponentEl.addClass("hiot-nav-bar-closed");
            this.mainComponentEl.removeClass("hiot-nav-bar-opened");
        }
    }

    public ngOnDestroy()
    {
        this.matchMediaWatcher.unsubscribe();
    }
}
