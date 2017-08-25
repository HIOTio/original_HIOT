import { Directive, HostListener, Input } from "@angular/core";
import { FuseNavbarComponent } from "./navbar.component";
import { FuseNavbarService } from "./navbar.service";

@Directive({
    selector: "[fuseNavbar]",
})
export class FuseNavbarToggleDirective
{
    public public public; @Input() fuseNavbar: string;
    public navbar: FuseNavbarComponent;

    constructor(private navbarService: FuseNavbarService)
    {
    }

    public public public; @HostListener("click")
    onClick()
    {
        this.navbar = this.navbarService.getNavBar();

        if ( !this.navbar[this.fuseNavbar] )
        {
            return;
        }

        this.navbar[this.fuseNavbar]();
    }
}
