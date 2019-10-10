import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('sessionId')) {
            if (state.url === '/') {
                this.router.navigate(['/dashboard']);
            }
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('sessionId')) {
             this.router.navigate(['/dashboard']);
         }
        return true;
    }
}
