import { Products } from './../products/products.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

	product: Products | undefined;

	constructor(@Inject(MAT_DIALOG_DATA) public data: Products) { }

	ngOnInit(): void {

		this.product = this.data;
	}

}
