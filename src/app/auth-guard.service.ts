import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()

export class AuthGurad implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    // GUARD TO PROTECT IF THE USER IS LOGGED IN THEN IT SHOULD NOT NAVIGATE TO OTHER SITE
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        // 
        if (this.authService.isAuthenticated()) {

            return true;
        } else {

            this.router.navigate(['/login']);
            return false;
        }

    }
}