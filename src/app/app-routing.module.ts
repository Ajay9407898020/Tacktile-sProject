import { LoginUserGuard } from './loginuser-guard.service';
import { AuthGurad } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login-guard.service';


// PROVIDING ROUTE TO INCLUDE LAZY LOADING DYNAMICALLY
const routes: Routes = [

	{
		path: '', redirectTo: '/signup', pathMatch: 'full'
	},

	{
		path: 'signup', canActivate: [LoginUserGuard],
		loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule)
	},

	{
		path: 'dashboard', canActivate: [AuthGurad], canDeactivate: [LoginGuard],
		loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
	},

	{
		path: 'login', canActivate: [LoginUserGuard],
		loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
	},
	{
		path: '**',
		redirectTo: "signup", pathMatch : 'full'
	},

];

@NgModule({

	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
