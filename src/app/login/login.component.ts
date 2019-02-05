import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  signIn(credentials) {
    this.authService.login(credentials).subscribe(result => {
      if (result) {
        let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
        this.router.navigate([returnUrl || "/"]);
      } else {
        this.invalidLogin = true;
      }
    });
  }

  ngOnInit() {}
}
