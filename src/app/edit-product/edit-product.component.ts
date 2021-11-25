import { NgForm } from '@angular/forms';
import { Products } from './../products/products.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-edit-product',
	templateUrl: './edit-product.component.html',
	styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

	// GETTING CURRENT USER ID FROM AUTHSERVIC METHOD CALLED AUTHINFO
	currentUserId: String = this.authService.authInfo('unique_identifier');

	productFormObject : {
		productId: String,
		productName: String,
		productUnit: String,
		purchaseRate: Number,
		saleRate: Number,
		productCode: Number,
	} | undefined; 

	product : Products | undefined;

	constructor(@Inject(MAT_DIALOG_DATA) private data : Products , 
				private dialogRef : MatDialogRef<EditProductComponent>,
				private  authService : AuthService) { }

	ngOnInit(): void {

		this.product = this.data;		
	}

	// On submit the form the form value is passed to the product comonent to update the current data
	onSubmit(form: NgForm) {

		if (form !== null) {

			this.productFormObject = form.value;
			this.closeDialog(this.productFormObject)
		} else {
			return
		}
	}

	// Method to pass the data after closing the dialog
	closeDialog(value: any) {
		if (value !== null) {

			this.dialogRef.close(value)
		} else {
			return;
		}
	}

}
