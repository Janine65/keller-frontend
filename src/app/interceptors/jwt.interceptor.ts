import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private messageService: MessageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        // const user = this.accountService.userValue;
        // const isLoggedIn = user && user.token;
        // const isApiUrl = request.url.startsWith(environment.apiUrl);
        // if (isLoggedIn && isApiUrl) {
        //     request = request.clone({
        //         headers: request.headers.set('Authorization', `Bearer ${user.token}`)
        //     });
        // }

        return next.handle(request);
    }
}