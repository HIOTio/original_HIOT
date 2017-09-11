import { Component, OnInit } from "@angular/core";
import { AuthenticationService} from "../auth/auth.service";
@Component({
    moduleId: module.id,
    selector: "hnav",
    templateUrl: "nav.html",
})

export class NavComponent implements OnInit {
    constructor(private authService: AuthenticationService) {

    }
    public profile: any;
    public ngOnInit() {
    }
    public authed(){
        return this.authService.cred.subscribe(function(profile){
            return profile.authentication;
        });

    }

}
