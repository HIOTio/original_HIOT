import { AfterViewInit, Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: "[fuseWidgetToggle]",
})
export class FuseWidgetToggleDirective implements OnInit, AfterViewInit
{

    constructor(public el: ElementRef)
    {
    }

    public ngOnInit()
    {
    }

    public ngAfterViewInit()
    {
    }

}
