import { AuthService } from './../auth.service';
import { Products } from './products.model';
import { ProductDetailComponent } from './../product-detail/product-detail.component';
import { EditProductComponent } from './../edit-product/edit-product.component';
import { AddProductComponent } from './../add-product/add-product.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forEach, isEmpty, findIndex, filter, orderBy, find} from 'lodash'
import Swal from 'sweetalert2';
import { ToasteredService } from '../toaster.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	selectedProducts: Array<string> = []

	filteredProducts: Array<Products> = [];

	productList: Array<Products> = []

	isSelectOptionsChecked = false;


	constructor(private dialog: MatDialog, private authService: AuthService, private toastred: ToasteredService) { }

	// OPEN DIALOG TO ADD PRODUCT TO THE PRODUCTLIST ARRAY
	openAddDialog() {

		const dialogRef = this.dialog.open(AddProductComponent, {

			// RESTRICT DIALOG FROM CLOSIGN TILL WE DONT PRESS THE CLOSE THE BUTTON
			hasBackdrop: false
		});

		dialogRef.afterClosed().subscribe(result => {

			// GETTING RESPONSE FROM THE ADDPROUCT COMPONENT TO THIS FIELD
			if (result != undefined) {

				// IF RESULT.STATUS RETURNS SUCCESS THE RESULT WILL BE PUSHED TO THE PRODUCTLIST STORE IN SESSION STORAGE
				if (result.status === 'success') {

					this.productList.push(result.formData);

					sessionStorage.setItem('products', JSON.stringify(this.productList));

					this.prepairProductList()
				}
			}
		})
	}

	// OPEN DIALOG FOR SHOWING THE CURRENT PRODDUCT WITH ITS UNIQUE ID
	openViewDialog(productId: any) {

		// let product = this.productList.find(product => product.productId === productId);
		let product = find(this.productList, (product:any) => product.productId === productId);

		const dialogRef = this.dialog.open(ProductDetailComponent, {

			data: product,
			hasBackdrop: false
		});
	}

	ngOnInit(): void {

		this.prepairProductList();
	}

	// OPEN DIALOG FOR EDITING THE CURRENT PRODUCT 
	openEditDialog(userId: any) {

		let productData = sessionStorage.getItem('products');

		if (productData != null || productData != undefined) {

			this.productList = JSON.parse(productData);
		}

		let product = this.productList.find(product => userId === product.productId)

		const dialogRef = this.dialog.open(EditProductComponent, { data: product })

		// GETTING RESPONSE FROM THE EDITPRODUCT COMPONENT AND UPDATING THE DATA IN PRODUCT ARRAY
		dialogRef.afterClosed().subscribe(result => {

			let productFromEdit: Products = result

			if (!(isEmpty(productFromEdit))) {

				// INDEX OF CURRENT PRODUCT FROM MATCHING ITS UNIQUE ID
				let index = findIndex(this.productList, (product) => product.productId == productFromEdit.productId);

				// ASSIGNING THE NEW DATA TO THE CORRECT POSTITION OF AN ARRAY
				this.productList[index] = productFromEdit

				// STORRING THE DATA TO THE SESSION STORAGE
				sessionStorage.setItem('products', JSON.stringify(this.productList));

				// THIS METHOD IS USE TO SORT AND FILTER THE DATA WITH THE REFRENCE OF LOGGED IN USER
				this.prepairProductList()
			}

		})
	}

	// ON DELETE THE PRODUCT WITH REFERANCE OF IT USERID
	onDeleteProduct(userId: any) {

		let productData = sessionStorage.getItem('products');

		if (productData != null || productData != undefined) {

			this.productList = JSON.parse(productData);
		}

		// FIND THE INDEX OF SELECTED PRODUCT TO DELETE FROM PRODUCTS LIST OF SESSION STORAGE
		let index = this.productList.findIndex(product => product.productId == userId);

		Swal.fire({
			title: 'Are you sure You want to Delete the Product?',
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

				// DELETING THE DATA FROM THE PRODUCT ARRAY HAVING ITS INDEX 
				this.productList.splice(index, 1);

				// STORING THE DATA AFTER ITS MODIFICATION(DELETION)
				sessionStorage.setItem('products', JSON.stringify(this.productList));

				// AGAIN PREPAIRING THE LIST OF DATA
				this.prepairProductList()

			} else {

				return
			}
		})

	}

	// METHOD TO PERAIR THE LIST OF PRODUCT WITH REFERANCE OF LOGGEDIN USER
	prepairProductList() {

		let productData = sessionStorage.getItem('products');

		// CHECKS IF PRODUCT DATA FROM SESSION SESSION STORAGE WETHER IS NULL OR UNDEFINED OR HAVING ANY VALUE
		if (productData !== null && productData !== undefined) {

			this.productList = JSON.parse(productData);

			// FILTER THE PRODUCT LIST WITH REFRENCE OF LOGGED IN USER ID
			this.filteredProducts = filter(this.productList, (user: any) => user.added_by_user === this.authService.authInfo('unique_identifier'))

			// MODIFY THE FILTERED PRODUCT LIST ACCORDING TO THE DATE THAT WAS MENTIONED
			this.filteredProducts = orderBy(this.filteredProducts, ['currentDate'], ['asc'])
		}
	}

	// AS WE SELECT ON CHECBOX FOR  ONE PRODUCT TO DELETE
	onSelectProduct(event: any, uid: string) {

		if (event.target.checked === true) {

			// SELECTEDPRODUCTS ARRAY WAS PUSHED BY ITS UNIQUE ID
			this.selectedProducts.push(uid)

			console.log(this.selectedProducts);

			return;
			
		} else {

			// let index = this.selectedProducts.findIndex(productId => uid === productId);
			let index = findIndex(this.selectedProducts, (productId)=> uid === productId)

			this.selectedProducts.splice(index, 1);

			console.log(this.selectedProducts);

			return;
			
		}

	}

	// IF MULTIPLE PRODUCT GOT DELETED THEN IT REMOVES THE ITEM FROM SESSION STORAGE
	deleterProduct() {

		// CHECK WETHER SELECTEDPRODUCT IS EMPTY OR NOT IF YES THEN SHOW THE FALIURE MSG
		if(isEmpty(this.selectedProducts)) {

			this.toastred.showFailiure("Select Product to delete")
			return
		}

		let productData = sessionStorage.getItem('products');

		// CHECK WETHER THE PRODUCT DATA IS NULL OR NOT
		if (productData != null || productData != undefined) {

			this.productList = JSON.parse(productData);
		}

		Swal.fire({
			title: 'Are you sure You want to Delete Products?',
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

				// ITERATE THE SELECTPRODUCTS ARRAY WETHER FOR ALLL UNIQUE ID  WHICH WAS ADDED DURING THE SELLECTING ELEMENT FOR DELETE
				forEach(this.selectedProducts, element => {

					let index = findIndex(this.productList,product => product.productId == element);

					// SPLICING THE PRODUCT FROM THE PRODUCT LIST 
					this.productList.splice(index, 1);

					// STORING THE MODIFIED RESULT TO THE SESSION STORAGE
					sessionStorage.setItem('products', JSON.stringify(this.productList));
				});

				this.selectedProducts.splice(0,this.selectedProducts.length);

				console.log(this.selectedProducts);
				

				// IS SELECTED OPETION VARIABLE FLAG CHECKED IF THE ALL SELECT OPTION CHECKED
				this.isSelectOptionsChecked = false;

				this.prepairProductList()
			} else {

				return
			}
		})


	}

	// IF ANY DELETE PRODUCT IS SELECT THEN IT WORKS
	isSelected(uid: string) {

		return this.selectedProducts.includes(uid)
	}

	// SELECT ALL OPTION FOR DELETING THE ALL OPTION
	selectAllOptions() {

		this.isSelectOptionsChecked = !this.isSelectOptionsChecked;

		// CHECKS WETHER ALL OPTION ARE CHECKED OR NOT
		if (this.isSelectOptionsChecked) {

			// CHECKS WETHER THE FILTERED PRODUCTS IS EMPTY OR NOT IF YES THEN SHOW THE TOASTER MSG TO ADD  PRODUCTS AND RETURN
			if (isEmpty(this.filteredProducts)) {

				this.toastred.showFailiure('Add Products Please')
				return
			}

			// CHECK FOR SELECTED CHECKBOX IS NOT EMPTY THEN PUSHED THE PRODUCT ID TO THE SELECTPRODUCT
			if (!isEmpty(this.selectedProducts)) {

				// IF THE SELECTED PRODUCT HAVING ANY KEY THEN ACCEPT THAT KEY ALL OTHER KEY IS PUSHED TO THE SELECTED PRODUCTS
				forEach(this.filteredProducts, (element) => {

					if (!this.selectedProducts.includes(element.productId)) {

						// PUSHED THE PRODUCT ID TO THE SELECTED PRODUCT ARRAY
						this.selectedProducts.push(element.productId);

						console.log(this.selectedProducts);
						
						return
					}

				})
			} else {

				// IF SELECTED PRODUCT IS EMPTY THEN FETCH ALL THE PRODUCT ID FROM THE FILTERED PRODUCTLIST AND PUSHED INTO THE SELECTED PRODUCTS
				forEach(this.filteredProducts, (element) => {

					this.selectedProducts.push(element.productId);					
				})

				console.log(this.selectedProducts);

				return;

			}
		}
		else {

			this.selectedProducts.splice(0, this.selectedProducts.length);

			console.log(this.selectedProducts);

			return;
			
		}

	}

}
