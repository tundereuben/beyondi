import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ProductComponent} from "./product/product.component";
import {ProductsComponent} from "./products/products.component";
import {ProductNewComponent} from "./product-new/product-new.component";
import {AdminsComponent} from "./admins/admins.component";
import {AdminNewComponent} from "./admin-new/admin-new.component";
import {canActivate} from "@angular/fire/auth-guard";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'product-new', component: ProductNewComponent, canActivate: [AuthGuard] },
  { path: 'admins', component: AdminsComponent, canActivate: [AuthGuard] },
  { path: 'admin-new', component: AdminNewComponent, canActivate: [AuthGuard] },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
