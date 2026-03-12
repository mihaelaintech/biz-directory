import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private businessID: any;

  constructor(private http: HttpClient) {}

  getBusinesses(page: number): Observable<any[]> {
    return this.http.get<any[]>(
      'https://biz-directory-api.onrender.com/api/v1.0/businesses?pn=' + page
    );
  }

  getBusiness(id: any): Observable<any> {
    this.businessID = id;
    return this.http.get<any>(
      'https://biz-directory-api.onrender.com/api/v1.0/businesses/' + id
    );
  }

  getReviews(id: any): Observable<any[]> {
    return this.http.get<any[]>(
      'https://biz-directory-api.onrender.com/api/v1.0/businesses/' + id + '/reviews'
    );
  }

  postReview(review: any): Observable<any> {
    const postData = new FormData();

    postData.append('name', review.name);
    postData.append('text', review.review);
    postData.append('stars', review.stars);

    const today = new Date();
    const todayDate =
      today.getFullYear() + '-' +
      (today.getMonth() + 1) + '-' +
      today.getDate();

    postData.append('date', todayDate);

    return this.http.post(
      'https://biz-directory-api.onrender.com/api/v1.0/businesses/' + this.businessID + '/reviews',
      postData
    );
  }
}