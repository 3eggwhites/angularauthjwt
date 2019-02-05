import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  getOrders() {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + token);
    let httpOptions = { headers: headers };
    return this.httpClient.get("/api/orders", {
      headers: new HttpHeaders().set(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      )
    }).pipe(
      map((response: HttpResponse<any[]>) => {
        return response;
      })
    )
  }
}
