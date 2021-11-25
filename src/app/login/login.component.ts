import { ToasteredService } from '../toaster.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { find } from 'lodash';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	islogIn: boolean = false;

	user: Array<any> = [];

	userLoggedIn: string | null = "";

	// LOGIN FORM OBJECT 
	loginForm: {

		email: String,
		password: String
	} | undefined;


	constructor(private router: Router,
		private toastred: ToasteredService) {

		let tempUserData: string | null = sessionStorage.getItem('registeredUsers')

		// IF DATA FROM SESSION STOARAGE IS NOT NULL THEN WILL PARSE TO THE USER
		if (tempUserData !== null) {

			this.user = JSON.parse(tempUserData);
		}
	}

	ngOnInit(): void {
	}

	// AFTER SUBMITTED THE FORM THE FORM GET VALIDATE
	onSubmit(form: NgForm) {

		let loginForm = form.value

		// CHECKS THE USER FROM LOGIN PAGE  IS PRESENT IN SESSTION STOARAGE OR NOT
		let user = find(this.user,(user) => user.email == loginForm.email && user.passwd == loginForm.passwd)

		// IF USER IS NOT NULL THEN SAVE IT TO THE SESSION STORAGE AND NAVIGATE TO THE DASHBOARD AND ALSO SHOW THE TOASTER MSG
		if (user !== null && user !== undefined) {

			sessionStorage.setItem('loggedInUser', JSON.stringify(user));

			this.toastred.showSuccess("SuccessFully Loggedin");

			this.router.navigate(['/dashboard']);
		}
		else {

			// SHOWING THE TOASTER MSG FOR FAILIURE 
			this.toastred.showFailiure('Invalid Credentials')
		}
	}
}
