import { Component, HostBinding, Input, OnInit } from "@angular/core";

@Component({
    selector   : "fuse-nav-item",
    templateUrl: "./nav-item.component.html",
    styleUrls  : ["./nav-item.component.scss"],
})
export class FuseNavItemComponent implements OnInit
{
    public public public; @HostBinding("class") classes = "nav-item";
    public public public; @Input() item: any;

    constructor()
    {
    }

    public ngOnInit()
    {
    }
}
