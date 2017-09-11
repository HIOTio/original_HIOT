import { Directive, HostListener, Input } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import { NavbarService } from "./navbar.service";

@Directive({
    selector: "[hiotNavbar]",
})
export class NavbarToggleDirective
{
    public; @Input() hiotNavbar: string;
    public navbar: NavbarComponent;

    constructor(private navbarService: NavbarService)
    {
    }

    @HostListener("click")
    onClick()
    {
        this.navbar = this.navbarService.getNavBar();

        if ( !this.navbar[this.hiotNavbar] )
        {
            return;
        }

        this.navbar[this.hiotNavbar]();
    }
}
