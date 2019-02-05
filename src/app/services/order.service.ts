import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  getOrders() {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({'Authorization': 'Bearer '+token});
    let httpOptions = { headers: headers };
    return this.httpClient.get("/api/orders", httpOptions);
  }
}
