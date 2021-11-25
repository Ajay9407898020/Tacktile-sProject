import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from "sweetalert2"
import { ToasteredService } from '../toaster.service';


@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	// INPUT PROPERTY FOR FIRST NAME AND LAST NAME
	@Input('firstName') firstName: string = "";

	@Input('lastName') lastName: string = "";

	constructor(private router: Router, private toasterd: ToasteredService) { }

	ngOnInit(): void {
	}

	// ON LOGOUT THE LOGGED USER GET DELTED FROM THE SESSION STORAGE AND NAVIGATE TO LOGIN PAGE
	onLogout() {

		if (sessionStorage.getItem('loggedInUser')) {

			// Showing sweet alert wether user want to log out or not
			Swal.fire({
				title: 'Are you sure You want to LogOut?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, Logout!',
				background : '',
				heightAuto : false
		
			}).then((result) => {

				if (result.isConfirmed && result !== null) {

					Swal.fire(
						'Logout!',
						'Your are Logout.',
						'success'
					)

					//Removing logged in user from session storage  
					sessionStorage.removeItem('loggedInUser');			
					this.toasterd.showSuccess("Successfully Logged Out");

					// Navigating to login page
					this.router.navigate(['/login']);
				} else {

					return
				}
			})
		}
	}
}
