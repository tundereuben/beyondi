import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../shared/services/product.service";
import {Product} from "../shared/data/Product";

import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/data/User";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  product!: Product;
  private user!: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
  }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.getProductById(id);
    this.getLoggedInUser();
  }

  getLoggedInUser(): void {
    this.authService.getLoggedInUserDetails()
      .subscribe({
        next: (res) => {
          this.user = res;
        },
        error: (err: Error) => {
          console.error(err);
        }
      })
  }

  async getProductById(id: string) {
    firebase.firestore().collection('products')
      .doc(id).get().then((doc) => {
        const product = doc.data();

        if (product) {
          this.product = {
            id: doc.id,
            productName: product['productName'],
            desc: product['desc'],
            price: product['price']
          }
        }
      });
  }

  deleteProduct(): void {
    const warning = `Are you sure you wat to delete ${this.product.productName}`;
    if (confirm(warning)) {
      if (this.user.userType === 'admin') {
        firebase.firestore().collection('products').doc(this.product.id).delete();
        this.router.navigate(['products']);
      } else {
        console.log(`you don't have permission`);
      }
    }
  }

  editProduct() {
    this.router.navigate(['product-new'], { queryParams: {id: this.product.id}})
  }
}
