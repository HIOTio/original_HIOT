import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ObservableMedia } from "@angular/flex-layout";
import { Subscription } from "rxjs/Subscription";
import { FuseConfigService } from "../../services/config.service";
import { FuseMatchMedia } from "../../services/match-media.service";
import { FuseNavigationService } from "../navigation/navigation.service";

@Component({
    selector   : "fuse-shortcuts",
    templateUrl: "./shortcuts.component.html",
    styleUrls  : ["./shortcuts.component.scss"],
})
export class FuseShortcutsComponent implements OnInit, OnDestroy
{
    public shortcutItems: any[] = [];
    public navigationItems: any[];
    public filteredNavigationItems: any[];
    public searching = false;
    public mobileShortcutsPanelActive = false;
    public toolbarColor: string;
    public matchMediaSubscription: Subscription;
    public onSettingsChanged: Subscription;

     @ViewChild("searchInput") searchInputField;
     @ViewChild("shortcuts") shortcutsEl: ElementRef;

    constructor(
        private renderer: Renderer2,
        private observableMedia: ObservableMedia,
        private fuseMatchMedia: FuseMatchMedia,
        private fuseNavigationService: FuseNavigationService,
        private fuseConfig: FuseConfigService,
    )
    {
        this.filteredNavigationItems = this.navigationItems = this.fuseNavigationService.getFlatNavigation();

        this.onSettingsChanged =
            this.fuseConfig.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.toolbarColor = newSettings.colorClasses.toolbar;
                    },
                );
    }

    public ngOnInit()
    {
        // User's shortcut items
        this.shortcutItems = [
            {
                title: "Calendar",
                type : "nav-item",
                icon : "today",
                url  : "/apps/calendar",
            },
            {
                title: "Mail",
                type : "nav-item",
                icon : "email",
                url  : "/apps/mail",
            },
            {
                title: "Contacts",
                type : "nav-item",
                icon : "account_box",
                url  : "/apps/contacts",
            },
            {
                title: "To-Do",
                type : "nav-item",
                icon : "check_box",
                url  : "/apps/todo",
            },
        ];

        this.matchMediaSubscription =
            this.fuseMatchMedia.onMediaChange.subscribe(() => {
                if ( this.observableMedia.isActive("gt-sm") )
                {
                    this.hideMobileShortcutsPanel();
                }
            });
    }

    public ngOnDestroy()
    {
        this.matchMediaSubscription.unsubscribe();
    }

    public search(event)
    {
        const value = event.target.value.toLowerCase();

        if ( value === "" )
        {
            this.searching = false;
            this.filteredNavigationItems = this.navigationItems;

            return;
        }

        this.searching = true;

        this.filteredNavigationItems = this.navigationItems.filter((navigationItem) => {
            return navigationItem.title.toLowerCase().includes(value);
        });
    }

    public toggleShortcut(event, itemToToggle)
    {
        event.stopPropagation();

        for ( let i = 0; i < this.shortcutItems.length; i++ )
        {
            if ( this.shortcutItems[i].url === itemToToggle.url )
            {
                this.shortcutItems.splice(i, 1);
                return;
            }

        }

        this.shortcutItems.push(itemToToggle);
    }

    public isInShortcuts(navigationItem)
    {
        return this.shortcutItems.find((item) => {
            return item.url === navigationItem.url;
        });
    }

    public onMenuOpen()
    {
        this.searchInputField.nativeElement.focus();
    }

    public showMobileShortcutsPanel()
    {
        this.mobileShortcutsPanelActive = true;
        this.renderer.addClass(this.shortcutsEl.nativeElement, "show-mobile-panel");
    }

    public hideMobileShortcutsPanel()
    {
        this.mobileShortcutsPanelActive = false;
        this.renderer.removeClass(this.shortcutsEl.nativeElement, "show-mobile-panel");
    }
}