import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private products: Product[] = [
  { 
    id: 1, 
    name: 'Wireless Headphones', 
    price: 2999, 
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', 
    description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life.' 
  },
  { 
    id: 2, 
    name: 'Smart Watch', 
    price: 4999, 
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop', 
    description: 'Track your fitness, heart rate, and notifications on the go with this sleek smart watch.' 
  },
  { 
    id: 3, 
    name: 'Laptop Backpack', 
    price: 1499, 
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', 
    description: 'Water-resistant laptop backpack with multiple compartments and USB charging port.' 
  },
  { 
    id: 4, 
    name: 'Bluetooth Speaker', 
    price: 1999, 
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop', 
    description: 'Portable Bluetooth speaker with deep bass and 12-hour playtime.' 
  },
 { 
  id: 5, 
  name: 'USB-C Hub', 
  price: 2499, 
  image: 'https://m.media-amazon.com/images/I/61Nb935ZpsL.jpg', 
  description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.' 
},
  { 
    id: 6, 
    name: 'Wireless Mouse', 
    price: 999, 
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop', 
    description: 'Ergonomic wireless mouse with precision tracking and silent clicks.' 
  }
];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}