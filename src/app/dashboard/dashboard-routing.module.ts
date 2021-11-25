import { ProductsComponent } from './../products/products.component';
import { HomeComponent } from './../home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { DashboardComponent } from './dashboard.component';

// PROVIDING ROUTES TO THE DASHBOARDS

const routes: Routes = [

  {
    path: '', component: DashboardComponent, children: [

      { path: 'home', component: HomeComponent },

      { path: 'user', component: UserComponent },

      { path: 'products', component: ProductsComponent },

    ]
  },

  { path: '**', redirectTo: '/', pathMatch: 'full' }

];


@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]

})
export class DashboardRoutingModule { }
