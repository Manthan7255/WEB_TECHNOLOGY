import { Component } from '@angular/core';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  students : any[] = [];

  constructor(private studentService : StudentService) {
    this.students = this.studentService.getStudents();
  }
  
  ngOnInit() {
    this.students = this.studentService.getStudents();
  }
}
