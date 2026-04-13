import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.html'
})
export class Admin {
  name: string = '';
  age: number = 0;
  course: string = '';

  saveDetails() {
    console.log(this.name, this.age, this.course);
  }
}