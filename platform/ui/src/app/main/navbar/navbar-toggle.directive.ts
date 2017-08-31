import { Directive, HostListener, Input } from "@angular/core";
import { FuseNavbarComponent } from "./navbar.component";
import { FuseNavbarService } from "./navbar.service";

@Directive({
    selector: "[fuseNavbar]",
})
export class FuseNavbarToggleDirective
{
    public; @Input() fuseNavbar: string;
    public navbar: FuseNavbarComponent;

    constructor(private navbarService: FuseNavbarService)
    {
    }

    @HostListener("click")
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
