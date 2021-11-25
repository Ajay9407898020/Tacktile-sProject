import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

	// FIRST NAME AND LAST NAME PASSED TO THE NAVBAR COMPONENT
	firstName: string = "";

	lastName: string = ""

	constructor(private router: Router) {

		let userData: string | null;

		let tempData;

		// FETCHING User WHO WAS LOGGED IN FROM SESSION STORAGE AND ASSIGNED TO USERDATA
		userData = sessionStorage.getItem('loggedInUser');

		// IF USER WHO WAS LOGGED IN NOT IS NULL THEN ASSIGNED USERDATA OBJECT TO TEMPDATA WHICH IS OF TYPE ARRAY
		if (userData !== null) {

			tempData = JSON.parse(userData);
			this.firstName = tempData.firstName;
			this.lastName = tempData.lastName;
		}
	}
	ngOnInit(): void {

	}

}
