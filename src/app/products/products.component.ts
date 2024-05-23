import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {ProductService} from "../shared/services/product.service";
import {Product} from "../shared/data/Product";
import {Router} from "@angular/router";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  user: any;
  products: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUserDetails();
    this.getProducts();
  }

  async getProducts() {
    const snapshot = await firebase.firestore().collection('products').get();
    snapshot.forEach((doc) => {
      const product = doc.data();
      this.products.push({
        id: doc.id,
        productName: product['productName'],
        desc: product['desc'],
        price: product['price']
      })
    });
  }


  viewProductDetails(product: Product): void {
    this.router.navigate(['product'], {queryParams: {id: product.id}})
  }

}
