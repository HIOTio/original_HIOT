import { AfterContentInit, Component, ContentChildren, ElementRef, HostBinding, OnInit, QueryList, Renderer2, ViewEncapsulation } from "@angular/core";
import { WidgetToggleDirective } from "./widget-toggle.directive";

@Component({
    selector     : "hiot-widget",
    templateUrl  : "./widget.component.html",
    styleUrls    : ["./widget.component.scss"],
    encapsulation: ViewEncapsulation.None,
})

export class WidgetComponent implements OnInit, AfterContentInit
{
     @HostBinding("class.flipped") flipped = false;
     @ContentChildren(WidgetToggleDirective, {descendants: true}) toggleButtons: QueryList<WidgetToggleDirective>;
    constructor(private el: ElementRef, private renderer: Renderer2)
    {
    }

    public ngOnInit()
    {

    }

    public ngAfterContentInit()
    {
        setTimeout(() => {

            this.toggleButtons.forEach((flipButton) => {
                this.renderer.listen(flipButton.el.nativeElement, "click", () => {
                    this.toggle();
                });
            });
        });
    }

    public toggle()
    {
        this.flipped = !this.flipped;
    }

}
