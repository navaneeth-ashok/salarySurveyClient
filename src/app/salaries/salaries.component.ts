import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// Class
import { Employee } from '../Employee';
import { Payload } from '../Payload';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.css'],
})
export class SalariesComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}
  resultData!: Payload;
  isLoaded: true = true;
  sortOrder: string = 'desc';
  sortParam: string = '-';
  selectedFilter: Record<string, string> = {
    location: '',
    title: '',
    experience: '',
    education: '',
    bootcamp: '',
    year: '',
    industry: '',
    faang: '',
    company_size: '',
  };
  selectedLocation: string = '';
  selectedSalary: string = '50000';
  ngOnInit(): void {
    this.getSalaryData();
  }

  sortSelection(event: any) {
    event.value == 'asc' ? (this.sortParam = '') : (this.sortParam = '-');
    this.getSalaryData();
  }

  removeFilter(event: any, filter_name: string) {
    switch (filter_name) {
      case 'location':
        this.selectedFilter.location = '';
        break;
      case 'title':
        this.selectedFilter.title = '';
        break;
      case 'experience':
        this.selectedFilter.experience = '';
        break;
      case 'education':
        this.selectedFilter.education = '';
        break;
      case 'bootcamp':
        this.selectedFilter.bootcamp = '';
        break;
      case 'year':
        this.selectedFilter.year = '';
        break;
      case 'industry':
        this.selectedFilter.industry = '';
        break;
      case 'faang':
        this.selectedFilter.faang = '';
        break;
      case 'company_size':
        this.selectedFilter.company_size = '';
        break;
      default:
    }
    this.getSalaryData();
  }

  selectChangeHandler(event: any, filter_name: string) {
    // this.selectedLocation = event.value;
    console.log(this.selectedFilter);

    console.log('Calling ' + filter_name);
    switch (filter_name) {
      case 'location':
        this.selectedFilter.location = event.value;
        break;
      case 'title':
        this.selectedFilter.title = event.value;
        break;
      case 'experience':
        this.selectedFilter.experience = event.value;
        break;
      case 'education':
        this.selectedFilter.education = event.value;
        break;
      case 'bootcamp':
        this.selectedFilter.bootcamp = event.value;
        break;
      case 'year':
        this.selectedFilter.year = event.value;
        break;
      case 'industry':
        this.selectedFilter.industry = event.value;
        break;
      case 'faang':
        this.selectedFilter.faang = event.value;
        break;
      case 'company_size':
        this.selectedFilter.company_size = event.value;
        break;
      default:
      // reset filter
    }
    // console.log(this.selectedFilter);
    for (let a in this.selectedFilter) {
      console.log(this.selectedFilter[a]);
    }
    this.getSalaryData();
  }

  getSalaryData() {
    console.log('calling backend');
    this.httpClient
      .get<any>(
        'http://localhost:3000/getSalaryData?location=' +
          this.selectedFilter.location +
          '&title=' +
          this.selectedFilter.title +
          '&experience=' +
          this.selectedFilter.experience +
          '&highest_education=' +
          this.selectedFilter.education +
          '&bootcamp=' +
          this.selectedFilter.bootcamp +
          '&year=' +
          this.selectedFilter.year +
          '&industry=' +
          this.selectedFilter.industry +
          '&faang_mmanga=' +
          this.selectedFilter.faang +
          '&company_size=' +
          this.selectedFilter.company_size +
          '&sort=' +
          this.sortParam +
          'base_salary'
      )
      .subscribe((resp) => {
        let employeeDetailArray = [];
        // console.log(resp.salaryData);
        // console.log(resp.filterData);
        for (let item of resp.salaryData) {
          let dataItem = new Employee(
            item.timestamp,
            item.location,
            item.position_title,
            item.base_salary,
            item.stock_options,
            item.bonus,
            item.cash_equity,
            item.experience,
            item.highest_education,
            item.bootcamp,
            item.year,
            item.industry,
            item.other_industry,
            item.faang_mmanga,
            item.company_size
          );
          employeeDetailArray.push(dataItem);
          this.resultData = new Payload(employeeDetailArray, resp.filterData);
        }
      });
  }
}
