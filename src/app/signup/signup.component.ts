import { ToasteredService } from '../toaster.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
	
	isNumber : any;

	loading = false;

	submitted = false;
	
	user: Array<any> = [];

	// REACTIVE FORM OBJECT 
	profileForm = this.fb.group({


		unique_identifier: uuidv4(),

		firstName: [
			null,
			[
				Validators.required,
				Validators.min(3),
				Validators.max(20)
			],
		],

		lastName: [
			null,
			[
				Validators.required,
				Validators.min(3),
				Validators.max(20)
			],
		],
		birthDate: [
			null,
			[Validators.required
			]
		],

		email: [
			null,
			[
				Validators.required,
				Validators.email
			]
		],

		number: [
			null,
			[
				
				Validators.required,
				Validators.minLength(10),
				Validators.maxLength(10),
				Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
			],
		],
		passwd: [
			null,
			[
				Validators.required,
				Validators.minLength(5)
			]
		],
	});

	get firstName() {

		return this.profileForm.get('firstName');
	}
	get lastName() {

		return this.profileForm.get('lastName');
	}

	get birthDate() {

		return this.profileForm.get('birthDate');
	}
	get number() {

		return this.profileForm.get('number');
	}
	get email() {

		return this.profileForm.get('email');
	}
	get passwd() {

		return this.profileForm.get('passwd');
	}

	constructor(private fb: FormBuilder,
		private router: Router,
		private tosterd: ToasteredService) {

		let tempUserData: string | null = sessionStorage.getItem('registeredUsers');

		if (tempUserData !== null) {

			this.user = JSON.parse(tempUserData);
		}
	}

	ngOnInit(): void {
	}

	// On submitting the form checks for form valid
	onSubmit() {

		this.submitted = true;

		// Checks for form valid or not
		if (!this.profileForm.valid) {

			return
		} else {

			this.loading = true;

			this.user.push(this.profileForm.value);

			sessionStorage.setItem('registeredUsers', JSON.stringify(this.user));

			this.router.navigate(['/login']);

			this.tosterd.showSuccess("Sign In Successfully")

			this.profileForm.reset();
		}
	}


}
