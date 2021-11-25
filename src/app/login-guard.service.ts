import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable(
    {
        providedIn: 'root'
    }
)

// APPLYING GUARD TO RESTRICT TO NAVIGATE FROM DASHBOARD
export class LoginGuard implements CanDeactivate<DashboardComponent> {

    constructor(private authService: AuthService) { }

    canDeactivate(component: DashboardComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): boolean {

        if (this.authService.isAuthenticated()) {

            return false;
        } else {

            return true;
        }
    }
}