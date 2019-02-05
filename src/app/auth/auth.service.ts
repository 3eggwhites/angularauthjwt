import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(credentials) {
    return this.httpClient.post(
      "/api/authenticate",
      JSON.stringify(credentials)
    );
  }

  logout() {}

  isLoggedIn() {
    return false;
  }
}
