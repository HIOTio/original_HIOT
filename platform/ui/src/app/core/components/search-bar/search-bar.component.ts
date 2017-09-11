import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { ConfigService } from "../../services/config.service";

@Component({
    selector   : "hiot-search-bar",
    templateUrl: "./search-bar.component.html",
    styleUrls  : ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit
{
    public collapsed: boolean;
    public toolbarColor: string;
     @Output() onInput: EventEmitter<any> = new EventEmitter();
    public onSettingsChanged: Subscription;

    constructor(
        private config: ConfigService,
    )
    {
        this.collapsed = true;
        this.onSettingsChanged =
            this.config.onSettingsChanged
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
