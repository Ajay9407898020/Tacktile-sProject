import { AuthService } from './../auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/user.model';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

	currentUserId: string = this.authService.authInfo('unique_identifier');

	//VARIABLE TO FIND FORM SUBMITED OR NOT
	loading: boolean = false;

	submitted: boolean = false;

	// GENDER LIST
	genders: string[] = [
		'male',
		'female'
	];

	// FORM OBJECT INITIALIZATION
	form: NgForm | undefined;

	// UNIQUE ID IS GENERATED USING UUIDV4 LIBRARY
	uid: string = uuidv4();

	constructor(@Inject(MAT_DIALOG_DATA) private data: User,
		private dialogRef: MatDialogRef<AddUserComponent>,
		private authService: AuthService) { }

	// UNIQUE ID INITIALIZE TO THE UID VARIABLE
	ngOnInit(): void {

		this.uid = uuidv4();
	}

	// ON SUBMITTED THE FORM CHECKS FOR VALIDITY 
	onSubmit(form: NgForm) {

		this.submitted = true;

		// IF FORM VALID THEN THE USERDATA FROM THE FORM GET PASSED TO THE USER COMPONENT
		if (!form.valid) {

			return
		} else {

			// Flag for check weather form to submit or not  
			this.loading = true;
			this.form = form;

			// CLOSE METHDO DEFINED BELOW ASSIGNED VALUES TO DIALOG REF VARIABLE
			this.closeDialog({

				formData: form.value,
				// set status succes
				status: 'Success'
			})
		}
	}

	// ON CLOSING THE DIALOG 
	closeDialog(value: any) {

		if (value != null) {

			// Passing value of the forms
			this.dialogRef.close(value)
		} else {
			return;
		}
	}

}
