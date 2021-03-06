import { Component, HostBinding, Input, OnInit } from "@angular/core";

@Component({
    selector   : "hiot-nav-subheader",
    templateUrl: "./nav-subheader.component.html",
    styleUrls  : ["./nav-subheader.component.scss"],
})
export class NavSubheaderComponent implements OnInit
{
     @HostBinding("class") classes = "nav-subheader";
     @Input() item: any;

    constructor()
    {
    }

    public ngOnInit()
    {
    }

}
