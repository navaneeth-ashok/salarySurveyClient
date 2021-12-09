import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../Employee';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  @Input('userData')
  public userDetail!: Employee;
  constructor() {}

  ngOnInit(): void {}
}
