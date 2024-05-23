import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Product} from "../shared/data/Product";
import {ProductService} from "../shared/services/product.service";

import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  productForm!: FormGroup;
  public errors: Error = {
    productName: '',
    price: '',
    desc: ''
  }

  product!: Product;
  isEditMode: boolean = false;
  productId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.queryParams['id'];

    if (this.productId) {
      this.getProductById(this.productId);
    }
    this.createProductForm();
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
      this.isEditMode = true;
      this.productForm.patchValue(this.product)
    });
  }

  createProductForm(): void {
    this.productForm = this.fb.group({
      productName: [''],
      price: [''],
      desc: ['']
    })
  }

  createProduct(): void {
    const { productName, price, desc } = this.productForm.getRawValue();

    if (productName.length > 32 || price < 0 || desc.length > 160 ) {
      this.errors.productName = productName.length > 32 ? 'Product name must not be more than 32 characters' : '';
      this.errors.price  = price <= 0 ? 'prices cannot be less than or equal to zero' :  '';
      this.errors.desc = desc.length > 160 ?  'Product description must not be more than 160 characters' : ''
    }

    if (!this.errors.productName && !this.errors.price && !this.errors.desc) {
      const product: Product = {
        productName,
        price,
        desc,
      }

      this.addProduct(product);
      this.productForm.reset();
    } else {

    }
  }

  async addProduct(product: Product) {
    if(!this.isEditMode) {
      await firebase.firestore().collection('products').add(product);
    }  else {
      await firebase.firestore().collection('products')
        .doc(this.productId).update(product)
    }
    this.router.navigate(['products'])

  }

  clearError(fieldName: string): void {
    switch(fieldName) {
      case 'productName':
        this.errors.productName = '';
        break;
      case 'desc':
        this.errors.desc = '';
        break;
      case 'price':
        this.errors.price = '';
        break;
      default:
      // code block
    }
  }

}

export interface Error {
  productName: string,
  price: string,
  desc: string
}
