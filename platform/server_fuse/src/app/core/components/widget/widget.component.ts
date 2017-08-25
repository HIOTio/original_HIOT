import { AfterContentInit, Component, ContentChildren, ElementRef, HostBinding, OnInit, QueryList, Renderer2, ViewEncapsulation } from "@angular/core";
import { FuseWidgetToggleDirective } from "./widget-toggle.directive";

@Component({
    selector     : "fuse-widget",
    templateUrl  : "./widget.component.html",
    styleUrls    : ["./widget.component.scss"],
    encapsulation: ViewEncapsulation.None,
})

export class FuseWidgetComponent implements OnInit, AfterContentInit
{
    public public public; @HostBinding("class.flipped") flipped = false;
    public public public; @ContentChildren(FuseWidgetToggleDirective, {descendants: true}) toggleButtons: QueryList<FuseWidgetToggleDirective>;

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
