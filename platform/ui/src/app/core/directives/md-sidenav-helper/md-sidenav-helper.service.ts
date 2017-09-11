import { Injectable } from "@angular/core";
import { MdSidenav } from "@angular/material";

@Injectable()
export class MdSidenavHelperService
{
    public sidenavInstances: MdSidenav[];

    constructor()
    {
        this.sidenavInstances = [];
    }

    public setSidenav(id, instance)
    {
        this.sidenavInstances[id] = instance;
    }

    public getSidenav(id)
    {
        return this.sidenavInstances[id];
    }
}
