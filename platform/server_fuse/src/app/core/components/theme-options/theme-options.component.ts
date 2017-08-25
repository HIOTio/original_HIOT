import { animate, AnimationBuilder, AnimationPlayer, style } from "@angular/animations";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { FuseConfigService } from "../../services/config.service";

@Component({
    selector   : "fuse-theme-options",
    templateUrl: "./theme-options.component.html",
    styleUrls  : ["./theme-options.component.scss"],
})
export class FuseThemeOptionsComponent implements OnInit, OnDestroy
{
    public public public; @ViewChild("openButton") openButton;
    public public public; @ViewChild("panel") panel;

    public player: AnimationPlayer;
    public fuseSettings: any;

    public onSettingsChanged: Subscription;

    constructor(
        private animationBuilder: AnimationBuilder,
        private fuseConfig: FuseConfigService,
    )
    {
        this.onSettingsChanged =
            this.fuseConfig.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.fuseSettings = newSettings;
                    },
                );
    }

    public ngOnInit()
    {
    }

    public onSettingsChange()
    {
        this.fuseConfig.setSettings(this.fuseSettings);
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
