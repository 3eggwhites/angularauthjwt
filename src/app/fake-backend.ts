import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let _token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZSwiZXhwIjoxNjE0Njk5MjU2fQ.IEXn-NBUlQweGPIzbTg7mYr5GsR55lmwbupO6lm5OXs";
      //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkxIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJleHAiOjE2MTQ2OTkyNTZ9.Sg2y8_JqRbtpKEmWzZinl1yfUruSXMk3k_XHLvSP8ek";
    return of(null)
      .pipe(
        mergeMap(() => {
          // authentication logic
          if (
            request.url.endsWith("/api/authenticate") &&
            request.method === "POST"
          ) {
            if (
              request.body.email === "mosh@domain.com" &&
              request.body.password === "1234"
            ) {
              return of(
                new HttpResponse({ status: 200, body: { token: _token } })
              );
            } else {
              return of(new HttpResponse({ status: 200 }));
              // return 401 not authorised if token is null or invalid
              //return throwError({ error: { message: "Unauthorised" } });
            }
          }

          //order authorization logic
          if (request.url.endsWith("/api/orders") && request.method === "GET") {
            if (request.headers.get("Authorization") === "Bearer " + _token) {
              return of(new HttpResponse({ status: 200, body: [1, 2, 3] }));
            } else {
              // return 401 not authorised if token is null or invalid
              return throwError({ error: { message: "Unauthorised" } });
            }
          }

          // pass through any requests not handled above
          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(1000))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
