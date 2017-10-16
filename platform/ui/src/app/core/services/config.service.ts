import { Platform } from "@angular/cdk/platform";
import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class ConfigService
{
    public settings: any;
    public defaultSettings: any;
    public onSettingsChanged: BehaviorSubject<any>;
	public server: any;
    /**
     * @param router
     */
    constructor(
        private router: Router,
        public platform: Platform,
    )

    {
	this.server = "http://localhost:3000";

        // Set the default settings
 this.defaultSettings = {
            layout          : {
                navigation: "left", // 'right', 'left', 'top', none
                toolbar   : "above", // 'above', 'below', none
                footer    : "none", // 'above', 'below', none
            },
            colorClasses    : {
                toolbar: "mat-red-500-bg",
                navbar : "mat-red-500-bg",
                footer : "mat-red-800-bg",
            },
            customScrollbars: true,
        };

        /**
         * Disable Custom Scrollbars if Browser is Mobile
         */
 if ( this.platform.ANDROID || this.platform.IOS )
        {
            this.defaultSettings.customScrollbars = false;
        }

 this.settings = Object.assign({}, this.defaultSettings);

        // Reload the default settings on every navigation start
 router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.setSettings({layout: this.defaultSettings.layout});
                }
            },
        );

        // Create the behavior subject
 this.onSettingsChanged = new BehaviorSubject(this.settings);

    }

    /**
     * Sets settings
     * @param settings
     */
    public setSettings(settings)
    {
        this.settings = Object.assign({}, this.settings, settings);
        this.onSettingsChanged.next(this.settings);
    }
}
