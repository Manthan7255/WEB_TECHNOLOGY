import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Studentservice {
  Students = [
    { id: 1, name: 'Manthan', age: 20 },
    { id: 2, name: 'Jane Smith', age: 22 },
    { id: 3, name: 'Alice Johnson', age: 19 },
  ];

  getStudents() {
    return this.Students;
  }
}
