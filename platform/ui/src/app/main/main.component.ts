import { Component, ElementRef, HostBinding, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { Observable, Subscription} from 'rxjs';
import { ConfigService } from "../core/services/config.service";
import { AuthenticationService, Profile } from "../core/auth/auth.service";

@Component({
    selector     : "hiot-main",
    templateUrl  : "./main.component.html",
    styleUrls    : ["./main.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy
{

    public user: Profile;
    subscription: Subscription;
    public onSettingsChanged: Subscription;
    public settings: any;
    public; @HostBinding("class.disable-perfect-scrollbar") disableCustomScrollbars;
    
    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private config: ConfigService,
        private router: Router,
        private authService: AuthenticationService
    )
    {
        this.subscription = this.authService.creds().subscribe(profile => { this.user=profile; });
  
        this.onSettingsChanged =
            this.config.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.settings = newSettings;
                        this.disableCustomScrollbars = !this.settings.customScrollbars;
                    },
                );

    }

    public ngOnInit()
    {
    }

    public ngOnDestroy()
    {
        this.onSettingsChanged.unsubscribe();
    }

    public addClass(className: string)
    {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }

    public removeClass(className: string)
    {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
}
