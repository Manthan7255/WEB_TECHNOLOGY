import { Component } from '@angular/core';
import { Admin } from '../admin/admin';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Admin],
  template: `<app-admin></app-admin>`
})
export class App {}