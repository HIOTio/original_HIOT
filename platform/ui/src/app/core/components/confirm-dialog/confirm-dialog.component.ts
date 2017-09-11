import { Component, OnInit } from "@angular/core";
import { MdDialogRef } from "@angular/material";

@Component({
    selector   : "confirm-dialog",
    templateUrl: "./confirm-dialog.component.html",
    styleUrls  : ["./confirm-dialog.component.scss"],
})
export class ConfirmDialogComponent implements OnInit
{
    public confirmMessage: string;

    constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>)
    {
    }

    public ngOnInit()
    {
    }

}
