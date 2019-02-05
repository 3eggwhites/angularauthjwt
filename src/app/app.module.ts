import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from "./admin/admin.component";
import { NoAccessComponent } from "./no-access/no-access.component";
import { AuthService } from "./auth/auth.service";
import { OrderService } from "./services/order.service";
import { fakeBackendProvider } from "./fake-backend";
import { AuthGuard } from './auth/auth.guard';
import { AdminAuthGuard } from './auth/admin-auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    OrderService,
    AuthGuard,
    AdminAuthGuard,
    //for creating a mock-backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
