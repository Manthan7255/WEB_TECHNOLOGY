import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // BehaviorSubject to track cart items (RxJS concept for viva!)
  private cartItems = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  addToCart(product: Product) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = [...currentItems, product];
    this.cartItems.next(updatedItems);
    this.cartCount.next(updatedItems.length);
  }

  getCartItems(): Product[] {
    return this.cartItems.getValue();
  }

  getTotalPrice(): number {
    return this.cartItems.getValue().reduce((total, item) => total + item.price, 0);
  }

  clearCart() {
    this.cartItems.next([]);
    this.cartCount.next(0);
  }
}