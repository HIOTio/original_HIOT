import { EventEmitter, Injectable } from "@angular/core";
import { MediaChange, ObservableMedia } from "@angular/flex-layout";

@Injectable()
export class MatchMedia
{
    public activeMediaQuery: string;
    public onMediaChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(private observableMedia: ObservableMedia)
    {
        this.activeMediaQuery = "";

        this.observableMedia.subscribe((change: MediaChange) => {
            if ( this.activeMediaQuery !== change.mqAlias )
            {
                this.activeMediaQuery = change.mqAlias;
                this.onMediaChange.emit(change.mqAlias);
            }
        });
    }
}
