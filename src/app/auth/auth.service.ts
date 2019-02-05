import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(credentials) {
    return this.httpClient.post("/api/authenticate", credentials).pipe(
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem("token", response.token);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout() {
    localStorage.removeItem("token");
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem("token");
    if (token) {
      let isExpired = jwtHelper.isTokenExpired(token);
      return !isExpired;
    }
    return false;
  }

  get currentUser() {
    let token = localStorage.getItem("token");
    let jwtHelper = new JwtHelperService();
    if (!token) {
      return null;
    } else {
      return jwtHelper.decodeToken(token);
    }
  }
}
