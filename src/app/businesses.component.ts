import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WebService } from './web.service';

@Component({
  selector: 'app-businesses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './businesses.component.html',
  styleUrl: './businesses.component.css'
})
export class BusinessesComponent implements OnInit {

  business_list: any;
  page: number = 1;

  constructor(public webService: WebService) {}

  ngOnInit(): void {
    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }
    this.loadBusinesses();
  }

  loadBusinesses(): void {
    this.business_list = this.webService.getBusinesses(this.page);
    sessionStorage['page'] = this.page;
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadBusinesses();
    }
  }

  nextPage(): void {
    this.page++;
    this.loadBusinesses();
  }
}