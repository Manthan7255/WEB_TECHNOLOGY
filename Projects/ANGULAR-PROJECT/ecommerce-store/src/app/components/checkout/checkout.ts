import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent {
  customer = {
    name: '',
    email: '',
    address: '',
    phone: ''
  };

  orderPlaced = false;

  constructor(public cartService: CartService) {}

  placeOrder() {
    if (this.customer.name && this.customer.email && this.customer.address && this.customer.phone) {
      this.orderPlaced = true;
      this.cartService.clearCart();
    } else {
      alert('Please fill all fields!');
    }
  }
}