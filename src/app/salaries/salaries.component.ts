import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Employee } from '../Employee';
import { Payload } from '../Payload';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.css'],
})
export class SalariesComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}
  // to store the payload
  resultData!: Payload;
  // for the progress bar animation
  isLoading: boolean = true;
  isLoaded: boolean = false;
  // to take care of sorting
  sortOrder: string = 'desc';
  sortParam: string = '-';
  // record keeping track of the current active filters
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
  ngOnInit(): void {
    this.getSalaryData();
  }

  // on selecting the sort field, receive the event and set the sort parameter
  // asc = '' and desc = '-'
  sortSelection(event: any) {
    event.value == 'asc' ? (this.sortParam = '') : (this.sortParam = '-');
    this.getSalaryData();
  }

  // on clicking the filter button in the result page, remove the filter from the query
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

  // receive the events fired when the select dropdown results are selected
  selectChangeHandler(event: any, filter_name: string) {
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
    }
    this.getSalaryData();
  }

  // fetch the result from the server
  getSalaryData() {
    this.isLoaded = false;
    this.isLoading = true;
    this.httpClient
      .get<any>(
        'https://cs-salary-app.uc.r.appspot.com/getSalaryData?location=' +
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
        this.isLoaded = true;
        this.isLoading = false;
        let employeeDetailArray = [];
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
          // employeeDetailArray : contains information to populate the cards
          // filterData : contains information regarding the active selectable filters
          this.resultData = new Payload(employeeDetailArray, resp.filterData);
        }
      });
  }
}
