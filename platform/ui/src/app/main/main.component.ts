import { Component, ElementRef, HostBinding, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { FuseConfigService } from "../core/services/config.service";

@Component({
    selector     : "fuse-main",
    templateUrl  : "./main.component.html",
    styleUrls    : ["./main.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class FuseMainComponent implements OnInit, OnDestroy
{
    public onSettingsChanged: Subscription;
    public fuseSettings: any;
    public; @HostBinding("class.disable-perfect-scrollbar") disableCustomScrollbars;
    
    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private fuseConfig: FuseConfigService,
    )
    {
        this.onSettingsChanged =
            this.fuseConfig.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.fuseSettings = newSettings;
                        this.disableCustomScrollbars = !this.fuseSettings.customScrollbars;
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
