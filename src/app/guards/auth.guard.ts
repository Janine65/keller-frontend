import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root'})
export class AuthGuard  {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authService.userValue;
        console.log(user);
        if (user.token.length > 0) {
            // authorised so return true
            console.log(user, route.data)
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
