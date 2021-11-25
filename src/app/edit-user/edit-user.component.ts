import { NgForm } from '@angular/forms';
import { User } from './../user/user.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-edit-user',
	templateUrl: './edit-user.component.html',
	styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {

	loading = false;

	submitted = false;

	user: User | undefined;

	genders: string[] = [
		'male',
		'female'
	];

	loggedInUserId: string = this.authService.authInfo('unique_identifier')

	// INJECTING THE MATDIALOG DATA WHICH IS FETCHED FROM WHERE IT WAS OPENED
	constructor(@Inject(MAT_DIALOG_DATA) private data: User,
		private dialogRef: MatDialogRef<EditUserComponent>,
		private authService: AuthService) { }

	ngOnInit(): void {

		this.user = this.data;
	}

	// AFTER SUBMIT CHECK FOR WETHER THE DATA IS VALID OR NOT IF YES THE PASS IT TO THE USER COMPONENT OTHERWISE RETURN  
	onSubmit(form: NgForm) {

		this.submitted = true
		if (!form.valid && form !== null) {
			
			return
		} else {

			this.loading = true;
			this.closeDialog(
				{
					formData: form.value
				}
			)
		}

	}

	// DIALOG HAS CLOSED 
	closeDialog(value: any) {

		if (value != null) {

			this.dialogRef.close(value)
		} else {
			return;
		}
	}

}
