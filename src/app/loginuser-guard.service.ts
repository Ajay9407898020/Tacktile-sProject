import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable(
    {
        providedIn : 'root'
    }
)
export class LoginUserGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

            // CHECK WETHER USER IS ALREADY LOGGED IN IF YES THEN ANY URL WILL REDIRECT TO DASHBOARD
            if ((state.url == '/login' || state.url == '/signup') && this.authService.isAuthenticated()) {

            this.router.navigate(['/dashboard']);
            return false
        }else{

            return true;
        }
        
    }
}