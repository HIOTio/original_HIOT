import { Component, OnInit } from "@angular/core";
import {AuthenticationService} from "../auth/auth.service";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"],
    providers : [AuthenticationService],
})
export class LogoutComponent implements OnInit {

  constructor(
        private authenticationService: AuthenticationService) { }

  public ngOnInit() {
      this.authenticationService.logout();
  }

}
