import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector     : "fuse-quick-panel",
    templateUrl  : "./quick-panel.component.html",
    styleUrls    : ["./quick-panel.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class FuseQuickPanelComponent implements OnInit
{
    public date: Date;
    public settings: any;

    constructor()
    {
        this.date = new Date();
        this.settings = {
            notify: true,
            cloud : false,
            retro : true,
        };

    }

    public ngOnInit()
    {

    }

}
