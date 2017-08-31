import { AfterContentChecked, Directive, ElementRef, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: "[fuseIfOnDom]",
})
export class FuseIfOnDomDirective implements AfterContentChecked
{
    public isCreated = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private element: ElementRef,
    )
    {
    }

    public ngAfterContentChecked()
    {
        if ( document.body.contains(this.element.nativeElement) && !this.isCreated )
        {
            setTimeout(() => {
                this.viewContainer.createEmbeddedView(this.templateRef);
            }, 0);
            this.isCreated = true;
        }
        else if ( this.isCreated && !document.body.contains(this.element.nativeElement) )
        {
            this.viewContainer.clear();
            this.isCreated = false;
        }
    }
}
