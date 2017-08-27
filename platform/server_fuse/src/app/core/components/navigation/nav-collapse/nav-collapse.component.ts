import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Animations } from "../../../animations";
import { FuseNavigationService } from "../navigation.service";

@Component({
    selector   : "fuse-nav-collapse",
    templateUrl: "./nav-collapse.component.html",
    styleUrls  : ["./nav-collapse.component.scss"],
    animations : [Animations.slideInOut],
})
export class FuseNavCollapseComponent implements OnInit
{
     @Input() item: any;
     @HostBinding("class") classes = "nav-collapse nav-item";
    @HostBinding("class.open") public isOpen = false;

    constructor(private navigationService: FuseNavigationService, private router: Router)
    {
        /**
         * When navigation changed
         */
        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationEnd )
                {
                    /**
                     * Check if the url is child of the collapse
                     */
                    if ( this.isUrlInChildren(this.item, event.urlAfterRedirects) )
                    {
                        // console.log(this.item);
                        this.expand();
                    }
                    else
                    {
                        this.collapse();
                    }
                }
            },
        );

        /**
         * Whenever a navigation collapse item toggled
         */
        this.navigationService.onNavCollapseToggled.subscribe(
            (clickedItem) => {
                if ( clickedItem.children )
                {
                    /**
                     * if clicked collapse is child of this collapse
                     * return
                     */
                    if ( this.item.children.indexOf(clickedItem) !== -1 )
                    {
                        return;
                    }
                    /**
                     * If collapsed item is not related with this collapse
                     * collapse
                     */
                    if ( this.item !== clickedItem )
                    {
                        this.collapse();
                    }
                }
            },
        );
    }

    /**
     * Toggle Collapse
     * @param ev
     */
    public toggleOpen(ev)
    {
        ev.preventDefault();
        this.isOpen = !this.isOpen;
        this.navigationService.onNavCollapseToggled.emit(this.item);
    }

    /**
     * Expand
     */
    public expand()
    {
        if ( this.isOpen )
        {
            return;
        }
        this.isOpen = true;
    }

    /**
     * Collapse
     */
    public collapse()
    {
        if ( !this.isOpen )
        {
            return;
        }
        this.isOpen = false;
    }

    /**
     * Checking the url is in children
     * @param arr
     * @param url
     * @returns {any}
     */
    public isUrlInChildren(arr, url)
    {
        if ( !arr.children )
        {
            return false;
        }

        for ( let i = 0; i < arr.children.length; i++ )
        {
            if ( arr.children[i].children )
            {
                if ( this.isUrlInChildren(arr.children[i], url) )
                {
                    return true;
                }
            }

            if ( arr.children[i].url === url )
            {
                return true;
            }
        }

        return false;
    }

    public isCollapsed(): boolean
    {
        return this.isOpen;
    }

    public ngOnInit()
    {
    }

}
