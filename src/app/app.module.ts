import { DialogsService } from './dialogs.service';
import { LoginUserGuard } from './loginuser-guard.service';
import { ToasteredService } from './toaster.service';
import { AuthService } from './auth.service';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AuthGurad } from './auth-guard.service';


@NgModule({
	declarations: [
		AppComponent,

	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		FormsModule,
		ToastrModule.forRoot(
			{
				timeOut: 2000,
				positionClass: 'toast-top-right',
				preventDuplicates: true,
			}
		)
	],
	providers: [AuthService, AuthGurad, ToasteredService, LoginUserGuard, DialogsService],
	bootstrap: [AppComponent]
})
export class AppModule { }



