import { DialogsService } from './../dialogs.service';
import { AuthService } from './../auth.service';
import { EditUserComponent } from './../edit-user/edit-user.component';
import { UserDetailComponent } from './../user-detail/user-detail.component';
import { AddUserComponent } from './../add-user/add-user.component';
import { User } from './user.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { findIndex, filter, isEmpty,  } from 'lodash'
import Swal from "sweetalert2"



@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

	// FILTERED USERS WITH REFRENCE TO LOGGED IN USERS
	filteredUsers: Array<User> = [];

	users: Array<User> = []

	constructor(private dialog: MatDialog, private authService: AuthService,
		private dialogService : DialogsService) { }

	ngOnInit(): void {

		// PREPAIRING THE USERS LIST HAVING LOGGED IN USER  RELATED USERS AS THE COMPONENT INITIALIZED 
		this.prepaireUserList();
	}

	// OPEN DIALOG FOR ADDING NEW USER
	openDialog() {

		// OPEN DIALOG TO ADD USER THROUGH ADDUSER COMPONENT
		const result = this.dialogService.openDialog(AddUserComponent, {}, {}, (result : any) => {
			if (result != undefined) {

				if (result.status == 'Success') {

					this.users.push(result.formData);
					sessionStorage.setItem('users', JSON.stringify(this.users));
					this.prepaireUserList();
				}
			}
		});

	}

	// OPEN DIALOG AND VIEWING THE DATA FROM THE TABLE
	openDialogForView(uid: string) {

		for (let user of this.users) {
			if (user.unique_identifier === uid) {
				this.dialog.open(UserDetailComponent, { data: user })
			}
		}
	}

	// ON DELETING USER WILL BE REMOVED FROM THE USER ARRAY
	onDelete(uid: string) {
		let userData = sessionStorage.getItem('users');

		if (userData != null || userData != undefined) {

			this.users = JSON.parse(userData);
		}

		this.users.forEach((user, index) => {

			if (user.unique_identifier === uid) {
				
				Swal.fire({
					title: 'Are you sure You want to Delete User?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes!',
					background: '',
					heightAuto: false

				}).then((result) => {

					if (result.isConfirmed) {

						Swal.fire(
							'Deleted!',
							'User is Deleted',
							'success'
						)
						this.users.splice(index, 1);
						sessionStorage.setItem('users', JSON.stringify(this.users));
						this.prepaireUserList()

					} else {

						return
					}
				})

			}
		})
	}

	

	// ON EDITING THE EXISISTING USER.  OPENS THE DIALOG AND UPDATE THE USER DATA
	onEdit(uid: string) {

		let userData = sessionStorage.getItem('users');

		if (userData != null || userData != undefined) {

			this.users = JSON.parse(userData);
		}

		let user: User | any = this.users.find(user => user.unique_identifier === uid);

		if (!(isEmpty(user)) && user != undefined) {

			let dialogRef = this.dialog.open(EditUserComponent, { data: user, hasBackdrop: false, maxHeight: '100vh' });

			dialogRef.afterClosed().subscribe(result => {

				let userFromEdit: User = result.formData;

				if (!(isEmpty(userFromEdit))) {

					let index = findIndex(this.users,user => user.unique_identifier === uid);
					this.users[index] = userFromEdit;
					sessionStorage.setItem('users', JSON.stringify(this.users));
					this.prepaireUserList();
				}
			})
		}
	}
	// PREPAIR A LIST OF USER WITH REFRENCE OF LOOGED IN USER
	prepaireUserList() {

		let userData = sessionStorage.getItem('users');

		if (userData !== null && userData !== undefined) {

			this.users = JSON.parse(userData);
			this.filteredUsers = filter(this.users, (user: any) => user.added_by_user === this.authService.authInfo('unique_identifier'))
		}
	}

}
