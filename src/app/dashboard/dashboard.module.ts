import { NameValidatorModule } from './../name-validator/name-validator.module';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './../user/user.component';
import { NavbarComponent } from './../navbar/navbar.component';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProductsComponent } from '../products/products.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';



@NgModule({
	declarations: [
		DashboardComponent,
		UserComponent,
		NavbarComponent,
		AddUserComponent,
		UserDetailComponent,
		EditUserComponent,
		SidebarComponent,
		ProductsComponent,
		AddProductComponent,
		EditProductComponent,
		ProductDetailComponent
	],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		MaterialModule,
		FormsModule,
		NameValidatorModule
	]
})
export class DashboardModule { }
