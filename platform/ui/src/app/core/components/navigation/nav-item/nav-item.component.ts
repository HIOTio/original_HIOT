import { Component, HostBinding, Input, OnInit } from "@angular/core";

@Component({
    selector   : "hiot-nav-item",
    templateUrl: "./nav-item.component.html",
    styleUrls  : ["./nav-item.component.scss"],
})
export class NavItemComponent implements OnInit
{
     @HostBinding("class") classes = "nav-item";
     @Input() item: any;

    constructor()
    {
    }

    public ngOnInit()
    {
    }
}
