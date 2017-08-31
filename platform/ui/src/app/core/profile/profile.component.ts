import { Component, OnInit } from "@angular/core";

import { Profile } from "./profile.model";
import { ProfileService } from "./profile.service";

@Component({
    moduleId: module.id,
    templateUrl: "profile.html",
    selector: "app-profile",
})

export class ProfileComponent implements OnInit {
    public currentUser: Profile;
    public users: Profile[] = [];

    constructor(private userService: ProfileService) {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }

    public ngOnInit() {
        this.loadAllUsers();
    }

    public deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
    }

    private loadAllUsers() {
    }
}
