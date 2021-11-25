import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon'


const materials = [

	MatButtonModule,
	MatListModule,
	MatMenuModule,
	MatSidenavModule,
	MatTooltipModule,
	MatFormFieldModule,
	MatDialogModule,
	MatInputModule,
	MatSelectModule,
	MatDatepickerModule,
	MatNativeDateModule,
	ScrollingModule,
	MatIconModule
]

@NgModule({
	imports: [
		materials,
	],
	exports: [
		materials
	]
})
export class MaterialModule { }


