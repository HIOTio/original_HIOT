import {
    Component
} from '@angular/core';
import {
    Router
} from '@angular/router';

import {
    AlertService
} from '../alerts/alert.service';
import {
    ProfileService
} from '../profile/profile.service';

@Component({
    moduleId: module.id,
    templateUrl: 'auth.register.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: ProfileService,
        private alertService: AlertService) {}

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
