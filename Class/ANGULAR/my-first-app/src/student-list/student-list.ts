import { Component } from '@angular/core';
import { Studentservice } from '../Services/studentservice';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  Students: any[] = []; //any[] means it can be an array of any type of data
  //later this will hold student data from the service

  /**
   *
   */
  constructor(private studentService: Studentservice) {
    
  }

  ngOnInit() {
    this.Students = this.studentService.getStudents();
    console.log(this.Students);
  }
}
