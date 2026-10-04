import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // cookies are blocked cross-site in the iOS WebView -> send the JWT as Bearer header
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        const userString = localStorage.getItem('login');
        if (isApiUrl && userString) {
            const token: string = JSON.parse(userString).token ?? '';
            const jwt = token.replace('Authorization=', '');
            if (jwt) {
                request = request.clone({
                    setHeaders: { Authorization: `Bearer ${jwt}` }
                });
            }
        }

        return next.handle(request);
    }
}