import { animate, AnimationBuilder, AnimationPlayer, style } from "@angular/animations";
import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Injectable()
export class SplashScreenService
{
    public splashScreenEl;
    public player: AnimationPlayer;

    constructor(
        private animationBuilder: AnimationBuilder,
        @Inject(DOCUMENT) private document: any,
        private router: Router,
    )
    {
        this.splashScreenEl = this.document.body.querySelector("#hiot-splash-screen");

        const hideOnLoad = this.router.events.subscribe((event) => {
                if ( event instanceof NavigationEnd )
                {
                    setTimeout(() => {
                        this.hide();
                        hideOnLoad.unsubscribe();
                    }, 0);
                }
            },
        );
    }

    public show()
    {
        this.player =
            this.animationBuilder
                .build([
                    style({
                        opacity: "0",
                        zIndex : "99999",
                    }),
                    animate("400ms ease", style({opacity: "1"})),
                ]).create(this.splashScreenEl);

        setTimeout(() => {
            this.player.play();
        }, 0);
    }

    public hide()
    {
        this.player =
            this.animationBuilder
                .build([
                    style({opacity: "1"}),
                    animate("400ms ease", style({
                        opacity: "0",
                        zIndex : "-10",
                    })),
                ]).create(this.splashScreenEl);

        setTimeout(() => {
            this.player.play();
        }, 0);
    }
}
