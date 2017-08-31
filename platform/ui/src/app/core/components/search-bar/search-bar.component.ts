import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { FuseConfigService } from "../../services/config.service";

@Component({
    selector   : "fuse-search-bar",
    templateUrl: "./search-bar.component.html",
    styleUrls  : ["./search-bar.component.scss"],
})
export class FuseSearchBarComponent implements OnInit
{
    public collapsed: boolean;
    public toolbarColor: string;
     @Output() onInput: EventEmitter<any> = new EventEmitter();
    public onSettingsChanged: Subscription;

    constructor(
        private fuseConfig: FuseConfigService,
    )
    {
        this.collapsed = true;
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

    }

    public collapse()
    {
        this.collapsed = true;
    }

    public expand()
    {
        this.collapsed = false;
    }

    public search(event)
    {
        const value = event.target.value;

        this.onInput.emit(value);
    }

}
