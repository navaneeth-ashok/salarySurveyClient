import { FilterData } from './FilterData';
import { Employee } from './Employee';
export class Payload {
  constructor(public salaryData: Employee[], public filterData: FilterData) {}
}
