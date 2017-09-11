import { animate, AnimationBuilder, AnimationPlayer, style } from "@angular/animations";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { ConfigService } from "../../services/config.service";

@Component({
    selector   : "hiot-theme-options",
    templateUrl: "./theme-options.component.html",
    styleUrls  : ["./theme-options.component.scss"],
})
export class ThemeOptionsComponent implements OnInit, OnDestroy
{
     @ViewChild("openButton") openButton;
     @ViewChild("panel") panel;

    public player: AnimationPlayer;
    public settings: any;

    public onSettingsChanged: Subscription;

    constructor(
        private animationBuilder: AnimationBuilder,
        private config: ConfigService,
    )
    {
        this.onSettingsChanged =
            this.config.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.settings = newSettings;
                    },
                );
    }

    public ngOnInit()
    {
    }

    public onSettingsChange()
    {
        this.config.setSettings(this.settings);
    }

    public closeBar()
    {
        this.player =
            this.animationBuilder
                .build([
                    style({transform: "translate3d(0,0,0)"}),
                    animate("400ms ease", style({transform: "translate3d(100%,0,0)"})),
                ]).create(this.panel.nativeElement);
        this.player.play();
    }

    public openBar()
    {
        this.player =
            this.animationBuilder
                .build([
                    style({transform: "translate3d(100%,0,0)"}),
                    animate("400ms ease", style({transform: "translate3d(0,0,0)"})),
                ]).create(this.panel.nativeElement);
        this.player.play();
    }

    public ngOnDestroy()
    {
        this.onSettingsChanged.unsubscribe();
    }
}
