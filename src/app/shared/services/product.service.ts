import { Injectable } from '@angular/core';
import {Product} from "../data/Product";
// import firebase from "firebase/compat";
import {Observable} from "rxjs";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /*products: Product[] = [
    {
      "id": 1,
      "productName": "Smartphone",
      "desc": "A high-end smartphone with a 6.5-inch display and 128GB storage.",
      "price": 699.99
    },
    {
      "id": 2,
      "productName": "Laptop",
      "desc": "A powerful laptop with an Intel i7 processor and 16GB RAM.",
      "price": 1199.99
    },
    {
      "id": 3,
      "productName": "Wireless Headphones",
      "desc": "Noise-canceling over-ear headphones with Bluetooth connectivity.",
      "price": 199.99
    },
    {
      "id": 4,
      "productName": "Smartwatch",
      "desc": "A smartwatch with fitness tracking and heart rate monitoring features.",
      "price": 249.99
    },
    {
      "id": 5,
      "productName": "Tablet",
      "desc": "A lightweight tablet with a 10.2-inch display and 64GB storage.",
      "price": 329.99
    },
    {
      "id": 6,
      "productName": "Digital Camera",
      "desc": "A compact digital camera with 20MP resolution and 4K video recording.",
      "price": 499.99
    },
    {
      "id": 7,
      "productName": "Bluetooth Speaker",
      "desc": "A portable Bluetooth speaker with rich sound and deep bass.",
      "price": 99.99
    },
    {
      "id": 8,
      "productName": "Gaming Console",
      "desc": "A next-gen gaming console with 1TB storage and 4K gaming support.",
      "price": 499.99
    },
    {
      "id": 9,
      "productName": "E-reader",
      "desc": "An e-reader with a 7-inch glare-free display and 8GB storage.",
      "price": 129.99
    },
    {
      "id": 10,
      "productName": "Smart Home Hub",
      "desc": "A smart home hub with voice control and integration with smart devices.",
      "price": 149.99
    }
  ]*/
  constructor() { }

  async getProducts() {
    let products: Product[] = [];

    const snapshot = await firebase.firestore().collection('products').get();
    snapshot.forEach((doc) => {
      const product = doc.data();
      console.log(product['price'])
      products.push({
        productName: product['productName'],
        desc: product['desc'],
        price: product['price']
      })
    });
  }

  /*getProductById(id: number): Product {
    return this.products[id-1]
  }*/

  createProduct(product: Product): boolean {
    return true;
  }
}
