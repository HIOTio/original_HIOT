import { Injectable } from "@angular/core";

@Injectable()
export class FuseNavbarService
{
    public navBarRef;

    constructor()
    {
    }

    public setNavBar(ref)
    {
        this.navBarRef = ref;
    }

    public getNavBar()
    {
        return this.navBarRef;
    }
}
