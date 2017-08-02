import { Component, OnInit } from '@angular/core';
 
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';
 
@Component({
    moduleId: module.id,
    templateUrl: 'profile.html'
})
 
export class ProfileComponent implements OnInit {
    currentUser: Profile;
    users: Profile[] = [];
 
    constructor(private userService: ProfileService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
        this.loadAllUsers();
    }
 
    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }
 
    private loadAllUsers() {
    }
}