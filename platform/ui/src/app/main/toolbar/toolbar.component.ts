import { Component } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import {AuthenticationService } from '../../core/auth/auth.service';
import {Observable } from 'rxjs';
@Component({
    selector   : "hiot-toolbar",
    templateUrl: "./toolbar.component.html",
    styleUrls  : ["./toolbar.component.scss"],
})

export class ToolbarComponent
{
    public userStatusOptions: any[];
    public languages: any;
    public selectedLanguage: any;
    public showSpinner: boolean;
    public meVisible: boolean;
    private user: Observable<any>;
    constructor(private router: Router, private authservice: AuthenticationService)
    {
        this.user=authservice.creds();
        console.log(this.user);
        this.userStatusOptions = [
            {
                title: "Online",
                icon : "icon-checkbox-marked-circle",
                color: "#4CAF50",
            },
            {
                title: "Away",
                icon : "icon-clock",
                color: "#FFC107",
            },
            {
                title: "Do not Disturb",
                icon : "icon-minus-circle",
                color: "#F44336",
            },
            {
                title: "Invisible",
                icon : "icon-checkbox-blank-circle-outline",
                color: "#BDBDBD",
            },
            {
                title: "Offline",
                icon : "icon-checkbox-blank-circle-outline",
                color: "#616161",
            },
        ];

        this.languages = [
            {
                id   : "en",
                title: "English",
                flag : "us",
            },
            {
                id   : "es",
                title: "Spanish",
                flag : "es",
            },
            {
                id   : "tr",
                title: "Turkish",
                flag : "tr",
            },
            {
                id   : "de",
                title: "German",
                flag : "de",
            },
        ];

        this.selectedLanguage = this.languages[0];
         
            
    }
    public logout(){
        this.authservice.logout();
    }
    public search(value)
    {
        // Do your search here...
        console.log(value);
    }
}
