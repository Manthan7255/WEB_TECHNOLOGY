import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Studentservice {
  Students = [
  {id : 1, name : "Manthan", age:21, course:"Angular"},
  {id : 2, name : "Satyarth", age:22, course:"React"},
  {id : 3, name : "Sneha", age:23, course:"Javascript"}
  ];

  getStudents(){
    return this.Students;
  }

}
