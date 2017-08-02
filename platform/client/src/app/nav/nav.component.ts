import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../auth/auth.service';
@Component({
    moduleId: module.id,
    selector:'hnav',
    templateUrl: 'nav.html'
})
 
export class NavComponent implements OnInit {
    constructor(public authService: AuthenticationService) {
        
    }
    profile: any;
    ngOnInit() {
    }
            

    
}