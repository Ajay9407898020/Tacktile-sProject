import { User } from './../user/user.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
	selector: 'app-user-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
	user: User | undefined;

	// INJECTING THE MATDIALOG DATA TO GET THE DATA FROM THE USER COMPONENT DIALOG
	constructor(@Inject(MAT_DIALOG_DATA) public data: User) { }

	ngOnInit(): void {
		this.user = this.data
	}

}
